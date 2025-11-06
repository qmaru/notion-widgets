import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { registerSW } from 'virtual:pwa-register'

const intervalMS = 60 * 60 * 1000;

// eslint-disable-next-line no-unused-vars
const updateSW = registerSW({
  onRegisteredSW(swUrl, r) {
    if (r) {
      setInterval(async () => {
        if (r.installing || !navigator) return

        if ('connection' in navigator && !navigator.onLine) return

        const resp = await fetch(swUrl, {
          cache: 'no-store',
          headers: {
            cache: 'no-store',
            'cache-control': 'no-cache',
          },
        });

        if (resp?.status === 200) await r.update()
      }, intervalMS)
    }
  },
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
