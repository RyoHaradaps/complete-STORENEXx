import { Link } from "react-router-dom";

const ThankYou = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Thank You!</h1>
        <p className="text-gray-700 mb-6">Your payment was successful. We appreciate your purchase!</p>
        <Link to="/products">
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ThankYou;