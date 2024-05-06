export interface Issue {
  title: string;
  number: number;
  updated_at: string;
  comments: number;
  state: 'open' | 'closed';
  assignee: null | string;
  id: number;
}


export type GroupedIssues = {
  open: Issue[];
  in_progress: Issue[];
  closed: Issue[];
};
