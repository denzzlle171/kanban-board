import { Flex, Input, Button, Box, Text, Skeleton } from '@chakra-ui/react';
import { Breadcrumbs } from './Breadcrumbs';
import { StarIcon } from '@chakra-ui/icons';
import { ChangeEvent, useState } from 'react';
import { starsString } from '../helpers/date';
import { useStoreIssues } from '../store/issues-store';

export const Header = () => {
  const { fetchTasks, stars, loading  } = useStoreIssues(
    (state) => ({
      fetchTasks: state.fetchTasks,
      stars: state.stars,
      loading: state.loading,
    })
  );

  const [value, setValue] = useState('https://github.com/facebook/react');
  const [error, setError] = useState<string | null>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    setError(null);
  };
  
  const loadIsuess = () => {
    const regex = /^https:\/\/github\.com\/\w+\/\w+$/;

    if (regex.test(value)) {
      const [owner, repo] = value.split('/').slice(-2);
      setError(null);

      fetchTasks(owner, repo);
    } else {
      const inputError = new Error(
        'wrong URL, try typing like   https://github.com/owner-name/repository-name'
      );
      setError(inputError.message);
    }
  };

  return (
    <Box p="20px" pb='10px'>
      <Flex w="100%" gap="5">
        <Input
          size="sm"
          color="teal"
          borderColor={error ? 'red' : 'teal'}
          placeholder="Enter repo URL "
          _placeholder={{ color: 'inherit' }}
          _hover={{ backgroundColor: 'gray.100' }}
          _focus={{ borderColor: 'transparent', backgroundColor: 'gray.100' }}
          value={value}
          onChange={handleChange}
        />
        <Button
          onClick={loadIsuess}
          colorScheme="teal"
          size="sm"
          borderRadius="2"
          fontSize={10}
        >
          Load Issues
        </Button>
      </Flex>
      {error ? (
        <Text fontSize={10} color="red" px="20px" mb="8px">
          {' '}
          {error}{' '}
        </Text>
      ) : (
        <Flex gap={5} fontSize={10} mt={2}>
          {loading ? (
            // <Text>... loading ...</Text>

            <Skeleton
              startColor="teal"
              endColor="#edf2f7"
              width="100%"
            >
              <div>contents wrapped</div>
            </Skeleton>
          ) : (
            <>
              <Breadcrumbs />
              {stars ? (
                <Text color="teal">
                  {<StarIcon mb="3px" color="gold" />} {starsString(stars)}{' '}
                  stars
                </Text>
              ) : (
                <Text color="teal">
                  This is a Kanban application that will display tasks from
                  entered repositories.
                </Text>
              )}
            </>
          )}
        </Flex>
      )}
    </Box>
  );
};
