import { create } from 'zustand';
import { Issue } from '../types/Issues';
import { Boards} from '../types/Board'

interface MyBordsStore {
  currentBoard: Boards | null;
  setCurrentBoard: (board: Boards | null) => void;
  curentCard: Issue | null;
  setCurentCard: (issue: Issue | null) => void;
}



export const useStoreBoards = create<MyBordsStore>((set) => ({
  currentBoard: null,
  setCurrentBoard: (board) => set({ currentBoard: board }),
  curentCard: null,
  setCurentCard: (issue) => set({ curentCard: issue }),
}));

