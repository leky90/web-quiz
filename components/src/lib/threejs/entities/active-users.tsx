import { useAppStore } from 'datas';
import { SphereUser } from '../object/sphere-user';
import { motion } from 'framer-motion-3d';

export function ActiveUsers() {
  const [users] = useAppStore((state) => [state.users]);

  return (
    <>
      {users.map((user) => {
        const currentPosition = (user ? user.position : [0, 0, 0]) as [
          x: number,
          y: number,
          z: number
        ];

        console.log(user.id, 'currentPosition', currentPosition);

        return (
          <motion.group
            initial={{ x: 0, z: 0, y: 0 }}
            animate={{
              x: currentPosition[0],
              y: currentPosition[1],
              z: currentPosition[2],
              transition: {
                duration: 0.25,
              },
            }}
          >
            <group position-z={0.5}>
              <SphereUser
                name={user.name}
                color={user.color}
                chat={user.chat}
                rotation={[Math.PI / 2, 0, 0]}
                scale={0.4}
              />
            </group>
          </motion.group>
        );
      })}
    </>
  );
}
