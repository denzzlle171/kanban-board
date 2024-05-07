import { Header } from './components/Header';
import { Board } from './components/Board';
import { BanerImage } from './components/BanerImage';
import { Box } from '@chakra-ui/react';
import { useStoreIssues } from './store/issues-store';

function App() {
  const { path } = useStoreIssues((state) => ({
    path: state.path,
  }));

  return (
    <Box minWidth="600px" maxWidth="900px" m="auto" height="100vh">
      <Header />
      {path ? <Board /> : <BanerImage />}
    </Box>
  );
}

export default App;
