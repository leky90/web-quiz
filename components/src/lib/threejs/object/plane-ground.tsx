'use client';

import { Plane } from '@react-three/drei';
import { Euler } from '@react-three/fiber';

export function PlaneGround({
  color = '#1C63FF',
  visible = true,
  rotation = [0, 0, 0],
}: {
  color?: string;
  visible?: boolean;
  rotation?: Euler;
}) {
  return (
    <Plane
      args={[1000, 1000]}
      rotation={rotation}
      position={[0, -0.001, 0]}
      visible={visible}
      receiveShadow
      castShadow
    >
      <meshBasicMaterial color={color} toneMapped />
    </Plane>
  );
}
