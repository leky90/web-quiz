import type { GroupProps } from '@react-three/fiber';
import { Text3dBold } from '../object/text-3d-bold';
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion-3d';
import { Gltf, Html, useGLTF } from '@react-three/drei';
import { JsGlb } from '../entities/js-glb';
import { CssGlb } from '../entities/css-glb';
import { HtmlGlb } from '../entities/html-glb';
import { useCallback, useEffect, useState } from 'react';
import { checkQuizService, getQuizzesService } from 'service';
import { Answer, BASE_COUNTDOWN, Quiz, useAppStore } from 'datas';
import { Button } from '../../ui/button';
import { ButtonBackIntro } from '../entities/button-back-intro';

const srcVNMapGlb = '/models/vietnam-map-full.glb';

export function StageQuiz(props: GroupProps) {
  const [quizSetup, setQuizResult] = useAppStore((state) => [
    state.quizSetup,
    state.setQuizResult,
  ]);
  const [countdown, setCountdown] = useState(BASE_COUNTDOWN);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [score, setScore] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState<Quiz | null>(null);
  const [quizId, setQuizId] = useState<string | undefined>();
  const [choices, setChoices] = useState<number[]>([]);
  const [answers, setAnswers] = useState<(Answer & { choices: number[] })[]>(
    []
  );

  const getQuizzes = useCallback(
    async function () {
      setScore(0);
      setQuizzes([]);
      setLoading(true);
      const response = await getQuizzesService(quizSetup);
      setLoading(false);

      if (response.data) {
        setQuizId(response.data.quizId);
        setQuizzes(response.data.questions);
        setCurrentQuiz(response.data.questions[0]);
      }
    },
    [quizSetup]
  );

  const checkQuiz = useCallback(
    async function (index: number) {
      if (!quizId) return;

      setQuizIndex(index + 1);
      setChoices([]);
      setCountdown(BASE_COUNTDOWN);

      const response = await checkQuizService({ index, choices, quizId });

      if (response.success) {
        setScore((score) => score + 1);
      }

      setAnswers([
        ...answers,
        response.answer as Answer & { choices: number[] },
      ]);
    },
    [answers, choices, quizId]
  );

  useEffect(() => {
    if (!props.visible || !quizzes.length || quizIndex >= quizzes.length)
      return;

    const timeId = setTimeout(() => {
      if (countdown - 1 < 0) {
        checkQuiz(quizIndex);
      } else {
        setCountdown(countdown - 1);
      }
    }, 1000);

    return () => {
      clearTimeout(timeId);
    };
  }, [countdown, props.visible, quizIndex, quizzes.length, checkQuiz]);

  useEffect(() => {
    if (!props.visible) return;

    if (quizzes.length) return;

    getQuizzes();
  }, [getQuizzes, props.visible, quizSetup, quizzes.length]);

  useEffect(() => {
    setCurrentQuiz(quizzes[quizIndex]);
  }, [quizIndex, quizzes]);

  const selectChoice = (index: number) => {
    setChoices((choices) => {
      if (choices.includes(index)) {
        return choices.filter((choiceIndex) => choiceIndex !== index);
      } else {
        return choices.concat(index);
      }
    });
  };

  useEffect(() => {
    if (quizzes.length === answers.length && quizId)
      setQuizResult({ quizId, answers, quizzes, score });
  }, [quizzes, answers]);

  return (
    <group>
      <AnimatePresence>
        {props.visible && (
          <motion.group
            key="stage-intro"
            initial={{ z: -5 }}
            animate={{ z: 0, transition: { duration: 1, delay: 0.5 } }}
            exit={{ z: -5 }}
          >
            {currentQuiz && (
              <group position={[-4, 4, 1.5]} rotation-x={Math.PI / 2.4}>
                <Text3dBold position={[0, 0, 0]}>
                  Quiz {quizIndex + 1} <meshPhysicalMaterial color="#FECE32" />
                </Text3dBold>
                <Html position={[0, -5, 0]} transform>
                  <h2 className="p-4 bg-secondary/70 space-y-4 font-bold w-96">
                    {currentQuiz.question}{' '}
                    <span className="text-destructive">
                      ({currentQuiz.level})
                    </span>
                  </h2>
                  <ol className="my-4 flex flex-col items-start justify-center gap-3 list-decimal text-white">
                    {currentQuiz.choices.map((choice, index) => (
                      <li key={index}>
                        <Button
                          key={index}
                          onClick={() => selectChoice(index)}
                          variant={
                            choices.includes(index) ? 'secondary' : 'outline'
                          }
                        >
                          {choice}
                        </Button>
                      </li>
                    ))}
                  </ol>
                  <div>
                    <Button onClick={() => checkQuiz(quizIndex)}>OK</Button>
                  </div>
                </Html>
              </group>
            )}
            <group position={[6, 0, 0]}>
              <Text3dBold
                position={[-1, 4, 1]}
                rotation={[Math.PI / 2, 0, 0]}
                size={0.8}
                height={0.2}
                visible={Boolean(currentQuiz)}
              >
                {countdown} <meshPhysicalMaterial color="#FECE32" />
              </Text3dBold>
              <Gltf
                position={[-1, 0, -0.4]}
                scale={2}
                rotation={[-Math.PI / 2, 0, 0]}
                src={srcVNMapGlb}
              />

              <HtmlGlb />
              <CssGlb />
              <JsGlb />

              <ButtonBackIntro position={[-2, -5, 0]} />
            </group>
            {loading ? (
              <Html center position={[0, 0, 0]}>
                <div className="p-4 bg-secondary/70 space-y-4 w-[500px]">
                  Đang chuẩn bị bộ câu hỏi. Vui lòng chờ trong giây lát! <br />
                  <small>
                    <em>
                      (Số lượng câu hỏi càng nhiều thì sẽ càng mất nhiều thời
                      gian.)
                    </em>
                  </small>
                </div>
              </Html>
            ) : (
              quizzes.length === 0 && (
                <Html center position={[0, 0, 0]}>
                  <div className="p-4 bg-secondary/70 space-y-4 w-[500px]">
                    Có lỗi xảy ra, không thể khởi tạo bộ câu hỏi.
                  </div>
                </Html>
              )
            )}

            {/* {quizIndex >= quizzes.length &&
              quizzes.length > 0 &&
              quizzes.length === answers.length && (
                <Html center position={[-6, 0, 0]}>
                  <div className="w-[50vw] h-[90vh] overflow-auto space-y-4">
                    <div className="p-4 bg-secondary/70 space-y-4 w-full">
                      Điểm số của bạn là: {score}/{quizzes.length}
                    </div>
                    <div className="space-y-4 w-full">
                      {quizzes.map((quiz, quizIndex) => (
                        <div key={quizIndex} className="bg-secondary/70 p-4">
                          <h2 className="font-bold">
                            {quiz.question}{' '}
                            <span className="text-destructive">
                              ({quiz.level})
                            </span>
                          </h2>
                          <ol className="my-4 px-10 flex flex-col items-start justify-center gap-3 list-decimal text-white">
                            {quiz.choices.map((choice, index) => (
                              <li key={index}>
                                <Button
                                  key={index}
                                  variant={
                                    answers[quizIndex].correct.includes(index)
                                      ? 'success'
                                      : answers[quizIndex].choices.includes(
                                          index
                                        )
                                      ? 'destructive'
                                      : 'outline'
                                  }
                                >
                                  {choice}
                                </Button>
                              </li>
                            ))}
                          </ol>
                          <blockquote className="border-l-2 border-black bg-blue-50 px-3">
                            {answers[quizIndex].explanation}
                          </blockquote>
                        </div>
                      ))}
                    </div>
                  </div>
                </Html>
              )} */}
          </motion.group>
        )}
      </AnimatePresence>
    </group>
  );
}

StageQuiz.displayName = 'StageQuiz';

useGLTF.preload(srcVNMapGlb);
