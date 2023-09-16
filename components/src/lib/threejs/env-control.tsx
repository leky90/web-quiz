'use client';

export function EnvControl() {
  return (
    <>
      <color attach="background" args={['#fff']} />
      <ambientLight />
      <directionalLight position={[5, -10, 10]} intensity={1.75} />
    </>
  );
}
