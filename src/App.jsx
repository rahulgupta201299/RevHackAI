import { lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';

// Home is part of the main bundle for the fastest first paint; other routes load on demand.
const Services = lazy(() => import('./pages/Services'));
const Work = lazy(() => import('./pages/Work'));
const WhyUs = lazy(() => import('./pages/WhyUs'));
const Experience = lazy(() => import('./pages/Experience'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="services" element={<Services />} />
        <Route path="work" element={<Work />} />
        <Route path="why" element={<WhyUs />} />
        <Route path="experience" element={<Experience />} />
        <Route path="contact" element={<Contact />} />
        <Route path="about" element={<Navigate to="/experience" replace />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
