import { RoundedBox, useCursor } from '@react-three/drei';
import { useState } from 'react';
import { motion } from 'framer-motion-3d';
import { Text3dBold } from '../object/text-3d-bold';
import { Vector3 } from '@react-three/fiber';
import { useAppStore } from 'datas';

export function ButtonStartQuiz({
  position = [0, 0, 0],
}: {
  position?: Vector3;
}) {
  const [hovered, set] = useState(false);
  useCursor(hovered);
  const [setStage] = useAppStore((state) => [state.setStage]);

  function onClick() {
    setStage('quiz');
  }

  return (
    <motion.group
      initial={{ z: -0.3 }}
      whileHover={{
        z: -0.5,
        transition: { repeat: Infinity, repeatType: 'mirror', duration: 0.75 },
      }}
      whileTap={{
        z: -0.7,
        transition: { duration: 0.2 },
      }}
      position={position}
    >
      <RoundedBox
        args={[3, 0.8]}
        position={[0, -2, 0.4]}
        onPointerOver={() => set(true)}
        onPointerOut={() => set(false)}
        onClick={onClick}
      >
        <meshStandardMaterial color="#fece32" />
        <Text3dBold position={[0, -0.15, 0.5]} size={0.3} height={0.1}>
          Start quiz <meshPhysicalMaterial color="#1C63FF" />
        </Text3dBold>
      </RoundedBox>
    </motion.group>
  );
}
