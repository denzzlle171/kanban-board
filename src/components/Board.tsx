import { Grid, Box, Text, Stack } from '@chakra-ui/react';
import { MyCard } from './Card';
import { Issue } from '../types/Issues';
import { Boards } from '../types/Board';
import { useStoreIssues } from '../store/issues-store';
import { useStoreBoards } from '../store/board-store';
import {PaginationBar} from '../components/PaginationBar'



export const Board = () => {

  const { cardLists, setCardLists } = useStoreIssues((state) => ({
    cardLists: state.cardLists,
    setCardLists: state.setCardLists,
  }));


  const { currentBoard, curentCard } = useStoreBoards();
 
  function dragOverHandler(e: React.DragEvent) {
    e.preventDefault();
  }

  function dropCardHandler(e: React.DragEvent, board: Boards) {
    e.preventDefault();

    const droppedOverBoard = e.target as HTMLElement;
    if (droppedOverBoard.classList.contains('chakra-stack') && curentCard) {
      board.items.push(curentCard);

      const currentIndex: number =
        currentBoard?.items.findIndex((item) => item.id === curentCard?.id) ??
        -1;

      if (currentIndex !== -1) {
        currentBoard?.items.splice(currentIndex, 1);
      }
    } else {
      return;
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
  }

 
  return (
    <Box paddingX="20px">
      <PaginationBar />
      <Grid templateColumns="repeat(3, 1fr)" gap={4} height="70vh">
        {cardLists.map((board) => {
          return (
            <Box
              key={board.id}
              onDragOver={(e) => dragOverHandler(e)}
              onDrop={(e) => dropCardHandler(e, board)}
            >
              <Text fontWeight="bold" textAlign="center">
                {board.title}
              </Text>
              <Stack
                p={4}
                bg="gray.100"
                height="100%"
                borderRadius={10}
                fontSize={10}
              >
                {board.items.map((issue: Issue) => (
                  <MyCard key={issue.id} issue={issue} board={board} />
                ))}
              </Stack>
            </Box>
          );
        })}
      </Grid>
    </Box>
  );
};
