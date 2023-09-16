import { useAppStore } from 'datas';
import { StageEnter } from './stage/stage-enter';
import { StageIntro } from './stage/stage-intro';
import { StageQuiz } from './stage/stage-quiz';
import { useEffect } from 'react';

export function BaseScene() {
  const [stage, setQuizResult] = useAppStore((state) => [
    state.stage,
    state.setQuizResult,
  ]);

  useEffect(() => {
    if (stage !== 'quiz') setQuizResult(undefined);
  }, [stage]);

  return (
    <group>
      <StageEnter visible={stage === 'enter'} />
      <StageIntro visible={stage === 'intro'} />
      {stage === 'quiz' && <StageQuiz visible={stage === 'quiz'} />}
    </group>
  );
}
