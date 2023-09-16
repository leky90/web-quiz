import { FormEvent } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useAppStore } from 'datas';
import { cn } from 'utils';

export function FormChat() {
  const [stage, setUserChat, setIsChatting] = useAppStore((state) => [
    state.stage,
    state.setUserChat,
    state.setIsChatting,
  ]);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.target as HTMLFormElement; // Get the form element
    const chat = form.elements.namedItem('chat') as HTMLInputElement;

    if (!chat) return;

    const chatMessage = chat.value.trim();

    if (chatMessage === '') return;

    setUserChat(chatMessage);

    setTimeout(() => {
      setUserChat('');
    }, 5000);

    chat.value = '';
  }

  if (stage !== 'intro') return <></>;

  return (
    <form
      className={cn(
        'fixed',
        'max-w-xs',
        'w-full',
        'bg-secondary/70',
        'p-3',
        'flex',
        'items-center',
        'gap-3',
        'rounded-lg',
        'bottom-6',
        'left-1/2',
        '-translate-x-1/2',
        'z-20'
      )}
      onSubmit={onSubmit}
    >
      <Input
        placeholder="Chat something"
        name="chat"
        autoComplete="off"
        onFocus={() => setIsChatting(true)}
        onBlur={() => setIsChatting(false)}
      />
      <Button>Chat</Button>
    </form>
  );
}
