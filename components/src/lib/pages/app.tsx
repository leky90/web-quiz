'use client';

import { Html, useProgress } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { BaseScene } from '../threejs/base-scene';
import { EnvControl } from '../threejs/env-control';
import { CameraControl } from '../threejs/camera-control';
import { PlaneGround } from '../threejs/object/plane-ground';
import { Progress } from '../ui/progress';
import { DevTools } from '../threejs/develop-tools';
import { Toaster } from '../ui/toaster';
import { FormChat } from '../ui-kit/form-chat';
import { buttonVariants } from '../ui/button';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { useTabActivity, useWebsocket } from 'hooks';
import { Suspense } from 'react';
import { cn } from 'utils';
import { QuizResult } from '../ui-kit/quiz-result';

export function App() {
  const { isActive } = useTabActivity();
  const { progress } = useProgress();
  useWebsocket();

  return (
    <>
      <div className="lg:hidden fixed top-0 left-0 flex items-center justify-center w-screen h-screen z-10">
        <h3 className="text-primary-foreground text-xl">
          Only support screen over 1024px now.
        </h3>
      </div>
      <input
        type="checkbox"
        id="tutorial"
        style={{ visibility: 'hidden' }}
        className="[&:checked+div]:hidden"
      />
      <div className="bg-primary/70 rounded p-6 fixed top-0 left-0 flex flex-col gap-4 text-primary-foreground items-center justify-center w-screen h-screen z-20">
        <ul className="space-y-2">
          <li>
            Use the keys <mark className="px-2">W</mark>{' '}
            <mark className="px-2">S</mark> <mark className="px-2">D</mark>{' '}
            <mark className="px-2">A</mark> keys to move.
          </li>
          <li>
            Or the keys <mark className="px-2">&uarr;</mark>{' '}
            <mark className="px-2">&darr;</mark>{' '}
            <mark className="px-2"> &rarr;</mark>{' '}
            <mark className="px-2"> &larr;</mark> to move.
          </li>
          <li>
            Use the key <mark className="px-2">Space</mark> to jump.
          </li>
        </ul>
        <p className="text-primary-foreground">
          <label
            htmlFor="tutorial"
            className={cn(buttonVariants(), 'cursor-pointer')}
          >
            Got it!
          </label>
        </p>
      </div>
      <div className="fixed top-0 left-0 w-screen h-screen z-10 hidden lg:block">
        <Canvas
          frameloop={isActive ? 'always' : 'demand'}
          camera={{ fov: 40, position: [10, -5, 20] }}
          shadows
        >
          {/* <DevTools performance={false} /> */}
          <CameraControl />

          <Suspense
            fallback={
              <Html center className="z-50">
                <div className="w-96 h-4 text-primary">
                  Loading...
                  <Progress value={progress} />
                </div>
              </Html>
            }
          >
            <EnvControl />
            <BaseScene />
            <PlaneGround />
          </Suspense>
        </Canvas>
      </div>
      <QuizResult />
      <FormChat />
      <Toaster />
    </>
  );
}

export default App;
