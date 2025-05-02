
import { Layout } from "@/components/Layout";
import { useProductStore } from "@/store/productStore";
import { ProductCard } from "@/components/ProductCard";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";

const Categories = () => {
  const { categories, getProductsByCategory } = useProductStore();
  
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">Shop by Category</h1>
        
        <div className="space-y-16">
          {categories.map((category, index) => {
            const categoryProducts = getProductsByCategory(category.name);
            
            return (
              <motion.section 
                key={category.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                transition={{ staggerChildren: 0.1 }}
                className="category-section"
              >
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-6">
                    <div className="h-16 w-16 rounded-full overflow-hidden bg-primary/10">
                      <img 
                        src={category.image} 
                        alt={category.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold">{category.name}</h2>
                      <p className="text-muted-foreground">{category.description}</p>
                    </div>
                  </div>
                </div>
                
                <Separator className="mb-8" />
                
                {categoryProducts.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">
                    No products available in this category.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categoryProducts.map((product) => (
                      <motion.div
                        key={product.id}
                        variants={fadeInUp}
                        transition={{ duration: 0.3 }}
                      >
                        <ProductCard product={product} />
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.section>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
