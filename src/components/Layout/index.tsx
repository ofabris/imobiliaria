import { Box, Container, Flex, Heading, Link, Stack } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <Box minH="100vh">
      <Box as="header" bg="white" boxShadow="sm" py={4}>
        <Container maxW="container.xl">
          <Flex justify="space-between" align="center">
            <Heading as="h1" size="lg" color="brand.600">
              <Link as={RouterLink} to="/" _hover={{ textDecoration: 'none' }}>
                Imobiliária App
              </Link>
            </Heading>
            <Stack direction="row" spacing={4}>
              <Link as={RouterLink} to="/" color="gray.600" _hover={{ color: 'brand.500' }}>
                Início
              </Link>
              <Link as={RouterLink} to="/imoveis" color="gray.600" _hover={{ color: 'brand.500' }}>
                Imóveis
              </Link>
              <Link as={RouterLink} to="/corretores" color="gray.600" _hover={{ color: 'brand.500' }}>
                Corretores
              </Link>
            </Stack>
          </Flex>
        </Container>
      </Box>

      <Box as="main" py={8}>
        {children}
      </Box>

      <Box as="footer" bg="gray.50" py={6}>
        <Container maxW="container.xl">
          <Flex justify="center" color="gray.500">
            © {new Date().getFullYear()} Imobiliária App. Todos os direitos reservados.
          </Flex>
        </Container>
      </Box>
    </Box>
  );
}; 