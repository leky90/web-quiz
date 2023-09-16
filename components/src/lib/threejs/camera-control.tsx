'use client';

import { CameraControls } from '@react-three/drei';

export function CameraControl() {
  return (
    <CameraControls
      makeDefault
      minDistance={20}
      maxDistance={20}
      distance={20}
      minAzimuthAngle={0}
      maxAzimuthAngle={0}
      azimuthAngle={0}
      maxPolarAngle={Math.PI - 0.4}
      minPolarAngle={2}
      polarAngle={Math.PI - 0.4}
      minZoom={1}
      maxZoom={1}
      // maxSpeed={10}
      dollySpeed={0.1}
      truckSpeed={0.25}
    />
  );
}
