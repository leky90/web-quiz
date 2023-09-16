import { GizmoHelper, GizmoViewport } from '@react-three/drei';
import { Perf } from 'r3f-perf';

type DevToolsProps = {
  performance?: boolean;
  viewport?: boolean;
};

export function DevTools({
  performance = true,
  viewport = true,
}: DevToolsProps) {
  return (
    <>
      {viewport && (
        <GizmoHelper alignment="bottom-right" margin={[100, 100]}>
          <GizmoViewport labelColor="white" axisHeadScale={1} />
        </GizmoHelper>
      )}
      {performance && <Perf />}
    </>
  );
}
