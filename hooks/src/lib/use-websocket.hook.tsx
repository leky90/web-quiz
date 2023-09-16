import { useToast, ToastAction } from 'components';
import { User, useAppStore } from 'datas';
import { useEffect } from 'react';
import { WsMessage, sendMessage } from 'utils';

const socket = new WebSocket('wss://socket-quiz.ldktech.com/ws');
// const socket = new WebSocket('localhost:8080');

export function useWebsocket() {
  const { toast } = useToast();
  const [user, users, setUsers] = useAppStore((state) => [
    state.user,
    state.users,
    state.setUsers,
  ]);

  useEffect(() => {
    if (!socket) return;

    // Connection opened
    socket.addEventListener('open', (event) => {
      console.log('open');
    });

    // Listen for messages
    socket.addEventListener('message', (event) => {
      const reader = new FileReader();
      reader.onload = function (event) {
        if (!event.target) return;

        const content = event.target.result as string; // The content of the blob as a string
        const obj: WsMessage = JSON.parse(content); // Convert the string to a JavaScript object

        console.log(obj.action);

        switch (obj.action) {
          case 'sync-users':
            setUsers(obj.data as User[]);
            break;
          case 'new-user':
            users.push(obj.data as User);
            setUsers([...users]);
            break;

          default:
            break;
        }
      };
      reader.readAsText(event.data);
    });

    socket.addEventListener('error', (event) => {
      console.log('error', event);
      // toast({
      //   variant: 'destructive',
      //   title: 'Has error from server.',
      //   action: (
      //     <ToastAction
      //       altText="Try again"
      //       onClick={() => window.location.reload()}
      //     >
      //       Try again
      //     </ToastAction>
      //   ),
      // });
    });

    socket.addEventListener('close', (event) => {
      // toast({
      //   variant: 'destructive',
      //   title: 'Disconnected from server.',
      //   action: (
      //     <ToastAction
      //       altText="Try again"
      //       onClick={() => window.location.reload()}
      //     >
      //       Try again
      //     </ToastAction>
      //   ),
      // });
    });
  }, []);

  useEffect(() => {
    if (!user) return;

    sendMessage(socket, 'update-user-position', user);
  }, [user]);

  useEffect(() => {
    if (!user) return;

    sendMessage(socket, 'new-user', user);
  }, [user?.id]);

  useEffect(() => {
    if (!user) return;

    sendMessage(socket, 'chat', user);
  }, [user?.chat]);
}
