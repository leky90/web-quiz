export const revalidate = 600;

import { BASE_COUNTDOWN, BASE_QUIZ, Quiz } from 'datas';
import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';
import https from 'https';
import OpenAI from 'openai';
import type { ChatCompletion } from 'openai/resources/chat';

export const openai = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'],
});

const redis = Redis.fromEnv({ agent: new https.Agent({ keepAlive: true }) });

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const totalHtml = Number(searchParams.get('totalHtml')) || BASE_QUIZ;
  const totalJs = Number(searchParams.get('totalJs')) || BASE_QUIZ;
  const totalCss = Number(searchParams.get('totalCss')) || BASE_QUIZ;
  const totalQuestions = totalCss + totalJs + totalHtml;

  const prompt = `Create ${totalQuestions} multiple choice questions about knowledge of Javascript, CSS, and HTML, questions cannot be duplicated, the number of questions about Javascript is ${totalJs}, the number of questions about HTML is ${totalHtml}, the number of questions about CSS is ${totalCss}, there may be one or more correct options, accompanied by an explanation for the correct answer.  Provide output in minify JSON format as follows:
  
  {
      "questions": [{
          question: string,
          choices: [string, string, string, string],
          level: "beginner" | "intermediate" | "advanced",
          type: "Javascript" | "CSS" | "HTML"
      }],
      "answers": [{
          correct: [number, ...],
          explanation: string
      }]
  }`;

  try {
    const chatCompletion: ChatCompletion = await openai.chat.completions.create(
      {
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 16000,
        model: 'gpt-3.5-turbo-16k-0613',
      }
    );

    if (!chatCompletion.choices[0].message.content)
      return NextResponse.json({ success: false, data: [] });

    const result: { questions: Quiz[]; answers: [] } = JSON.parse(
      chatCompletion.choices[0].message.content
    );
    const questions = result.questions;
    const quizId = chatCompletion.id.replace('chatcmpl-', '');

    redis.set(quizId, result.answers, {
      ex: totalQuestions * (BASE_COUNTDOWN + 5),
    });

    console.log('token usage', chatCompletion.usage);

    return NextResponse.json({ success: true, data: { questions, quizId } });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
