import { Box, Image, Text } from '@chakra-ui/react';

export const BanerImage = () => {
  return (
    <Box
      p="20px"
      display="flex"
      alignItems="center"
      flexDirection="column"
      justifyContent="space-between"
      borderRadius={6}
    >
      <Image borderRadius={6} height={500} src="../img/greet.jpeg" alt="ufo" />
      <Text color="teal" textAlign="center" m="20px" fontSize={22}>
        Welcome to the task board! This tool helps you manage tasks from
        different repositories. To start, just type the repository name in the
        search bar at the top.
      </Text>
    </Box>
  );
};
