export type WsAction =
  | 'new-user'
  | 'new-host'
  | 'chat'
  | 'sync-users'
  | 'update-user-position';
export type WsMessage = { action: WsAction; data: unknown };

export function sendMessage(
  socket: WebSocket,
  action: WsAction,
  data: unknown
) {
  try {
    const message: WsMessage = { action, data };
    const blob = new Blob([JSON.stringify(message)], {
      type: 'application/json',
    });
    socket.send(blob);
  } catch (error) {
    console.log(error);
  }
}
