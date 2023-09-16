import { Quiz } from 'datas';

export async function getQuizzesService({
  totalJs,
  totalCss,
  totalHtml,
}: {
  totalJs: number;
  totalCss: number;
  totalHtml: number;
}): Promise<{
  success: boolean;
  data: { questions: Quiz[]; quizId: string } | null;
}> {
  try {
    const url = `/api/get-quizzes?totalJs=${totalJs}&totalCss=${totalCss}&totalHtml=${totalHtml}`;
    const res = await fetch(url, {
      next: { revalidate: 600, tags: ['quizzes'] },
    } as RequestInit);

    if (!res.ok) {
      return Promise.resolve({ success: false, data: null });
    }

    return res.json();
  } catch (error) {
    return Promise.resolve({ success: false, data: null });
  }
}
