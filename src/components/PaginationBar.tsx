import { Box, Button, Text } from '@chakra-ui/react';
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';
import { useStoreIssues } from '../store/issues-store';

export const PaginationBar = () => {
  const { SetCurrentPage, currentPage } = useStoreIssues((state) => ({
    SetCurrentPage: state.SetCurrentPage,
    currentPage: state.currentPage,
  }));

  const prev = () => {
    if (currentPage > 1) {
      SetCurrentPage(currentPage - 1)
    }
  };

  
  const next = () => {
    SetCurrentPage(currentPage + 1);
  };

  return (
    <Box
      border="1px solid teal"
      height="24px"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      borderRadius={6}
      mx="10px"
      mb="10px"
    >
      <Button onClick={prev} colorScheme="teal" size="xs">
        <ArrowLeftIcon />
      </Button>
      <Text color="teal">{currentPage}</Text>
      <Button onClick={next} colorScheme="teal" size="xs">
        <ArrowRightIcon />
      </Button>
    </Box>
  );
};
