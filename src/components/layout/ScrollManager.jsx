import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** Scrolls to the top and moves focus to <main> on route change (a11y for SPA navigation). */
export default function ScrollManager() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.getElementById('main')?.focus({ preventScroll: true });
  }, [pathname]);

  return null;
}
