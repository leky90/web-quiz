import { RoundedBox, useCursor } from '@react-three/drei';
import { useState } from 'react';
import { motion } from 'framer-motion-3d';
import { Text3dBold } from '../object/text-3d-bold';
import { Vector3 } from '@react-three/fiber';
import { useAppStore } from 'datas';

export function ButtonBackIntro({
  position = [0, 0, 0],
  cbOnClick,
}: {
  position?: Vector3;
  cbOnClick?: VoidFunction;
}) {
  const [hovered, set] = useState(false);
  useCursor(hovered);
  const [setStage] = useAppStore((state) => [state.setStage]);

  function onClick() {
    setStage('intro');
    cbOnClick && cbOnClick();
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
        <meshStandardMaterial color="red" />
        <Text3dBold position={[0, -0.15, 0.5]} size={0.3} height={0.1}>
          Back <meshPhysicalMaterial color="yellow" />
        </Text3dBold>
      </RoundedBox>
    </motion.group>
  );
}
