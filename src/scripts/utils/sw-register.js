/* eslint-disable max-len */
import {Workbox} from 'workbox-window';

const swRegister = async () => {
  try {
    if ('serviceWorker' in navigator) {
      const workbox = new Workbox('./sw.bundle.js');

      workbox.addEventListener('waiting', () => {
        console.log('New service worker waiting to activate. Please refresh the page.');
      });

      workbox.addEventListener('activated', () => {
        console.log('New service worker activated.');
      });

      await workbox.register();
      console.log('Service worker registered successfully.');
    }
  } catch (error) {
    console.error('Failed to register service worker:', error);
  }
};

export default swRegister;
