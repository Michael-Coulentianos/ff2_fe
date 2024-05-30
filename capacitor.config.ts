import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'Farmers Friend',
  webDir: 'build',
  bundledWebRuntime: false,
  server: {
    url:'http://192.168.68.1:3000',
    cleartext: true
  }
};

export default config;
