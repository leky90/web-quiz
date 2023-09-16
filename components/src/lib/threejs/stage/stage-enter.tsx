import type { GroupProps } from '@react-three/fiber';
import { Text3d } from '../object/text-3d';
import { Text3dBold } from '../object/text-3d-bold';
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion-3d';
import { FormEnterUser } from '../entities/form-enter-user';

export function StageEnter(props: GroupProps) {
  return (
    <group>
      <AnimatePresence>
        {props.visible && (
          <motion.group
            key="stage-enter"
            initial={{ z: -5 }}
            animate={{ z: 0, transition: { duration: 1 } }}
            exit={{ z: -5 }}
          >
            <group position={[-4, 0, 1.5]} rotation-x={Math.PI / 2.4}>
              <Text3d position={[0, -0.5, 0.15]} size={0.4} height={0.05}>
                Enter your name to start <meshPhysicalMaterial color="#fff" />
              </Text3d>
              <Text3dBold position={[0, 0.5, 0]}>
                Say Hi! <meshPhysicalMaterial color="#FECE32" />
              </Text3dBold>
              <FormEnterUser />
            </group>
          </motion.group>
        )}
      </AnimatePresence>
    </group>
  );
}

StageEnter.displayName = 'StageEnter';
