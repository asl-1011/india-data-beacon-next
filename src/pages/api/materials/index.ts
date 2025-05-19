
import { NextApiRequest, NextApiResponse } from 'next';

// Mock materials database
const materials = [
  {
    id: 1,
    name: 'Paper',
    subtypes: [
      { id: 1, name: 'Newspaper', pricePerKg: 0.5 },
      { id: 2, name: 'Cardboard', pricePerKg: 0.3 }
    ],
    icon: 'file-text'
  },
  {
    id: 2,
    name: 'Metal',
    subtypes: [
      { id: 3, name: 'Iron', pricePerKg: 2.0 },
      { id: 4, name: 'Copper', pricePerKg: 5.0 }
    ],
    icon: 'package'
  },
  {
    id: 3,
    name: 'Plastic',
    subtypes: [
      { id: 5, name: 'Bottles', pricePerKg: 0.8 },
      { id: 6, name: 'Containers', pricePerKg: 0.6 }
    ],
    icon: 'package'
  },
  {
    id: 4,
    name: 'Books',
    subtypes: [
      { id: 7, name: 'Textbooks', pricePerKg: 0.7 },
      { id: 8, name: 'Notebooks', pricePerKg: 0.4 }
    ],
    icon: 'file'
  },
  {
    id: 5,
    name: 'Electronics',
    subtypes: [
      { id: 9, name: 'Phones', pricePerKg: 10.0 },
      { id: 10, name: 'Laptops', pricePerKg: 8.0 }
    ],
    icon: 'settings'
  },
  {
    id: 6,
    name: 'Others',
    subtypes: [
      { id: 11, name: 'Rubber', pricePerKg: 1.0 },
      { id: 12, name: 'Batteries', pricePerKg: 3.0 }
    ],
    icon: 'box'
  }
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  return res.status(200).json(materials);
}
