// data/medicaments.ts
export interface Product {
  id: number;
  name: string;
  slug: string;
  price: number;
  regularPrice?: number;
  image: string;
  images?: string[];
  category: string;
  description: string;
  shortDescription: string;
  inStock: boolean;
  stockQuantity: number;
  sku: string;
  prescriptionRequired?: boolean;
  activeIngredients?: string[];
  dosage?: string;
  manufacturer?: string;
  rating?: number;
  reviewCount?: number;
}

export const medicines: Product[] = [
  {
    id: 1,
    name: 'Doliprane',
    slug: 'doliprane',
    price: 1050,
    regularPrice: 1250,
    image: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Antibiotiques',
    description: 'Doliprane est utilisé pour traiter diverses affections.',
    shortDescription: 'Doliprane - médicament de qualité',
    inStock: true,
    stockQuantity: 21,
    sku: 'SKU-001',
    prescriptionRequired: false,
    activeIngredients: ['Paracétamol'],
    dosage: '500mg',
    manufacturer: 'NutriHealth',
    rating: 3.6,
    reviewCount: 6,
  },
];

export default medicines;