'use client';

import dynamic from 'next/dynamic';

const App = dynamic(() => import('components').then((mod) => mod.App), {
  ssr: false,
});

export default function Index() {
  return <App />;
}
