import { useEffect, useRef } from 'react';
import {
  AmbientLight,
  BufferAttribute,
  BoxGeometry,
  BufferGeometry,
  CanvasTexture,
  Clock,
  Color,
  DirectionalLight,
  Fog,
  GridHelper,
  Group,
  IcosahedronGeometry,
  MathUtils,
  Mesh,
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  OctahedronGeometry,
  PerspectiveCamera,
  PointLight,
  Points,
  PointsMaterial,
  Scene,
  SphereGeometry,
  Sprite,
  SpriteMaterial,
  TorusGeometry,
  TorusKnotGeometry,
  WebGLRenderer,
} from 'three';

/**
 * Interactive WebGL hero: a faceted "product core" inside a wireframe shell, with satellites
 * (frontend, backend, data, cloud, AI) on tilted orbits, a glowing halo, floating glass shapes
 * at different depths, a perspective grid floor and a particle field. It eases towards the
 * pointer, the floating shapes parallax at their own depth, and everything turns on scroll.
 *
 * Plain three.js with named imports keeps this chunk small; it is lazy-loaded by Hero.jsx
 * after first paint, pauses when off-screen and cleans up all GPU resources on unmount.
 */

const ORANGE = '#ff6a2b';
const ORBITS = [
  { radius: 2.35, speed: 0.42, tilt: [0.35, 0, 0.2], color: '#ff6a2b', size: 0.13, phase: 0 },
  { radius: 2.35, speed: 0.42, tilt: [0.35, 0, 0.2], color: '#ffb38a', size: 0.09, phase: Math.PI },
  { radius: 2.85, speed: -0.3, tilt: [-0.55, 0.4, 0], color: '#7aa2ff', size: 0.12, phase: 1.2 },
  { radius: 2.85, speed: -0.3, tilt: [-0.55, 0.4, 0], color: '#4ade80', size: 0.1, phase: 4.1 },
  { radius: 3.3, speed: 0.22, tilt: [1.2, -0.3, 0.4], color: '#c4a5ff', size: 0.11, phase: 2.4 },
];

/** Floating shapes placed at different depths for parallax. */
const FLOATERS = [
  { geo: () => new TorusGeometry(0.32, 0.11, 24, 64), pos: [-2.9, 1.8, -1.5], color: '#7aa2ff' },
  { geo: () => new OctahedronGeometry(0.38, 0), pos: [2.9, 1.9, -2.2], color: '#ff9a3d' },
  { geo: () => new BoxGeometry(0.5, 0.5, 0.5), pos: [2.6, -1.5, 0.6], color: '#c4a5ff' },
  {
    geo: () => new TorusKnotGeometry(0.26, 0.08, 96, 12),
    pos: [-2.5, -1.4, 0.9],
    color: '#4ade80',
  },
  { geo: () => new OctahedronGeometry(0.22, 0), pos: [-1.2, 2.7, -3], color: '#ff6a2b' },
];

function glowTexture() {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, 'rgba(255, 140, 70, 0.9)');
  g.addColorStop(0.35, 'rgba(255, 106, 43, 0.35)');
  g.addColorStop(1, 'rgba(255, 106, 43, 0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  return new CanvasTexture(canvas);
}

function buildScene() {
  const scene = new Scene();
  scene.fog = new Fog('#fafaf7', 8, 20);
  const lineColor = new Color('#111113');
  const lineMaterials = [];

  const ambient = new AmbientLight('#ffffff', 0.75);
  scene.add(ambient);
  const key = new DirectionalLight('#ffffff', 2.2);
  key.position.set(4, 5, 6);
  scene.add(key);
  const blue = new PointLight('#7aa2ff', 30);
  blue.position.set(-5, -3, 2);
  scene.add(blue);
  const warm = new PointLight(ORANGE, 25);
  warm.position.set(3, -4, -2);
  scene.add(warm);

  const root = new Group();
  scene.add(root);

  // Soft halo behind the core.
  const halo = new Sprite(
    new SpriteMaterial({ map: glowTexture(), transparent: true, depthWrite: false, opacity: 0.8 }),
  );
  halo.scale.set(5.5, 5.5, 1);
  halo.position.z = -0.6;
  root.add(halo);

  // Perspective grid floor that slowly "travels" towards the viewer.
  const floor = new GridHelper(40, 40, '#ff6a2b', '#111113');
  floor.position.y = -2.9;
  [].concat(floor.material).forEach((mat) => {
    mat.transparent = true;
    mat.opacity = 0.35;
  });
  scene.add(floor);

  // Floating glass-like shapes at different depths.
  const floaters = FLOATERS.map((f, i) => {
    const mesh = new Mesh(
      f.geo(),
      new MeshPhysicalMaterial({
        color: f.color,
        metalness: 0.2,
        roughness: 0.15,
        clearcoat: 1,
        transparent: true,
        opacity: 0.92,
        flatShading: i % 2 === 1,
      }),
    );
    mesh.position.set(...f.pos);
    mesh.userData = { base: f.pos, seed: i * 1.7, depth: 0.25 + (f.pos[2] + 3) * 0.12 };
    scene.add(mesh);
    return mesh;
  });

  const core = new Mesh(
    new IcosahedronGeometry(1.15, 0),
    new MeshPhysicalMaterial({
      color: ORANGE,
      metalness: 0.35,
      roughness: 0.22,
      clearcoat: 1,
      clearcoatRoughness: 0.15,
      flatShading: true,
    }),
  );
  root.add(core);

  const shell = new Mesh(
    new IcosahedronGeometry(1.65, 1),
    new MeshBasicMaterial({
      color: lineColor,
      wireframe: true,
      transparent: true,
      opacity: 0.16,
    }),
  );
  lineMaterials.push(shell.material);
  root.add(shell);

  const satellites = ORBITS.map((o) => {
    const orbit = new Group();
    orbit.rotation.set(...o.tilt);
    const ring = new Mesh(
      new TorusGeometry(o.radius, 0.006, 8, 160),
      new MeshBasicMaterial({ color: lineColor, transparent: true, opacity: 0.26 }),
    );
    const sat = new Mesh(
      new SphereGeometry(o.size, 24, 24),
      new MeshStandardMaterial({ color: o.color, emissive: o.color, emissiveIntensity: 0.9 }),
    );
    lineMaterials.push(ring.material);
    orbit.add(ring, sat);
    root.add(orbit);
    return { ...o, mesh: sat };
  });

  const count = 420;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i += 1) {
    const r = 3.6 + Math.random() * 2.4;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
  }
  const particleGeo = new BufferGeometry();
  particleGeo.setAttribute('position', new BufferAttribute(positions, 3));
  const particles = new Points(
    particleGeo,
    new PointsMaterial({
      color: '#c2410c',
      size: 0.035,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.7,
    }),
  );
  root.add(particles);

  /** Recolours the scene for light/dark mode without rebuilding it. */
  const setTheme = (dark) => {
    const bg = dark ? '#0b0b0d' : '#fafaf7';
    scene.fog.color.set(bg);
    [].concat(floor.material).forEach((mat) => {
      mat.opacity = dark ? 0.4 : 0.3;
    });
    halo.material.opacity = dark ? 0.85 : 0.55;
    ambient.intensity = dark ? 0.45 : 0.75;
    lineMaterials.forEach((mat) => mat.color.set(dark ? '#f2f1ee' : '#111113'));
    shell.material.opacity = dark ? 0.22 : 0.16;
    particles.material.color.set(dark ? '#ffb38a' : '#c2410c');
  };

  return { scene, root, core, shell, satellites, particles, floor, floaters, setTheme };
}

function disposeScene(scene) {
  scene.traverse((obj) => {
    obj.geometry?.dispose();
    if (obj.material) {
      [].concat(obj.material).forEach((mat) => {
        mat.map?.dispose();
        mat.dispose();
      });
    }
  });
}

export default function HeroScene({ dark = false }) {
  const host = useRef(null);
  const themeRef = useRef(null);
  const darkRef = useRef(dark);

  useEffect(() => {
    const el = host.current;
    if (!el) return undefined;

    const renderer = new WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);
    Object.assign(renderer.domElement.style, {
      width: '100%',
      height: '100%',
      display: 'block',
      opacity: '0',
      transition: 'opacity 1.2s cubic-bezier(0.22, 1, 0.36, 1)',
    });

    const camera = new PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 0.5, 7.2);
    camera.lookAt(0, -0.1, 0);

    const { scene, root, core, shell, satellites, particles, floor, floaters, setTheme } =
      buildScene();
    setTheme(darkRef.current);
    themeRef.current = setTheme;

    const resize = () => {
      const { width, height } = el.getBoundingClientRect();
      if (!width || !height) return;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      // Keep the whole system in frame on narrow (portrait) containers.
      camera.position.z = camera.aspect < 1 ? 7.2 / Math.max(camera.aspect, 0.6) : 7.2;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(el);

    // Pointer anywhere on the page, normalised to the scene's box and clamped.
    const pointer = { x: 0, y: 0 };
    const onPointer = (event) => {
      const rect = el.getBoundingClientRect();
      pointer.x = MathUtils.clamp(((event.clientX - rect.left) / rect.width) * 2 - 1, -1.5, 1.5);
      pointer.y = MathUtils.clamp(-((event.clientY - rect.top) / rect.height) * 2 + 1, -1.5, 1.5);
    };
    window.addEventListener('pointermove', onPointer, { passive: true });

    let visible = true;
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(el);

    const clock = new Clock();
    let frame = 0;
    const tick = () => {
      frame = requestAnimationFrame(tick);
      const delta = Math.min(clock.getDelta(), 0.05);
      if (!visible || document.hidden) return;
      const t = clock.elapsedTime;
      const s = window.scrollY * 0.0016;

      root.rotation.y = MathUtils.damp(root.rotation.y, pointer.x * 0.45 + s, 3, delta);
      root.rotation.x = MathUtils.damp(root.rotation.x, -pointer.y * 0.3 + s * 0.25, 3, delta);
      root.position.y = Math.sin(t * 0.8) * 0.08;

      core.rotation.x += delta * 0.18;
      core.rotation.y += delta * 0.24;
      core.scale.setScalar(1 + Math.sin(t * 1.6) * 0.025);
      shell.rotation.y -= delta * 0.08;
      shell.rotation.z += delta * 0.05;
      particles.rotation.y += delta * 0.03;
      particles.rotation.x += delta * 0.01;

      satellites.forEach((sat) => {
        const a = t * sat.speed + sat.phase;
        sat.mesh.position.set(Math.cos(a) * sat.radius, Math.sin(a) * sat.radius, 0);
      });

      floor.position.z = (t * 0.35) % 1;
      floaters.forEach((mesh) => {
        const { base, seed, depth } = mesh.userData;
        mesh.rotation.x += delta * (0.3 + seed * 0.05);
        mesh.rotation.y += delta * (0.4 + seed * 0.04);
        mesh.position.x = base[0] + pointer.x * depth * 0.8;
        mesh.position.y = base[1] + Math.sin(t * 0.9 + seed) * 0.18 + pointer.y * depth * 0.5;
        mesh.position.z = base[2];
      });

      renderer.render(scene, camera);
    };
    tick();
    // Fade the canvas in once the first frame is on screen.
    requestAnimationFrame(() => {
      renderer.domElement.style.opacity = '1';
    });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onPointer);
      ro.disconnect();
      io.disconnect();
      disposeScene(scene);
      renderer.dispose();
      renderer.domElement.remove();
      themeRef.current = null;
    };
  }, []);

  useEffect(() => {
    darkRef.current = dark;
    themeRef.current?.(dark);
  }, [dark]);

  // The radial mask feathers the canvas edges so the grid floor and shapes fade out softly.
  const mask = 'radial-gradient(ellipse 50% 50% at 50% 50%, #000 62%, transparent 100%)';
  return (
    <div
      ref={host}
      style={{ position: 'absolute', inset: 0, maskImage: mask, WebkitMaskImage: mask }}
    />
  );
}
