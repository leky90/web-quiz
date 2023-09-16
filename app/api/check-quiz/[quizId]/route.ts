import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';
import https from 'https';
import { Answer } from 'datas';

const redis = Redis.fromEnv({ agent: new https.Agent({ keepAlive: true }) });

function compareArrays(arr1: number[], arr2: number[]) {
  if (arr1.length !== arr2.length) {
    return false; // Arrays have different lengths
  }

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false; // Values at index i are not equal
    }
  }

  return true; // Arrays are equal
}

export async function POST(
  request: Request,
  { params }: { params: { quizId: string } }
) {
  try {
    const { choices, index } = await request.json();
    const quizId = params.quizId;
    const answers: Answer[] | null = await redis.get(quizId);

    if (!answers) return NextResponse.json({ success: false });

    const result = compareArrays(answers[index].correct, choices.sort());

    return NextResponse.json({
      success: result,
      answer: { ...answers[index], choices },
    });
  } catch (error) {
    return NextResponse.json({ success: false });
  }
}
