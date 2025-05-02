import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { ProductGrid } from "@/components/ProductGrid";
import { ProductFilters } from "@/components/ProductFilters";
import { useProductStore } from "@/store/productStore";
import * as Slider from "@radix-ui/react-slider"; // For price slider

// Utility function to format prices in rupees
const formatPrice = (price: number): string => {
  return `₹${price.toLocaleString("en-IN")}`;
};

const Products = () => {
  const { products } = useProductStore();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Dynamic price range
  const minPrice = Math.min(...products.map((p) => p.price));
  const maxPrice = Math.max(...products.map((p) => p.price));

  const [priceRange, setPriceRange] = useState<[number, number]>([minPrice, maxPrice]);
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    let tempProducts = products;

    if (selectedCategory) {
      tempProducts = tempProducts.filter((product) => product.category === selectedCategory);
    }

    tempProducts = tempProducts.filter(
      (product) => product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    setFilteredProducts(tempProducts);
  }, [products, selectedCategory, priceRange]);

  const handlePriceChange = (value: number[]) => {
    setPriceRange([value[0], value[1]]);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">All Products</h1>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-1/4 space-y-8">
            {/* Category Filter */}
            <ProductFilters
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />

            {/* Price Range Filter */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Filter by Price</h2>
              <div className="flex flex-col space-y-4">
                <div className="flex justify-between text-sm">
                  <span>{formatPrice(priceRange[0])}</span>
                  <span>{formatPrice(priceRange[1])}</span>
                </div>

                <Slider.Root
                  className="relative flex items-center select-none touch-none w-full h-5"
                  value={priceRange}
                  onValueChange={handlePriceChange}
                  min={minPrice}
                  max={maxPrice}
                  step={10}
                >
                  <Slider.Track className="bg-gray-300 relative grow rounded-full h-[3px]">
                    <Slider.Range className="absolute bg-blue-500 rounded-full h-full" />
                  </Slider.Track>
                  <Slider.Thumb className="block w-5 h-5 bg-blue-600 rounded-full focus:outline-none" />
                  <Slider.Thumb className="block w-5 h-5 bg-blue-600 rounded-full focus:outline-none" />
                </Slider.Root>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="w-full md:w-3/4">
            <ProductGrid products={filteredProducts} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;