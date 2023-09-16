import axios from 'axios';
import { Answer } from 'datas';

export async function checkQuizService({
  index,
  choices,
  quizId,
}: {
  index: number;
  choices: number[];
  quizId: string;
}): Promise<{ success: boolean; answer?: Answer & { choices: number[] } }> {
  try {
    const url = `${process.env['NEXT_PUBLIC_BASE_API_HOSTNAME']}/api/check-quiz/${quizId}`;
    const res = await axios(url, { method: 'POST', data: { index, choices } });

    if (!res.status) {
      return Promise.resolve({
        success: false,
        answer: { choices: [], correct: [], explanation: '' },
      });
    }

    return res.data;
  } catch (error) {
    return Promise.resolve({
      success: false,
      answer: { choices: [], correct: [], explanation: '' },
    });
  }
}
