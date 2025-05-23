export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  address: {
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
  };
  features: {
    bedrooms: number;
    bathrooms: number;
    parkingSpaces: number;
    area: number;
    hasPool?: boolean;
    hasGarden?: boolean;
  };
  images: string[];
  status: 'disponível' | 'vendido' | 'reservado';
  type: 'casa' | 'apartamento' | 'comercial';
  createdAt: Date;
  updatedAt: Date;
  realtorId: string;
}

export interface Realtor {
  id: string;
  name: string;
  email: string;
  phone: string;
  creci: string;
  company: string;
} 