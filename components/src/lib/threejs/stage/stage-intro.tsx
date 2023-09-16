import type { GroupProps } from '@react-three/fiber';
import { Text3d } from '../object/text-3d';
import { Text3dBold } from '../object/text-3d-bold';
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion-3d';
import { Gltf, Html, useGLTF } from '@react-three/drei';
import { JsGlb } from '../entities/js-glb';
import { CssGlb } from '../entities/css-glb';
import { HtmlGlb } from '../entities/html-glb';
import { TypingText } from '../entities/typing-text';
import { ButtonCreateHost } from '../entities/button-create-host';
import { ButtonStartQuiz } from '../entities/button-start-quiz';
import { CurrentSphereUser } from '../entities/current-sphere-user';
import { ActiveUsers } from '../entities/active-users';

const srcVNMapGlb = '/models/vietnam-map-full.glb';

export function StageIntro(props: GroupProps) {
  return (
    <group>
      <AnimatePresence>
        {props.visible && (
          <motion.group
            key="stage-intro"
            initial={{ z: -5 }}
            animate={{ z: 0, transition: { duration: 1, delay: 0.5 } }}
            exit={{ z: -5 }}
          >
            <group position={[0, 5, 1.5]} rotation-x={Math.PI / 2.4}>
              <Text3d position={[-2.5, 2.5, 0.15]} size={0.4} height={0.05}>
                Would you like to play a <meshPhysicalMaterial color="#fff" />
              </Text3d>
              <Text3dBold position={[0, 0, 0]}>
                Quiz game? <meshPhysicalMaterial color="#FECE32" />
              </Text3dBold>
              {/* <TypingText position={[-5.5, -1, 0]} /> */}
              <Html position={[-6, -2, 0]} center transform>
                <div className="p-4 bg-secondary/70 space-y-4 w-96">
                  Chọn số lượng câu hỏi rồi bấm nút `Start Quiz` <br />
                  <small>
                    <em>
                      (Nhấp chuột trái/phải lên các icon để tăng/giảm số lượng.)
                    </em>
                  </small>
                </div>
              </Html>
            </group>
            <group position={[0, -3, 0]}>
              <Gltf
                position={[-1, 0, -0.4]}
                scale={2}
                rotation={[-Math.PI / 2, 0, 0]}
                src={srcVNMapGlb}
              />

              <HtmlGlb />
              <CssGlb />
              <JsGlb />
              {/* <ButtonCreateHost position={[-10, -1, 0]} /> */}
              <ButtonStartQuiz position={[-5, 0, 0]} />
              {/* <ButtonLogout position={[-2, -4, 0]} /> */}
            </group>
            <CurrentSphereUser />
            <ActiveUsers />
          </motion.group>
        )}
      </AnimatePresence>
    </group>
  );
}

StageIntro.displayName = 'StageIntro';

useGLTF.preload(srcVNMapGlb);
