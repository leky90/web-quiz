import { Html, Sphere } from '@react-three/drei';
import { Euler, Vector3 } from '@react-three/fiber';

export function SphereUser({
  name,
  chat,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  color = 'white',
  visible = true,
}: {
  name: string;
  chat?: string;
  position?: Vector3;
  rotation?: Euler;
  scale?: number;
  color?: string;
  visible?: boolean;
}) {
  return (
    <group
      position={position}
      visible={visible}
      rotation={rotation}
      scale={scale}
    >
      {/* <Text3d
        size={0.3}
        height={0.05}
        position={[(1 - (name.length - 1) * 0.1) * (scale / 2), 1.2, 0]}
      >
        {name}
      </Text3d> */}
      <Html transform center>
        {chat && (
          <p className="text-white p-2 bg-primary/50 rounded mb-24">{chat}</p>
        )}
      </Html>

      <Html transform center>
        <strong className="text-white">{name}</strong>
      </Html>
      <Sphere>
        <meshPhysicalMaterial color={color} />
      </Sphere>
    </group>
  );
}
