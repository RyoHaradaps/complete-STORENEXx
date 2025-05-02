
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { Product } from "@/types/product";
import { toast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCartStore();
  
  const handleAddToCart = () => {
    addToCart(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`
    });
  };
  
  return (
    <Card className="overflow-hidden group h-full flex flex-col hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
      <Link to={`/products/${product.id}`} className="overflow-hidden">
        <div className="relative h-64 overflow-hidden bg-secondary/20">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute top-2 right-2 flex flex-col gap-1">
            {product.sale && (
              <Badge variant="destructive" className="px-2 py-1">
                SALE
              </Badge>
            )}
            {product.featured && (
              <Badge variant="secondary" className="px-2 py-1">
                FEATURED
              </Badge>
            )}
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex items-center space-x-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <span 
                  key={i} 
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating) 
                      ? "text-yellow-400" 
                      : "text-muted"
                  }`}
                >
                  ★
                </span>
              ))}
              <span className="text-sm ml-2">{product.rating.toFixed(1)}</span>
            </div>
          </div>
        </div>
      </Link>

      <CardContent className="p-6 flex-grow">
        <div className="text-sm font-medium text-muted-foreground mb-1">
          {product.category}
        </div>
        
        <Link to={`/products/${product.id}`} className="block">
          <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mt-2">
          <div className="font-bold text-xl">
            ₹{product.price.toLocaleString('en-IN')}
            {product.originalPrice && (
              <span className="text-muted-foreground line-through text-sm ml-2">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>
          {product.stock < 10 && (
            <span className="text-xs text-amber-500 font-medium">
              {product.stock > 0 ? `Only ${product.stock} left` : 'Out of stock'}
            </span>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="p-6 pt-0 mt-auto">
        <Button 
          className="w-full group"
          variant={product.stock === 0 ? "outline" : "default"}
          disabled={product.stock === 0}
          onClick={handleAddToCart}
        >
          <ShoppingCart className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
          {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
        </Button>
      </CardFooter>
    </Card>
  );
};
