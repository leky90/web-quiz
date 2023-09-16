import { Controls, useAppStore } from 'datas';
import { SphereUser } from '../object/sphere-user';
import { useMemo, useRef } from 'react';
import { motion } from 'framer-motion-3d';
import {
  KeyboardControls,
  KeyboardControlsEntry,
  Ring,
} from '@react-three/drei';

export function CurrentSphereUser({
  message,
  scale = 0.5,
}: {
  message?: string;
  scale?: number;
}) {
  const chatRef = useRef<boolean>();
  const [user, isChatting, setUserPosition] = useAppStore((state) => [
    state.user,
    state.isChatting,
    state.setUserPosition,
  ]);

  chatRef.current = useMemo(() => isChatting || false, [isChatting]);

  const map = useMemo<KeyboardControlsEntry<Controls>[]>(
    () => [
      { name: Controls.forward, keys: ['ArrowUp', 'KeyW'] },
      { name: Controls.back, keys: ['ArrowDown', 'KeyS'] },
      { name: Controls.left, keys: ['ArrowLeft', 'KeyA'] },
      { name: Controls.right, keys: ['ArrowRight', 'KeyD'] },
      { name: Controls.jump, keys: ['Space'] },
    ],
    []
  );

  function onChange(name: string, pressed: boolean) {
    if (!user || chatRef.current) return;

    if (name === Controls.jump) {
      setUserPosition(name as Controls);
    } else {
      if (pressed) setUserPosition(name as Controls);
    }
  }

  const currentPosition = (user ? user.position : [0, 0, 0]) as [
    x: number,
    y: number,
    z: number
  ];

  return user ? (
    <KeyboardControls onChange={onChange} map={map}>
      <motion.group
        initial={{ x: 0, y: 0, z: 0 }}
        animate={{
          x: currentPosition[0],
          y: currentPosition[1],
          z: currentPosition[2],
          transition: {
            duration: 0.25,
          },
        }}
      >
        <group position-z={0.5}>
          <SphereUser
            name={user.name}
            color={user.color}
            chat={user.chat || message}
            rotation={[Math.PI / 2, 0, 0]}
            scale={scale}
          />
        </group>
        <Ring scale={0.5} position={[0, 0, 0.1]}>
          <meshBasicMaterial color="white" />
        </Ring>
      </motion.group>
    </KeyboardControls>
  ) : (
    <></>
  );
}
