
import { Card, CardContent } from "@/components/ui/card";
import { Category } from "@/types/category";

interface CategoryCardProps {
  category: Category;
  onClick: () => void;
}

export const CategoryCard = ({ category, onClick }: CategoryCardProps) => {
  return (
    <Card 
      className="overflow-hidden group cursor-pointer hover:shadow-lg transition-all"
      onClick={onClick}
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
        <p className="mt-2">{category.description}</p>
      </CardContent>
    </Card>
  );
};
