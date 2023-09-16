import { useAppStore } from 'datas';
import { Button } from '../ui/button';

export function QuizResult() {
  const [quizResult, setStage] = useAppStore((state) => [
    state.quizResult,
    state.setStage,
  ]);

  if (!quizResult) return <></>;

  const { quizzes, answers, score } = quizResult;

  return (
    <div className="w-[50vw] h-[90vh] overflow-auto space-y-4 fixed top-10 left-10 z-50">
      <div className="p-4 bg-secondary/70 space-y-4 w-full flex justify-between items-center">
        Điểm số của bạn là: {score}/{quizzes.length}{' '}
        <Button onClick={() => setStage('intro')}>Đóng</Button>
      </div>
      <div className="space-y-4 w-full">
        {quizzes.map((quiz, quizIndex) => (
          <div key={quizIndex} className="bg-secondary/70 p-4">
            <h2 className="font-bold">
              {quiz.question}{' '}
              <span className="text-destructive">({quiz.level})</span>
            </h2>
            <ol className="my-4 px-10 flex flex-col items-start justify-center gap-3 list-decimal text-white">
              {quiz.choices.map((choice, index) => (
                <li key={index}>
                  <Button
                    key={index}
                    variant={
                      answers[quizIndex].correct.includes(index) &&
                      answers[quizIndex].choices.includes(index)
                        ? 'success'
                        : answers[quizIndex].choices.includes(index)
                        ? 'destructive'
                        : answers[quizIndex].correct.includes(index)
                        ? 'default'
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
  );
}
