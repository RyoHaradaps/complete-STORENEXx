import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div className="relative bg-gray-900 text-white">
      <div
        className="absolute inset-0 opacity-70 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3')",
          backgroundBlendMode: "overlay",
        }}
      ></div>

      <div className="relative container mx-auto px-4 py-24 md:py-36">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
            Discover Top Quality Products
          </h1>
          <p className="text-lg md:text-2xl mb-8 opacity-90">
            Shop the latest trends with confidence. Free shipping on orders over ₹500.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              onClick={() => navigate("/products")}
              className="px-8 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
            >
              Shop Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate("/categories")}
              className="bg-transparent text-white border-white hover:bg-white hover:text-gray-900 px-8"
            >
              Browse Categories
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};