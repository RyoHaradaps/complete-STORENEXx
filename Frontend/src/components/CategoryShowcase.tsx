
import { useProductStore } from "@/store/productStore";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

export const CategoryShowcase = () => {
  const { categories } = useProductStore();
  const navigate = useNavigate();
  
  // Take only the first 3 categories for showcase
  const showcaseCategories = categories.slice(0, 3);
  
  return (
    <section className="my-16">
      <h2 className="text-3xl font-bold mb-4 text-center">Popular Categories</h2>
      <p className="text-muted-foreground mb-8 text-center max-w-2xl mx-auto">
        Browse our most popular product categories and find exactly what you need
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {showcaseCategories.map((category) => (
          <Card 
            key={category.id}
            className="overflow-hidden group cursor-pointer hover:shadow-lg transition-all"
            onClick={() => navigate(`/products?category=${category.name}`)}
          >
            <div className="relative h-48 overflow-hidden">
              <img 
                src={category.image} 
                alt={category.name}
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
            </div>
            <CardContent className="p-4">
              <h3 className="text-xl font-semibold">{category.name}</h3>
              <p className="text-muted-foreground mt-1">{category.productCount} products</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
