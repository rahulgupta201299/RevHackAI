'use client';

import { useEffect, useRef } from 'react';
import {
  MathUtils,
  Mesh,
  OrthographicCamera,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
  SRGBColorSpace,
  TextureLoader,
  WebGLRenderer,
} from 'three';

export default function HumanPortrait({ dark }: { dark: boolean }) {
  const host = useRef<HTMLDivElement>(null);
  const theme = useRef<((dark: boolean) => void) | null>(null);
  const darkRef = useRef(dark);

  useEffect(() => {
    const element = host.current;
    if (!element) return undefined;

    let renderer: WebGLRenderer;
    try {
      renderer = new WebGLRenderer({ alpha: true, antialias: true });
    } catch {
      Object.assign(element.style, {
        backgroundImage: darkRef.current ? 'url(/hero-cyber-male.webp)' : 'url(/hero-cyber-male-light.webp)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'auto 100%',
        backgroundPosition: 'right top',
        maskImage: 'linear-gradient(to right, transparent, black 55%)',
      });
      return undefined;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = SRGBColorSpace;
    element.appendChild(renderer.domElement);
    Object.assign(renderer.domElement.style, { display: 'block', width: '100%', height: '100%' });

    const scene = new Scene();
    const camera = new OrthographicCamera(-3, 3, 3, -3, 0.1, 100);
    camera.position.z = 10;
    const texture = new TextureLoader().load('/hero-cyber-male.webp');
    texture.colorSpace = SRGBColorSpace;
    const lightTexture = new TextureLoader().load('/hero-cyber-male-light.webp');
    lightTexture.colorSpace = SRGBColorSpace;
    const material = new ShaderMaterial({
      transparent: true,
      uniforms: {
        image: { value: texture },
        lightImage: { value: lightTexture },
        isDark: { value: darkRef.current ? 1 : 0 },
        crop: { value: 1 },
        center: { value: 0.65 },
      },
      vertexShader: `
        varying vec2 imageUv;
        void main() {
          imageUv = uv;
          vec3 point = position;
          vec2 centered = (uv - vec2(0.5, 0.62)) * vec2(1.7, 1.3);
          point.z += 0.28 * exp(-dot(centered, centered) * 3.0);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(point, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D image;
        uniform sampler2D lightImage;
        uniform float isDark;
        uniform float crop;
        uniform float center;
        varying vec2 imageUv;
        void main() {
          vec2 uv = vec2(imageUv.x, (imageUv.y - 0.5) * crop + center);
          vec3 color = mix(texture2D(lightImage, uv).rgb, texture2D(image, uv).rgb, isDark);
          float horizontal = smoothstep(0.0, 0.19, imageUv.x) * (1.0 - smoothstep(0.94, 1.0, imageUv.x));
          float vertical = smoothstep(0.0, 0.12, imageUv.y) * (1.0 - smoothstep(0.94, 1.0, imageUv.y));
          gl_FragColor = vec4(color, horizontal * vertical);
          #include <tonemapping_fragment>
          #include <colorspace_fragment>
        }
      `,
    });
    const portrait = new Mesh(new PlaneGeometry(1, 1, 48, 48), material);
    scene.add(portrait);
    const setTheme = (isDark: boolean) => { material.uniforms.isDark.value = isDark ? 1 : 0; };
    theme.current = setTheme;

    const resize = () => {
      const { width, height } = element.getBoundingClientRect();
      if (!width || !height) return;
      const aspect = width / height;
      camera.left = -3 * aspect;
      camera.right = 3 * aspect;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
      const mobile = width < 900;
      const planeWidth = mobile ? 6 * aspect : Math.min(6.7, 4.1 * aspect);
      const planeHeight = mobile ? 1.8 : 6;
      portrait.scale.set(planeWidth, planeHeight, 1);
      portrait.position.set(mobile ? 0 : 1.55 * aspect, mobile ? 2.1 : 0, 0);
      material.uniforms.crop.value = Math.min(1, (planeHeight / planeWidth) * (2 / 3));
      material.uniforms.center.value = mobile ? 0.77 : 0.65;
    };
    const observer = new ResizeObserver(resize);
    observer.observe(element);
    resize();

    const pointer = { x: 0, y: 0 };
    const onPointer = (event: PointerEvent) => {
      pointer.x = event.clientX / window.innerWidth - 0.5;
      pointer.y = event.clientY / window.innerHeight - 0.5;
    };
    window.addEventListener('pointermove', onPointer, { passive: true });
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    const render = (time: number) => {
      const motion = reducedMotion.matches ? 0 : 1;
      portrait.rotation.y = MathUtils.lerp(portrait.rotation.y, motion * (pointer.x * 0.12 + Math.sin(time * 0.0004) * 0.025), 0.04);
      portrait.rotation.x = MathUtils.lerp(portrait.rotation.x, motion * pointer.y * -0.06, 0.04);
      renderer.render(scene, camera);
      frame = requestAnimationFrame(render);
    };
    frame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('pointermove', onPointer);
      portrait.geometry.dispose();
      material.dispose();
      texture.dispose();
      lightTexture.dispose();
      renderer.dispose();
      renderer.domElement.remove();
      theme.current = null;
    };
  }, []);

  useEffect(() => {
    darkRef.current = dark;
    theme.current?.(dark);
    if (!theme.current && host.current) {
      host.current.style.backgroundImage = dark ? 'url(/hero-cyber-male.webp)' : 'url(/hero-cyber-male-light.webp)';
    }
  }, [dark]);

  return <div ref={host} aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />;
}