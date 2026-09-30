import '@fontsource-variable/inter';
import '@fontsource-variable/space-grotesk';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { LazyMotion, MotionConfig, domAnimation } from 'framer-motion';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import theme from './theme';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme} defaultMode="system">
        <CssBaseline enableColorScheme />
        <LazyMotion features={domAnimation} strict>
          <MotionConfig reducedMotion="user">
            <App />
          </MotionConfig>
        </LazyMotion>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
);
