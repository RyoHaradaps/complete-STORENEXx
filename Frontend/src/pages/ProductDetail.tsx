
import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { useProductStore } from "@/store/productStore";
import { useCartStore } from "@/store/cartStore";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, Minus, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { ProductGrid } from "@/components/ProductGrid";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import NotFound from "./NotFound";

const ProductDetail = () => {
  const { id } = useParams();
  const { products, getRecommendedProducts } = useProductStore();
  const { addToCart } = useCartStore();
  const [quantity, setQuantity] = useState(1);
  
  const product = products.find(p => p.id === id);
  
  const [recommendations, setRecommendations] = useState([]);
  
  useEffect(() => {
    if (product) {
      setRecommendations(getRecommendedProducts(product));
    }
  }, [product, getRecommendedProducts]);
  
  if (!product) {
    return <NotFound />;
  }
  
  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast({
      title: "Added to cart",
      description: `${quantity} × ${product.name} added to your cart`
    });
  };
  
  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(prev => prev + 1);
    }
  };
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="mb-6">
          <Link to="/products" className="text-muted-foreground hover:text-primary">
            ← Back to Products
          </Link>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-secondary/10 rounded-xl overflow-hidden"
          >
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col"
          >
            <div className="mb-2">
              <Link to={`/products?category=${product.category}`}>
                <Badge variant="outline" className="mb-2">
                  {product.category}
                </Badge>
              </Link>
            </div>
            
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
            
            <div className="flex items-center space-x-1 mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <span 
                  key={i} 
                  className={`w-5 h-5 ${
                    i < Math.floor(product.rating) 
                      ? "text-yellow-400" 
                      : "text-muted"
                  }`}
                >
                  ★
                </span>
              ))}
              <span className="text-sm ml-2">{product.rating.toFixed(1)} rating</span>
            </div>
            
            <div className="text-2xl font-bold mb-4 flex items-baseline">
              ₹{product.price.toLocaleString('en-IN')}
              {product.originalPrice && (
                <span className="text-muted-foreground line-through text-base ml-2">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
              
              {product.originalPrice && (
                <Badge variant="destructive" className="ml-4">
                  {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                </Badge>
              )}
            </div>
            
            <p className="text-muted-foreground mb-8">
              {product.description}
            </p>
            
            <div className="flex items-center mb-6">
              <div className="flex items-center border border-input rounded-md mr-4">
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-10 text-center">{quantity}</span>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={incrementQuantity}
                  disabled={quantity >= product.stock}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="text-sm text-muted-foreground">
                {product.stock} items available
              </div>
            </div>
            
            <Button 
              size="lg" 
              className="mb-6"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
            
            <Separator className="my-6" />
            
            <div>
              <h3 className="font-semibold mb-2">Tags:</h3>
              <div className="flex flex-wrap gap-2">
                {product.tags.map(tag => (
                  <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
        
        <Separator className="my-16" />
        
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">You Might Also Like</h2>
          <ProductGrid products={recommendations} />
        </section>
      </div>
    </Layout>
  );
};

export default ProductDetail;
