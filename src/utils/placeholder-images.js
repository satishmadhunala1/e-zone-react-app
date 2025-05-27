// Generate placeholder image URLs for development
const categories = {
  NewMobile: 'electronics',
  Computers: 'computer',
  TV: 'tv',
  speakers: 'audio',
  MenWear: 'fashion',
  Kitchen: 'home',
  Watch: 'watch',
  Books: 'book',
  Carosal: 'tech'
};

// Generate placeholder URLs for each category
export const getPlaceholderImage = (category, index) => {
  const seed = `${categories[category] || 'product'}-${index}`;
  // Using Lorem Picsum which is more reliable than Unsplash
  return `https://picsum.photos/seed/${seed}/400/400`;
};

// Generate carousel placeholder URLs
export const getCarouselImage = (index) => {
  // Using Lorem Picsum for carousel images too
  return `https://picsum.photos/seed/carousel-${index}/1600/900`;
}; 