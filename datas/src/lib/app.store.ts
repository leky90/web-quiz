import { Vector3 } from '@react-three/fiber';
import { immer } from 'zustand/middleware/immer';
import { StateCreator, create } from 'zustand';
import { PersistOptions, devtools } from 'zustand/middleware';
import { BASE_QUIZ, MOVE_SPEED } from './app.constant';

export enum Controls {
  forward = 'forward',
  back = 'back',
  left = 'left',
  right = 'right',
  jump = 'jump',
}

export type User = {
  id: string;
  name: string;
  color: string;
  position: Vector3;
  chat?: string;
};

export type QuizSetup = {
  // total: number;
  totalJs: number;
  totalCss: number;
  totalHtml: number;
};

export type Quiz = {
  question: string;
  choices: [string, string, string, string];
  level:
    | 'Beginner'
    | 'Elementary'
    | 'Intermediate'
    | 'Above Intermediate'
    | 'Advanced'
    | 'Proficient';
  type: string;
};

export type Answer = {
  correct: number[];
  explanation: string;
};

export type Stage = 'enter' | 'intro' | 'host' | 'quiz';

export type QuizResult = {
  quizId: string;
  quizzes: Quiz[];
  answers: (Answer & { choices: number[] })[];
  score: number;
};

type AppStoreState = {
  user: User | null;
  users: User[];
  quizSetup: QuizSetup;
  stage: Stage;
  tabActive?: boolean;
  browserActive?: boolean;
  isChatting?: boolean;
  quizResult?: QuizResult;
};

type AppStoreActions = {
  setUser: (user: User | null) => void;
  setUsers: (users: User[]) => void;
  setUserPosition: (name: Controls) => void;
  setUserChat: (message: string) => void;
  setQuizSetup: (quizSetup: QuizSetup) => void;
  setStage: (stage: Stage) => void;
  setTabActive: (active: boolean) => void;
  setBrowserActive: (active: boolean) => void;
  setIsChatting: (isChatting: boolean) => void;
  setQuizResult: (quizResult?: QuizResult) => void;
};

const appStorePersistOptions: PersistOptions<
  AppStoreState & AppStoreActions,
  AppStoreState
> = {
  name: 'app',
};

const appStoreMiddlewares = (
  stateCreator: StateCreator<AppStoreState & AppStoreActions>
) => immer(devtools(stateCreator));

const appInitialState: AppStoreState = {
  user: null,
  users: [],
  quizSetup: { totalHtml: BASE_QUIZ, totalCss: BASE_QUIZ, totalJs: BASE_QUIZ },
  stage: 'enter',
  tabActive: true,
  browserActive: true,
  isChatting: false,
  quizResult: undefined,
};

export const useAppStore = create<AppStoreState & AppStoreActions>()(
  appStoreMiddlewares((set) => ({
    ...appInitialState,
    setQuizResult: (quizResult) =>
      set((state) => {
        state.quizResult = quizResult;

        return state;
      }),
    setStage: (stage) =>
      set((state) => {
        state.stage = stage;

        return state;
      }),
    setUser: (user) =>
      set((state) => {
        state.user = user;

        return state;
      }),
    setUsers: (users) =>
      set((state) => {
        state.users = users.filter(
          (user) => state.user && user.id !== state.user.id
        );

        return state;
      }),
    setUserChat: (message) =>
      set((state) => {
        if (!state.user) return state;

        state.user.chat = message;

        return state;
      }),
    setUserPosition: (name) =>
      set((state) => {
        if (!state.user) return state;

        const currentPosition = state.user.position as [
          x: number,
          y: number,
          z: number
        ];

        currentPosition[1];

        switch (name) {
          case Controls.forward: {
            currentPosition[1] += MOVE_SPEED;
            break;
          }

          case Controls.back: {
            currentPosition[1] -= MOVE_SPEED;
            break;
          }

          case Controls.left: {
            currentPosition[0] -= MOVE_SPEED;
            break;
          }

          case Controls.right: {
            currentPosition[0] += MOVE_SPEED;
            break;
          }

          case Controls.jump: {
            currentPosition[2] = currentPosition[2] === 0 ? 1 : 0;
            break;
          }
          default:
            break;
        }

        state.user.position = currentPosition;

        return state;
      }),
    setQuizSetup: (quizSetup) =>
      set((state) => {
        state.quizSetup = quizSetup;

        return state;
      }),
    setTabActive: (active) =>
      set((state) => {
        state.tabActive = active;

        return state;
      }),
    setBrowserActive: (active) =>
      set((state) => {
        state.browserActive = active;

        return state;
      }),
    setIsChatting: (isChatting) =>
      set((state) => {
        state.isChatting = isChatting;

        return state;
      }),
  }))
);
