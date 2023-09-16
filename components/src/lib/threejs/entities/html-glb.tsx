import { Center, Gltf, useCursor, useGLTF } from '@react-three/drei';
import { ThreeEvent } from '@react-three/fiber';
import { motion } from 'framer-motion-3d';
import { useState } from 'react';
import { Text3d } from '../object/text-3d';
import { MAX_QUIZ, MIN_QUIZ, useAppStore } from 'datas';

const srcHtmlGlb = '/models/html.glb';

export function HtmlGlb() {
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

      newQuizSetup.totalHtml--;
    } else {
      if (totalQuiz + 1 > MAX_QUIZ) return;

      newQuizSetup.totalHtml++;
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
      position={[3, 1, 0]}
    >
      <Center top position={[0, 0, 1.6]} visible={stage === 'intro'}>
        <Text3d size={0.3} height={0.05} rotation={[Math.PI / 2, 0, 0]}>
          {quizSetup.totalHtml}
        </Text3d>
      </Center>
      <Gltf
        onPointerOver={() => set(true)}
        onPointerOut={() => set(false)}
        src={srcHtmlGlb}
        scale={0.005}
        rotation-x={Math.PI / 2}
      />
    </motion.group>
  );
}

useGLTF.preload(srcHtmlGlb);
