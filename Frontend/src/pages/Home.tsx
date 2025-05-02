
import { Button } from "@/components/ui/button";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { HeroSection } from "@/components/HeroSection";
import { CategoryShowcase } from "@/components/CategoryShowcase";
import { Layout } from "@/components/Layout";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  
  return (
    <Layout>
      <HeroSection />
      <div className="container mx-auto px-4 py-8">
        <CategoryShowcase />
        
        <div className="my-16 text-center">
          <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Discover our handpicked selection of premium products that are trending right now.
          </p>
          <FeaturedProducts />
          <div className="mt-10">
            <Button 
              size="lg" 
              onClick={() => navigate('/products')}
              className="px-8"
            >
              Browse All Products
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
