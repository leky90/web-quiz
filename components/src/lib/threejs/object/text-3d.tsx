import { Center, Text3D, useFont } from '@react-three/drei';
import { PropsWithChildren, forwardRef } from 'react';
import { Euler, Vector3 } from '@react-three/fiber';
import { Mesh } from 'three';

const fontJson = '/fonts/Poppins_Regular.typeface.json';

export const Text3d = forwardRef<
  Mesh,
  PropsWithChildren & {
    position?: Vector3;
    rotation?: Euler;
    size?: number;
    height?: number;
    castShadow?: boolean;
  }
>(
  (
    {
      children,
      position = [0, 0, 0],
      rotation = [0, 0, 0],
      size = 1.5,
      height = 0.5,
      castShadow = true,
    },
    ref
  ) => {
    const font = useFont(fontJson);

    return (
      <Center top position={position} rotation={rotation}>
        <Text3D
          castShadow={castShadow}
          lineHeight={0}
          height={height}
          size={size}
          font={font.data}
          ref={ref}
        >
          {children}
        </Text3D>
      </Center>
    );
  }
);

useFont.preload(fontJson);
