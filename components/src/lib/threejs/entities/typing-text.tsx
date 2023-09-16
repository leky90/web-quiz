'use client';

import { useEffect, useRef, useState } from 'react';
import { Text3d } from '../object/text-3d';
import { Vector3 } from '@react-three/fiber';

const texts = [
  '`Left Click` on HTML, CSS, and JS to increase number of questions.',
  '`Right Click` on HTML, CSS, and JS to decrease the number of questions.',
  "Click on `Start` button when you're ready.",
];

export function TypingText({
  delay = 60,
  position,
}: {
  delay?: number;
  position?: Vector3;
}) {
  const count = useRef(0);
  const index = useRef(-1);
  const [text, setText] = useState('...');

  useEffect(() => {
    let speed = delay;
    if (count.current === texts.length) {
      count.current = 0;
    }

    const currentText = texts[count.current];

    if (index.current >= currentText.length) {
      speed = 2000;
      count.current++;
      index.current = 0;
    } else {
      if (index.current === -1) {
        index.current += 2;
        speed = 500;
      } else {
        index.current++;
      }
    }

    const letters = currentText.slice(0, index.current);

    function type() {
      setText(letters);
    }

    setTimeout(type, speed);
  }, [text]);

  return (
    <Text3d position={position} size={0.25} height={0.05} castShadow={false}>
      {text} <meshPhysicalMaterial color="#fff" />
    </Text3d>
  );
}
