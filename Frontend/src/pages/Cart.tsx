import { Layout } from "@/components/Layout";
import { useCartStore } from "@/store/cartStore";
import { Button } from "@/components/ui/button";
import { Minus, Plus, ShoppingCart, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const Cart = () => {
  const { cart, removeFromCart, updateCartItem, clearCart, getCartTotal } = useCartStore();
  const navigate = useNavigate();

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateCartItem(productId, newQuantity);
  };

  const handleRemoveItem = (productId: string) => {
    removeFromCart(productId);
    toast({
      title: "Item removed",
      description: "The item has been removed from your cart.",
    });
  };

  const handleCheckout = () => {
    navigate("/payment"); // Redirect to the payment page
  };

  if (cart.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <div className="text-center space-y-6">
            <ShoppingCart className="mx-auto h-16 w-16 text-muted-foreground" />
            <h1 className="text-3xl font-bold">Your cart is empty</h1>
            <p className="text-muted-foreground">Looks like you haven't added anything to your cart yet.</p>
            <Button asChild>
              <Link to="/products">Browse Products</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="col-span-2">
            <div className="bg-card rounded-lg shadow-sm">
              <div className="p-6 space-y-6">
                {cart.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-border pb-6 last:border-0 last:pb-0"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="h-24 w-24 relative overflow-hidden rounded-md bg-secondary">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <Link to={`/products/${item.product.id}`} className="font-medium hover:underline">
                          {item.product.name}
                        </Link>
                        <div className="text-sm text-muted-foreground mt-1">{item.product.category}</div>
                        <div className="font-medium mt-1">${item.product.price.toFixed(2)}</div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                      <div className="flex items-center border border-input rounded-md">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => handleRemoveItem(item.product.id)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="bg-card rounded-lg shadow-sm p-6 sticky top-20">
              <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${getCartTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>Free</span>
                </div>
                <div className="border-t border-border my-4 pt-4 flex justify-between font-medium">
                  <span>Total</span>
                  <span>${getCartTotal().toFixed(2)}</span>
                </div>
                <Button className="w-full" onClick={handleCheckout}>
                  Proceed to Checkout
                </Button>
                <Button variant="outline" className="w-full mt-2" onClick={clearCart}>
                  Clear Cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;