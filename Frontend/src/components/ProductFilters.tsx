
import { useProductStore } from "@/store/productStore";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

interface ProductFiltersProps {
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

export const ProductFilters = ({ 
  selectedCategory,
  onCategoryChange 
}: ProductFiltersProps) => {
  const { categories } = useProductStore();
  
  const handleReset = () => {
    onCategoryChange(null);
  };
  
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-lg">Filters</h3>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleReset}
            className="text-sm"
          >
            Reset
          </Button>
        </div>
        <Separator />
      </div>
      
      <div>
        <h4 className="font-medium mb-4">Categories</h4>
        <RadioGroup value={selectedCategory ?? ""} onValueChange={(value) => onCategoryChange(value || null)}>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="" id="all-categories" />
              <Label htmlFor="all-categories">All Categories</Label>
            </div>
            
            {categories.map((category) => (
              <div key={category.id} className="flex items-center space-x-2">
                <RadioGroupItem value={category.name} id={`category-${category.id}`} />
                <Label htmlFor={`category-${category.id}`}>{category.name}</Label>
              </div>
            ))}
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};
