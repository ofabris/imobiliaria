import { Box, Image, Text, Badge, Flex, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { Property } from '../../types/property';

interface PropertyCardProps {
  property: Property;
}

export const PropertyCard = ({ property }: PropertyCardProps) => {
  const navigate = useNavigate();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const handleClick = () => {
    navigate(`/imoveis/${property.id}`);
  };

  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      cursor="pointer"
      onClick={handleClick}
      _hover={{ transform: 'scale(1.02)', transition: 'transform 0.2s' }}
    >
      <Image
        src={property.images[0] || 'https://via.placeholder.com/300x200'}
        alt={property.title}
        height="200px"
        width="100%"
        objectFit="cover"
      />

      <Box p="4">
        <VStack align="start" spacing={2}>
          <Text fontSize="xl" fontWeight="bold">
            {property.title}
          </Text>
          
          <Text fontSize="2xl" color="green.500" fontWeight="bold">
            {formatPrice(property.price)}
          </Text>

          <Flex gap={2} wrap="wrap">
            <Badge colorScheme="blue">{property.type}</Badge>
            <Badge colorScheme={property.status === 'available' ? 'green' : 'red'}>
              {property.status}
            </Badge>
          </Flex>

          <Flex gap={4} fontSize="sm" color="gray.600">
            <Text>{property.features.bedrooms} quartos</Text>
            <Text>{property.features.bathrooms} banheiros</Text>
            <Text>{property.features.area}m²</Text>
          </Flex>

          <Text fontSize="sm" color="gray.500">
            {property.address.neighborhood}, {property.address.city}
          </Text>
        </VStack>
      </Box>
    </Box>
  );
}; 