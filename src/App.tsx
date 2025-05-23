import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { PropertyDetails } from './pages/PropertyDetails';
import { Layout } from './components/Layout';
import theme from './theme';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/imoveis/:id" element={<PropertyDetails />} />
          </Routes>
        </Layout>
      </Router>
    </ChakraProvider>
  );
}

export default App;
