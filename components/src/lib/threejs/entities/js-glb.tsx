import { Center, Gltf, useCursor, useGLTF } from '@react-three/drei';
import { motion } from 'framer-motion-3d';
import { useState } from 'react';
import { Text3d } from '../object/text-3d';
import { ThreeEvent } from '@react-three/fiber';
import { MAX_QUIZ, MIN_QUIZ, useAppStore } from 'datas';

const srcJsGlb = '/models/js.glb';

export function JsGlb() {
  const [quizSetup, setQuizSetup, stage] = useAppStore((state) => [
    state.quizSetup,
    state.setQuizSetup,
    state.stage,
  ]);
  const [hovered, set] = useState(false);
  useCursor(hovered);

  function onClick(e: ThreeEvent<MouseEvent>) {
    e.stopPropagation();

    if (stage !== 'intro') return;

    const newQuizSetup = { ...quizSetup };
    const totalQuiz =
      newQuizSetup.totalCss + newQuizSetup.totalHtml + newQuizSetup.totalJs;

    if (e.button) {
      if (totalQuiz - 1 < MIN_QUIZ) return;

      newQuizSetup.totalJs--;
    } else {
      if (totalQuiz + 1 > MAX_QUIZ) return;

      newQuizSetup.totalJs++;
    }

    setQuizSetup(newQuizSetup);
  }

  return (
    <motion.group
      initial={{ z: 0.25 }}
      whileHover={{
        z: 0.5,
        transition: { repeat: Infinity, repeatType: 'mirror', duration: 0.75 },
      }}
      position={[2.5, -5.5, 0.5]}
      onPointerDown={onClick}
    >
      <Center top position={[-0.15, 1.25, 0.9]} visible={stage === 'intro'}>
        <Text3d size={0.3} height={0.05} rotation={[Math.PI / 2, 0, 0]}>
          {quizSetup.totalJs}
        </Text3d>
      </Center>
      <Gltf
        onPointerOver={() => set(true)}
        onPointerOut={() => set(false)}
        src={srcJsGlb}
        scale={5}
        rotation-x={0}
        rotation-y={-Math.PI / 2}
        rotation-z={-Math.PI / 2}
      />
    </motion.group>
  );
}

useGLTF.preload(srcJsGlb);
