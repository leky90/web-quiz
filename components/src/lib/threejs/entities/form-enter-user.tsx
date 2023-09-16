import { Html } from '@react-three/drei';
import { Input } from '../../ui/input';
import { FormEvent, useState } from 'react';
import { cn } from 'utils';
import { User, useAppStore } from 'datas';
import { generateUUID } from 'three/src/math/MathUtils';
import { SphereUser } from '../object/sphere-user';
import { Button } from '../../ui/button';

export function FormEnterUser() {
  const [setUser, setStage] = useAppStore((state) => [
    state.setUser,
    state.setStage,
  ]);
  const [color, setColor] = useState('red');
  const [name, setName] = useState('User 1');

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (name.trim() === '') return;

    const user: User = {
      id: generateUUID(),
      name: name.trim(),
      color,
      position: [0, 0, 0],
    };

    setUser(user);
    setStage('intro');
  }

  return (
    <>
      <Html center transform position={[0.5, -3, 2]}>
        <form className="p-4 bg-secondary/70 space-y-4" onSubmit={onSubmit}>
          <Input
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={8}
          />
          <div className="grid grid-cols-6 gap-4">
            <label
              className={cn(
                'w-10 h-10 bg-red-500 rounded-full border-white cursor-pointer',
                color === 'red' && 'border-2'
              )}
              onClick={() => setColor('red')}
            />
            <label
              className={cn(
                'w-10 h-10 bg-blue-500 rounded-full border-white cursor-pointer',
                color === 'dodgerblue' && 'border-2'
              )}
              onClick={() => setColor('dodgerblue')}
            />
            <label
              className={cn(
                'w-10 h-10 bg-green-500 rounded-full border-white cursor-pointer',
                color === 'lawngreen' && 'border-2'
              )}
              onClick={() => setColor('lawngreen')}
            />
            <label
              className={cn(
                'w-10 h-10 bg-yellow-500 rounded-full border-white cursor-pointer',
                color === 'yellow' && 'border-2'
              )}
              onClick={() => setColor('yellow')}
            />
            <label
              className={cn(
                'w-10 h-10 bg-violet-500 rounded-full border-white cursor-pointer',
                color === 'blueviolet' && 'border-2'
              )}
              onClick={() => setColor('blueviolet')}
            />
            <label
              className={cn(
                'w-10 h-10 bg-pink-500 rounded-full border-white cursor-pointer',
                color === 'hotpink' && 'border-2'
              )}
              onClick={() => setColor('hotpink')}
            />
          </div>
          <Button>Submit</Button>
        </form>
      </Html>
      <SphereUser position={[8, -1, 3]} name={name} color={color} />
    </>
  );
}
