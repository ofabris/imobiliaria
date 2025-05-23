import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Heading,
  Text,
  Grid,
  Image,
  Badge,
  Flex,
  Button,
  VStack,
  HStack,
  Divider,
  Icon,
} from '@chakra-ui/react';
import { FaBed, FaBath, FaCar, FaRuler, FaSwimmingPool, FaTree, FaArrowLeft } from 'react-icons/fa';
import { useState, useEffect } from 'react';
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

// Dados mockados (em um projeto real, isso viria de uma API)
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
    images: [imageUrls['casamoderna'], imageUrls['casamoderna1'], imageUrls['casamoderna2'], imageUrls['casamoderna3']],
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
    images: [imageUrls['apartamentomar'], imageUrls['apartamentomar1'], imageUrls['apartamentomar2'], imageUrls['apartamentomar3']],
    status: 'disponível',
    type: 'apartamento',
    createdAt: new Date(),
    updatedAt: new Date(),
    realtorId: '1'
  }
];

export const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState<Property | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    // Simulando busca do imóvel (em um projeto real, isso seria uma chamada à API)
    const foundProperty = mockProperties.find(p => p.id === id);
    if (foundProperty) {
      setProperty(foundProperty);
    }
  }, [id]);

  if (!property) {
    return (
      <Container maxW="container.xl" py={8}>
        <Text>Imóvel não encontrado</Text>
      </Container>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === property.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };

  return (
    <Container maxW="container.xl" py={8}>
      <Button
        leftIcon={<Icon as={FaArrowLeft} />}
        variant="ghost"
        mb={6}
        onClick={() => navigate(-1)}
      >
        Voltar
      </Button>

      <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={8}>
        {/* Galeria de Imagens */}
        <Box>
          <Box position="relative" borderRadius="lg" overflow="hidden">
            <Image
              src={property.images[currentImageIndex]}
              alt={property.title}
              w="100%"
              h="500px"
              objectFit="cover"
            />
            <Flex
              position="absolute"
              top="50%"
              left="0"
              right="0"
              justify="space-between"
              px={4}
              transform="translateY(-50%)"
            >
              <Button
                onClick={prevImage}
                colorScheme="whiteAlpha"
                borderRadius="full"
              >
                &lt;
              </Button>
              <Button
                onClick={nextImage}
                colorScheme="whiteAlpha"
                borderRadius="full"
              >
                &gt;
              </Button>
            </Flex>
          </Box>
          <HStack mt={4} spacing={2} overflowX="auto" py={2}>
            {property.images.map((image, index) => (
              <Box
                key={index}
                w="100px"
                h="100px"
                cursor="pointer"
                onClick={() => setCurrentImageIndex(index)}
                border={currentImageIndex === index ? '2px solid' : 'none'}
                borderColor="brand.500"
                borderRadius="md"
                overflow="hidden"
              >
                <Image
                  src={image}
                  alt={`${property.title} - ${index + 1}`}
                  w="100%"
                  h="100%"
                  objectFit="cover"
                />
              </Box>
            ))}
          </HStack>
        </Box>

        {/* Informações do Imóvel */}
        <VStack align="stretch" spacing={6}>
          <Box>
            <Heading size="xl">{property.title}</Heading>
            <Text fontSize="2xl" color="green.500" fontWeight="bold" mt={2}>
              {formatPrice(property.price)}
            </Text>
          </Box>

          <Flex gap={2}>
            <Badge colorScheme="blue" fontSize="md" px={3} py={1}>
              {property.type}
            </Badge>
            <Badge
              colorScheme={property.status === 'disponível' ? 'green' : 'red'}
              fontSize="md"
              px={3}
              py={1}
            >
              {property.status}
            </Badge>
          </Flex>

          <Divider />

          <VStack align="stretch" spacing={4}>
            <Heading size="md">Características</Heading>
            <Grid templateColumns="repeat(2, 1fr)" gap={4}>
              <HStack>
                <Icon as={FaBed} />
                <Text>{property.features.bedrooms} quartos</Text>
              </HStack>
              <HStack>
                <Icon as={FaBath} />
                <Text>{property.features.bathrooms} banheiros</Text>
              </HStack>
              <HStack>
                <Icon as={FaCar} />
                <Text>{property.features.parkingSpaces} vagas</Text>
              </HStack>
              <HStack>
                <Icon as={FaRuler} />
                <Text>{property.features.area}m²</Text>
              </HStack>
              {property.features.hasPool && (
                <HStack>
                  <Icon as={FaSwimmingPool} />
                  <Text>Piscina</Text>
                </HStack>
              )}
              {property.features.hasGarden && (
                <HStack>
                  <Icon as={FaTree} />
                  <Text>Jardim</Text>
                </HStack>
              )}
            </Grid>
          </VStack>

          <Divider />

          <VStack align="stretch" spacing={4}>
            <Heading size="md">Localização</Heading>
            <Text>
              {property.address.street}, {property.address.number}
            </Text>
            <Text>
              {property.address.neighborhood}, {property.address.city} - {property.address.state}
            </Text>
            <Text>CEP: {property.address.zipCode}</Text>
          </VStack>

          <Divider />

          <VStack align="stretch" spacing={4}>
            <Heading size="md">Descrição</Heading>
            <Text>{property.description}</Text>
          </VStack>

          <Button colorScheme="brand" size="lg">
            Entrar em Contato
          </Button>
        </VStack>
      </Grid>
    </Container>
  );
}; 