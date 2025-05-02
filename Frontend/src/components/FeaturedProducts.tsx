
import { useProductStore } from "@/store/productStore";
import { ProductCard } from "./ProductCard";

export const FeaturedProducts = () => {
  const { products } = useProductStore();
  
  // Get 4 featured products
  const featuredProducts = products
    .filter(product => product.featured)
    .slice(0, 4);
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {featuredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
