export const categories = [
  {
    id: 'mobiles',
    name: 'Mobiles',
    image: '/assests/Mobiles',
    subcategories: ['NewMobile']
  },
  {
    id: 'computers',
    name: 'Computers & Laptops',
    image: '/assests/Computers'
  },
  {
    id: 'tv',
    name: 'TVs & Entertainment',
    image: '/assests/TV'
  },
  {
    id: 'audio',
    name: 'Audio',
    image: '/assests/speakers',
    subcategories: ['headphones', 'speakers', 'earphones']
  },
  {
    id: 'fashion',
    name: 'Fashion',
    image: '/assests/MenWear',
    subcategories: ['MenWear', 'Woman']
  },
  {
    id: 'home',
    name: 'Home & Kitchen',
    image: '/assests/Kitchen',
    subcategories: ['Kitchen', 'Furniture', 'Ac', 'fridge']
  },
  {
    id: 'watches',
    name: 'Watches',
    image: '/assests/Watch'
  },
  {
    id: 'books',
    name: 'Books',
    image: '/assests/Books'
  }
];

// Helper function to generate product data from assets
const generateProducts = (category, subcategory = null) => {
  const basePath = `/assests/${subcategory || category}`;
  const products = [];
  
  // Generate multiple products per category (up to 12)
  for (let i = 1; i <= 12; i++) {
    // Create a product object for each index
    // Only add if we assume the file exists
    products.push({
      id: `${category}-${i}`,
      name: `${category.charAt(0).toUpperCase() + category.slice(1)} Product ${i}`,
      price: 499.99 + (i * 100), // Different price for variety
      originalPrice: i % 2 === 0 ? 599.99 + (i * 100) : null, // Some products on sale
      rating: 3 + (i % 3), // Ratings from 3-5
      reviewCount: 50 + (i * 10), // Different review counts
      image: `${basePath}/${i}.jpg`, // Use numbered images
      brand: i % 3 === 0 ? 'Premium Brand' : i % 2 === 0 ? 'Standard Brand' : 'Budget Brand', // Mix of brands
      category,
      subcategory,
      description: `High-quality ${category} product with amazing features and premium design. Perfect for everyday use.`,
      features: [
        'Premium quality materials',
        'Advanced technology',
        'Durable design',
        'Warranty included',
        i % 2 === 0 ? 'Water resistant' : 'Lightweight construction'
      ],
      stock: 5 + (i * 3)
    });
  }
  
  return products;
};

export const getProductsByCategory = (category, subcategory = null) => {
  const categoryData = categories.find(cat => cat.id === category);
  if (!categoryData) return [];

  if (subcategory) {
    return generateProducts(category, subcategory);
  }

  if (categoryData.subcategories) {
    return categoryData.subcategories.flatMap(sub => generateProducts(category, sub));
  }

  return generateProducts(category);
};

export const getAllProducts = () => {
  return categories.flatMap(category => 
    category.subcategories 
      ? category.subcategories.flatMap(sub => generateProducts(category.id, sub))
      : generateProducts(category.id)
  );
}; 