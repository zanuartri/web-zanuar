import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'zanuar',
    short_name: 'zanuar',
    start_url: '/',
    display: 'standalone',
    background_color: '#EFE4D2',
    theme_color: '#EFE4D2',
    icons: [{ src: '/icon-512.png', sizes: '512x512', type: 'image/png' }],
  };
}
