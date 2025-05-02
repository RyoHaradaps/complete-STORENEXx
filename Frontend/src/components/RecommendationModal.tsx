import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { useCartStore } from "@/store/cartStore";
import { useProductStore } from "@/store/productStore";
import { ProductCard } from "./ProductCard";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export const RecommendationModal = () => {
  const { latestAddedProduct, clearLatestAddedProduct } = useCartStore();
  const { getRecommendedProducts } = useProductStore();
  const [open, setOpen] = useState(false);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    if (latestAddedProduct) {
      const recommendedProducts = getRecommendedProducts(latestAddedProduct);
      if (recommendedProducts.length > 0) {
        setRecommendations(recommendedProducts);
        setOpen(true);
      }
    }
  }, [latestAddedProduct, getRecommendedProducts]);

  const handleClose = () => {
    setOpen(false);
    setRecommendations([]);
    clearLatestAddedProduct(); // <- RESET the latest product after showing
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">Recommended for you</DialogTitle>
          <DialogDescription className="text-base">
            Based on your selection, you might also like these products:
          </DialogDescription>
        </DialogHeader>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6"
        >
          {recommendations.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </motion.div>

        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={handleClose}>
            Continue Shopping
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
