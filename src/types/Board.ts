import { Issue } from '../types/Issues';

export interface Boards {
  id: number;
  title: string;
  state: 'open' | 'in_progress' | 'closed';
  items: Issue[];
}
