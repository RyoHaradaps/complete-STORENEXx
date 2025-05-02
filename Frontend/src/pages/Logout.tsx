import { useAuthStore } from "../store/authStore";
import { Button } from "@/components/ui/button";

const Logout = () => {
  const { logout } = useAuthStore();

  const handleLogout = async () => {
    try {
      await logout();
      alert("Logged out successfully!");
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Logout failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8 text-center">
        <h2 className="text-3xl font-bold mb-6">Logout</h2>
        <p className="text-gray-700 mb-6">Are you sure you want to log out?</p>
        <Button onClick={handleLogout} size="lg" className="w-full">
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Logout;