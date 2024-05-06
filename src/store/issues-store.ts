import { create } from 'zustand';
import { boards } from '../helpers/boards';
import { Boards } from '../types/Board';
import{restructuringData } from '../helpers/boards'


interface IssuesState {
  cardLists: Boards[];
  setCardLists: (boards: Boards[]) => void;
  stars: number | null;
  path: string | null;
  ownerLink: string;
  repoLink: string;
  loading: boolean;
  currentPage: number;
  SetCurrentPage: (currentPage: number) => void;

  fetchTasks: (owner: string, repo: string) => Promise<void>;
}

export const useStoreIssues = create<IssuesState>()((set, get) => ({
  cardLists: boards,
  setCardLists: (boards) => set({ cardLists: boards }),
  stars: null,
  path: null,
  ownerLink: '',
  repoLink: '',
  loading: false,
  currentPage: 1,
  SetCurrentPage: (currentPage) => set({ currentPage: currentPage }),

  fetchTasks: async (name, repository) => {
    const currentPage = get().currentPage;

    set({ loading: true });
    try {
      const repositoryResponse = await fetch(
        `https://api.github.com/repos/${name}/${repository}`
      );
      const repositoryData = await repositoryResponse.json();

      const starsCount = repositoryData.stargazers_count;
      set({ stars: starsCount });

      const repositoryPath = repositoryData.full_name;
      set({ path: repositoryPath });

      const owner = repositoryData.owner.html_url;
      set({ ownerLink: owner });

      const repo = repositoryData.html_url;
      set({ repoLink: repo });

      const responseIssues = await fetch(
        `https://api.github.com/repos/${name}/${repository}/issues?state=all&per_page=10&page=${currentPage}`
      );

      //
      console.log(responseIssues.headers.get('Link'));
      //

      const data = await responseIssues.json();
      set({ cardLists: restructuringData(data) });
      set({ loading: false });
      // set({ issues: data });
    } catch (error) {
      console.error('Ошибка при получении задач:', error);
      set({ loading: false });
    }
  },
}));
