import { Center, Gltf, useCursor, useGLTF } from '@react-three/drei';
import { ThreeEvent } from '@react-three/fiber';
import { motion } from 'framer-motion-3d';
import { useState } from 'react';
import { Text3d } from '../object/text-3d';
import { BASE_QUIZ, MAX_QUIZ, MIN_QUIZ, useAppStore } from 'datas';

const srcCssGlb = '/models/css.glb';

export function CssGlb() {
  const [quizSetup, setQuizSetup, stage] = useAppStore((state) => [
    state.quizSetup,
    state.setQuizSetup,
    state.stage,
  ]);
  const [number, setNumber] = useState(BASE_QUIZ);
  const [hovered, set] = useState(false);
  useCursor(hovered);

  function onClick(e: ThreeEvent<MouseEvent>) {
    e.stopPropagation();

    if (stage !== 'intro') return;

    const newQuizSetup = { ...quizSetup };

    if (e.button) {
      if (number - 1 < MIN_QUIZ) return;

      setNumber(number - 1);
      newQuizSetup.totalCss--;
    } else {
      if (number + 1 > MAX_QUIZ) return;

      setNumber(number + 1);
      newQuizSetup.totalCss++;
    }

    setQuizSetup(newQuizSetup);
  }

  return (
    <motion.group
      initial={{ z: 0 }}
      whileHover={{
        z: 0.25,
        transition: { repeat: Infinity, repeatType: 'mirror', duration: 0.75 },
      }}
      onPointerDown={onClick}
      position={[-0.5, -3, 0]}
    >
      <Center top position={[0, 0, 1.6]} visible={stage === 'intro'}>
        <Text3d size={0.3} height={0.05} rotation={[Math.PI / 2, 0, 0]}>
          {number}
        </Text3d>
      </Center>
      <Gltf
        onPointerOver={() => set(true)}
        onPointerOut={() => set(false)}
        src={srcCssGlb}
        scale={0.005}
        rotation-x={Math.PI / 2}
      />
    </motion.group>
  );
}

useGLTF.preload(srcCssGlb);
