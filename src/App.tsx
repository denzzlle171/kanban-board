
import { Header } from './components/Header'
import { Board } from './components/Board'
import { Box } from '@chakra-ui/react'


function App() {
  return (
    <Box minWidth="600px" maxWidth="900px" m="auto" height="100vh">
      <Header />
      <Board />
    </Box>
  );
}

export default App;
