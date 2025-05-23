import { Container, Grid, Heading, Input, Select, Stack } from '@chakra-ui/react';
import { PropertyCard } from '../../components/PropertyCard';
import { useState } from 'react';
import type { Property } from '../../types/property';

// Importe todas as imagens da pasta mock-images
const mockImages = import.meta.glob('../../assets/mock-images/*.jpg', { eager: true, query: '?url', import: 'default' });

// Mapeia os caminhos das imagens para URLs
const imageUrls: Record<string, string> = Object.fromEntries(
  Object.entries(mockImages).map(([path, module]) => [
    path.replace('../../assets/mock-images/', '').replace('.jpg', ''),
    module as string, // A tipagem como 'url' garante que o module é a string da URL
  ])
);

// Dados mockados para exemplo
const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Casa Moderna em Condomínio',
    description: 'Linda casa moderna em condomínio fechado, com acabamento de alto padrão e área de lazer completa. Localizada em um dos bairros mais nobres da cidade, esta propriedade oferece conforto e segurança para toda a família.',
    price: 850000,
    address: {
      street: 'Rua das Flores',
      number: '123',
      neighborhood: 'Jardim América',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01234-567'
    },
    features: {
      bedrooms: 4,
      bathrooms: 3,
      parkingSpaces: 2,
      area: 250,
      hasPool: true,
      hasGarden: true
    },
    // Use as URLs das imagens importadas pelo nome do arquivo
    images: [imageUrls['casamoderna']], // Exemplo usando a mesma imagem duas vezes
    status: 'disponível',
    type: 'casa',
    createdAt: new Date(),
    updatedAt: new Date(),
    realtorId: '1'
  },
  {
    id: '2',
    title: 'Apartamento com Vista para o Mar',
    description: 'Apartamento moderno com vista panorâmica',
    price: 1200000,
    address: {
      street: 'Avenida Beira Mar',
      number: '456',
      neighborhood: 'Centro',
      city: 'Santos',
      state: 'SP',
      zipCode: '11000-000'
    },
    features: {
      bedrooms: 3,
      bathrooms: 2,
      parkingSpaces: 1,
      area: 180,
      hasPool: true,
      hasGarden: false
    },
    images: [imageUrls['apartamentomar']], // Exemplo usando a imagem casamoderna
    status: 'disponível',
    type: 'apartamento',
    createdAt: new Date(),
    updatedAt: new Date(),
    realtorId: '1'
  }
];

export const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [propertyType, setPropertyType] = useState<string>('all');

  const filteredProperties = mockProperties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.address.neighborhood.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = propertyType === 'all' || property.type === propertyType;
    return matchesSearch && matchesType;
  });

  return (
    <Container maxW="container.xl" py={8}>
      <Stack gap={8}>
        <Heading as="h1" size="xl" textAlign="center">
          Imóveis Disponíveis
        </Heading>

        <Stack direction={{ base: 'column', md: 'row' }} gap={4}>
          <Input
            placeholder="Buscar por título ou bairro..."
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
          />
          <Select
            value={propertyType}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setPropertyType(e.target.value)}
            maxW="200px"
          >
            <option value="all">Todos os tipos</option>
            <option value="casa">Casa</option>
            <option value="apartamento">Apartamento</option>
            <option value="comercial">Comercial</option>
          </Select>
        </Stack>

        <Grid
          templateColumns={{
            base: '1fr',
            md: 'repeat(2, 1fr)',
            lg: 'repeat(3, 1fr)'
          }}
          gap={6}
        >
          {filteredProperties.map(property => (
            <PropertyCard
              key={property.id}
              property={property}
            />
          ))}
        </Grid>
      </Stack>
    </Container>
  );
}; 