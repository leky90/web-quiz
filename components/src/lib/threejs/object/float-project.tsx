import { Html, RoundedBox, useCursor } from '@react-three/drei';
import { Vector3 } from '@react-three/fiber';
import { useState } from 'react';
import { Text3dBold } from './text-3d-bold';

export function FloatProject({
  url,
  project,
  position = [0, 0, 0],
  size = [2, 1],
  color = '#28adad',
}: {
  url: string;
  project: string;
  position?: Vector3;
  size?: [number, number];
  color?: string;
}) {
  const [hovered, set] = useState(false);
  useCursor(hovered);

  const openLink = () => {
    window.open(url, '_blank');
  };

  return (
    <group position={position}>
      <RoundedBox
        args={size}
        onPointerOver={() => set(true)}
        onPointerOut={() => set(false)}
        position={[0, 0, 0]}
      >
        <meshPhysicalMaterial color={color} />

        <Html transform position={[0, 0.5, 0.15]}>
          <a href={url} target="_blank">
            <span className="flex items-center justify-center">
              <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-background/50" />
              <span className="relative inline-flex justify-center items-center rounded-full h-2 text-base w-2 bg-background/70 group-hover:bg-background/90" />
            </span>
          </a>
        </Html>
      </RoundedBox>
      <Text3dBold position={[0, -0.1, 0.5]} size={0.2} height={0.1}>
        {project} <meshBasicMaterial color="white" />
      </Text3dBold>

      {hovered && (
        <Html transform position={[0, -3, 0.2]}>
          <iframe
            title="embed"
            className="h-[768px] w-[1280px] scrollbar scale-[20%]"
            src={url}
            frameBorder={0}
          />
        </Html>
      )}
    </group>
  );
}
