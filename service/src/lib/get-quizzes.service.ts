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
    const url = `${
      process.env['NEXT_PUBLIC_BASE_API_HOSTNAME']
    }/api/get-quizzes?totalJs=${totalJs || 0}&totalCss=${
      totalCss || 0
    }&totalHtml=${totalHtml || 0}`;
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
