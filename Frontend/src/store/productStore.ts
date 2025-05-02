
import { create } from 'zustand';
import { Product } from '@/types/product';
import { Category } from '@/types/category';
import Products from '@/pages/Products';

// Mock data for products
const mockProducts: Product[] = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    description: "High-quality wireless headphones with noise cancellation.",
    price: 15999.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800",
    category: "Electronics",
    stock: 25,
    featured: true,
    sale: false,
    rating: 4.8,
    tags: ["headphones", "audio", "wireless"]
  },
  {
    id: "2",
    name: "Ergonomic Office Chair",
    description: "Comfortable office chair with lumbar support.",
    price: 19999.99,
    originalPrice: 24999.99,
    image: "https://m.media-amazon.com/images/I/71m901lXArL.jpg",
    category: "Furniture",
    stock: 15,
    featured: true,
    sale: true,
    rating: 4.5,
    tags: ["chair", "office", "ergonomic"]
  },
  {
    id: "3",
    name: "Designer Leather Backpack",
    description: "Stylish leather backpack for everyday use.",
    price: 9999.99,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800",
    category: "Fashion",
    stock: 30,
    featured: false,
    sale: false,
    rating: 4.2,
    tags: ["backpack", "leather", "accessory"]
  },
  {
    id: "4",
    name: "Smart Fitness Watch",
    description: "Track your fitness goals with this smart watch.",
    price: 11999.99,
    originalPrice: 14599.99,
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800",
    category: "Electronics",
    stock: 20,
    featured: true,
    sale: true,
    rating: 4.6,
    tags: ["watch", "fitness", "smart"]
  },
  {
    id: "5",
    name: "Luxury Scented Candle",
    description: "Premium scented candle for your home.",
    price: 2499.99,
    image: "https://jivisa.in/cdn/shop/files/JiVisa-Luxury-Soy-Wax-Candle-Gift-Box-JiViSa-689.jpg?v=1684806394",
    category: "Home Decor",
    stock: 40,
    featured: false,
    sale: false,
    rating: 4.3,
    tags: ["candle", "home", "scented"]
  },
  {
    id: "6",
    name: "Professional Camera Lens",
    description: "High-resolution camera lens for professional photography.",
    price: 65999.99,
    image: "https://i0.wp.com/digital-photography-school.com/wp-content/uploads/2021/04/must-have-camera-lenses-3.jpg?fit=1500%2C1125&ssl=1",
    category: "Electronics",
    stock: 8,
    featured: true,
    sale: false,
    rating: 4.9,
    tags: ["camera", "photography", "lens"]
  },
  {
    id: "7",
    name: "Cotton Throw Blanket",
    description: "Soft cotton throw blanket for your living room or bedroom.",
    price: 4599.99,
    originalPrice: 5999.99,
    image: "https://media.omaliving.com/media/catalog/product/i/t/item-019925_4_1.png",
    category: "Home Decor",
    stock: 35,
    featured: false,
    sale: true,
    rating: 4.4,
    tags: ["blanket", "home", "cotton"]
  },
  {
    id: "8",
    name: "Minimalist Wall Clock",
    description: "Elegant minimalist wall clock for modern homes.",
    price: 3499.99,
    image: "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=800",
    category: "Home Decor",
    stock: 25,
    featured: false,
    sale: false,
    rating: 4.1,
    tags: ["clock", "home", "wall"]
  },
  {
    id: "9",
    name: "Premium Coffee Maker",
    description: "Brew delicious coffee with this premium coffee maker.",
    price: 8999.99,
    image: "https://m.media-amazon.com/images/I/818gyfjYmZL.jpg",
    category: "Kitchen",
    stock: 18,
    featured: true,
    sale: false,
    rating: 4.7,
    tags: ["coffee", "kitchen", "appliance"]
  },
  // New products added below
  {
    id: "10",
    name: "Modern Desk Lamp",
    description: "Adjustable LED desk lamp with multiple brightness levels.",
    price: 2299.99,
    image: "https://i.etsystatic.com/9813000/r/il/6f1264/1224194488/il_570xN.1224194488_mqsl.jpg",
    category: "Home Decor",
    stock: 30,
    featured: false,
    sale: false,
    rating: 4.3,
    tags: ["lamp", "lighting", "home"]
  },
  {
    id: "11",
    name: "Wooden Dining Table",
    description: "Handcrafted wooden dining table for 6 people.",
    price: 25999.99,
    originalPrice: 32999.99,
    image: "https://images.unsplash.com/photo-1577140917170-285929fb55b7?w=800",
    category: "Furniture",
    stock: 10,
    featured: true,
    sale: true,
    rating: 4.6,
    tags: ["table", "dining", "wooden"]
  },
  {
    id: "12",
    name: "Bluetooth Speaker",
    description: "Portable waterproof Bluetooth speaker with rich bass.",
    price: 5999.99,
    image: "https://images.unsplash.com/photo-1589003077984-894e133dabab?w=800",
    category: "Electronics",
    stock: 45,
    featured: false,
    sale: false,
    rating: 4.4,
    tags: ["speaker", "audio", "bluetooth"]
  },
  {
    id: "13",
    name: "Designer Sunglasses",
    description: "UV-protected stylish sunglasses for all seasons.",
    price: 7499.99,
    originalPrice: 9999.99,
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800",
    category: "Fashion",
    stock: 22,
    featured: true,
    sale: true,
    rating: 4.7,
    tags: ["sunglasses", "fashion", "accessory"]
  },
  {
    id: "14",
    name: "Electric Kettle",
    description: "Fast-heating stainless steel electric kettle.",
    price: 2999.99,
    image: "https://masterindia.in/cdn/shop/files/Kettle-01.webp?v=1736758180",
    category: "Kitchen",
    stock: 28,
    featured: false,
    sale: false,
    rating: 4.2,
    tags: ["kettle", "kitchen", "appliance"]
  },
  {
    id: "15",
    name: "Leather Wallet",
    description: "Genuine leather wallet with multiple card slots.",
    price: 3499.99,
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800",
    category: "Fashion",
    stock: 35,
    featured: false,
    sale: false,
    rating: 4.5,
    tags: ["wallet", "leather", "accessory"]
  }
];

// Mock data for categories
const mockCategories: Category[] = [
  {
    id: "1",
    name: "Electronics",
    description: "Gadgets, devices, and tech accessories",
    image: "https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=800",
    productCount: 4
  },
  {
    id: "2",
    name: "Home Decor",
    description: "Furnish and decorate your living spaces",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800",
    productCount: 4
  },
  {
    id: "3",
    name: "Furniture",
    description: "Quality furniture for every room",
    image: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=800",
    productCount: 2
  },
  {
    id: "4",
    name: "Fashion",
    description: "Clothing, accessories, and more",
    image: "https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=800",
    productCount: 3
  },
  {
    id: "5",
    name: "Kitchen",
    description: "Essential kitchen tools and appliances",
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800",
    productCount: 2
  }
];

interface ProductStore {
  products: Product[];
  categories: Category[];
  getProductsByCategory: (category: string) => Product[];
  getRecommendedProducts: (product: Product) => Product[];
}

export const useProductStore = create<ProductStore>((set, get) => ({
  products: mockProducts,
  categories: mockCategories,
  
  getProductsByCategory: (category: string) => {
    return get().products.filter(product => product.category === category);
  },
  
  getRecommendedProducts: (product: Product) => {
    // Rule 1: Always prioritize products from the same category
    const sameCategory = get().products.filter(p => 
      p.id !== product.id && p.category === product.category
    );
    
    // If we have enough products from the same category, return those
    if (sameCategory.length >= 3) {
      return sameCategory.slice(0, 3);
    }
    
    // Rule 2: If not enough same category products, add products with similar tags
    let recommendations = [...sameCategory];
    if (recommendations.length < 3) {
      const productTags = new Set(product.tags);
      const similarProducts = get().products.filter(p => 
        p.id !== product.id && 
        !recommendations.some(r => r.id === p.id) && 
        p.tags.some(tag => productTags.has(tag))
      );
      recommendations = [...recommendations, ...similarProducts];
    }
    
    // Rule 3: Only if still not enough, add featured products
    if (recommendations.length < 3) {
      const featuredProducts = get().products.filter(p => 
        p.id !== product.id && 
        !recommendations.some(r => r.id === p.id) && 
        p.featured
      );
      recommendations = [...recommendations, ...featuredProducts];
    }
    
    return recommendations.slice(0, 3); // Return at most 3 recommendations
  }
}));
