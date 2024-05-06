import { Text, Card } from '@chakra-ui/react';
import { Issue } from '../types/Issues';
import { timePassed } from '../helpers/date';
import { Boards } from '../types/Board';
import { useStoreBoards } from '../store/board-store';
import { useStoreIssues } from '../store/issues-store';

interface MyCardProps {
  issue: Issue;
  board: Boards;
}

export const MyCard: React.FC<MyCardProps> = ({
  issue,
  board,
}) => {

  const {
    currentBoard,
    setCurrentBoard,
    curentCard,
    setCurentCard,
  } = useStoreBoards();

    const { cardLists, setCardLists } = useStoreIssues((state) => ({
      cardLists: state.cardLists,
      setCardLists: state.setCardLists,
    }));
  
  const time = timePassed(issue.updated_at);
  const timeDisplay = time === 0 ? 'today' : `${time} days ago`;

  function dragOverHandler(e: React.DragEvent<HTMLElement>) {
    e.preventDefault();
    e.currentTarget.style.boxShadow = '0 4px 3px gray';
  }

  function dragLeaveHandler(e: React.DragEvent<HTMLElement>) {
    e.currentTarget.style.boxShadow = 'none';
  }

  function dragEndHandler(e: React.DragEvent<HTMLElement>) {
    e.currentTarget.style.boxShadow = 'none';
  }

  function dragStartHandler(e: React.DragEvent, issue: Issue, board: Boards) {
    setCurrentBoard(board);
    setCurentCard(issue);
  }

  function dropHandler(
    e: React.DragEvent<HTMLElement>,
    issue: Issue,
    board: Boards
  ) {
    e.preventDefault();

    const currentIndex: number =
      currentBoard?.items.findIndex((item) => item.id === curentCard?.id) ?? -1;

    if (currentIndex !== -1) {
      currentBoard?.items.splice(currentIndex, 1);
    } else {
      return;
    }

    const dropIndex = board?.items.findIndex((item) => item.id === issue?.id);

    if (curentCard !== null) {
      board?.items.splice(dropIndex + 1, 0, curentCard);
    }

    setCardLists(
      cardLists.map((b) => {
        if (b && currentBoard && b.id === board.id) {
          return board;
        }
        if (b && currentBoard?.id === b.id) {
          return currentBoard || ([] as unknown as Boards);
        }
        return b;
      })
    );

    e.currentTarget.style.boxShadow = 'none';
  }

  return (
    <Card
      p={2}
      draggable="true"
      onDragStart={(e) => dragStartHandler(e, issue, board)}
      onDragLeave={(e) => dragLeaveHandler(e)}
      onDragEnd={(e) => dragEndHandler(e)}
      onDragOver={(e) => dragOverHandler(e)}
      onDrop={(e) => dropHandler(e, issue, board)}
      className="card"
    >
      <div>
        <Text fontWeight="bold">{issue.title}</Text>
        <Text>{`#${issue.number} ` + `opened ${timeDisplay}`}</Text>
        <Text>{`Admin | Coments: ${issue.comments} `}</Text>
      </div>
    </Card>
  );
};
