import { Center, Text3D, useFont } from '@react-three/drei';
import { PropsWithChildren } from 'react';
import { Euler, Vector3 } from '@react-three/fiber';

const fontJson = '/fonts/Poppins_Bold.typeface.json';

export function Text3dBold({
  children,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  size = 1.5,
  height = 0.5,
  onClick,
  visible = true,
}: PropsWithChildren & {
  position?: Vector3;
  rotation?: Euler;
  size?: number;
  height?: number;
  onClick?: VoidFunction;
  visible?: boolean;
}) {
  const font = useFont(fontJson);

  return (
    <Center top position={position} rotation={rotation} visible={visible}>
      <Text3D
        castShadow
        lineHeight={0}
        height={height}
        size={size}
        font={font.data}
        onClick={onClick}
      >
        {children}
      </Text3D>
    </Center>
  );
}

useFont.preload(fontJson);
