import { Boards } from '../types/Board';
import { Issue } from '../types/Issues';

export const boards: Boards[] = [
  { id: 1, title: 'To Do', state: 'open', items: [] },
  { id: 2, title: 'In Progress', state: 'in_progress', items: [] },
  { id: 3, title: 'Done', state: 'closed', items: [] },
];


export function restructuringData(issues: Issue[]) {
  const coppyBoards = boards.slice();

  const bordToDo = new Set();
  const bordInProgress = new Set();
  const bordDone = new Set();

  issues.forEach((issue) => {
    if (issue.state === 'open') {
      if (issue.assignee) {
        bordInProgress.add(issue); // В процессе
      } else {
        bordToDo.add(issue); // На выполнении
      }
    } else if (issue.state === 'closed') {
      bordDone.add(issue); // Завершено
    }
  });

  coppyBoards[0].items = [...bordToDo] as Issue[];
  coppyBoards[1].items = [...bordInProgress] as Issue[];
  coppyBoards[2].items = [...bordDone] as Issue[];

  return coppyBoards;
}
