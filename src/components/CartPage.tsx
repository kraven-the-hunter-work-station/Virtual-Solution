import { useState, useEffect } from 'react';

/**
 * Course interface definition
 */
interface Course {
  id: number;
  title: string;
  description: string;
  price: number;
  discount_price: number | null;
  thumbnail: string | null;
  instructor_id: number;
  category: string;
  duration: string | null;
  level: string;
}

/**
 * CartItem interface definition (Course with added_at information)
 */
interface CartItem extends Course {
  added_at: string;
}

/**
 * CartPageProps interface
 */
interface CartPageProps {
  user: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
  } | null;
}

/**
 * Cart page component
 */
const CartPage = ({ user }: CartPageProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [processingPurchase, setProcessingPurchase] = useState(false);
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!user) {
      window.location.href = '/auth'; // Redirect to login page
      return;
    }
    
    // Fetch cart items
    fetchCartItems();
  }, [user]);

  // Fetch cart items from the server
  const fetchCartItems = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const response = await fetch('/config/auth-handler.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'get_cart',
          user_id: user.id
        })
      });
      
      const data = await response.json();
      if (data.success) {
        setCartItems(data.cart_items || []);
      } else {
        setError(data.message || 'Failed to load cart items');
      }
    } catch (err) {
      setError('Error connecting to server. Please try again later.');
      console.error('Error fetching cart:', err);
    } finally {
      setLoading(false);
    }
  };

  // Remove item from cart
  const removeFromCart = async (courseId: number) => {
    if (!user) return;
    
    try {
      const response = await fetch('/config/auth-handler.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'remove_from_cart',
          user_id: user.id,
          course_id: courseId
        })
      });
      
      const data = await response.json();
      if (data.success) {
        // Update cart items after removal
        setCartItems(cartItems.filter(item => item.id !== courseId));
      } else {
        setError(data.message || 'Failed to remove item from cart');
      }
    } catch (err) {
      setError('Error connecting to server. Please try again later.');
      console.error('Error removing from cart:', err);
    }
  };

  // Process purchase of all cart items
  const processPurchase = async () => {
    if (!user || cartItems.length === 0) return;
    
    try {
      setProcessingPurchase(true);
      const response = await fetch('/config/auth-handler.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'purchase',
          user_id: user.id
        })
      });
      
      const data = await response.json();
      if (data.success) {
        setPurchaseSuccess(true);
        setCartItems([]);
      } else {
        setError(data.message || 'Failed to complete purchase');
      }
    } catch (err) {
      setError('Error connecting to server. Please try again later.');
      console.error('Error processing purchase:', err);
    } finally {
      setProcessingPurchase(false);
    }
  };

  // Calculate cart total
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = item.discount_price !== null ? item.discount_price : item.price;
      return total + price;
    }, 0);
  };

  // If user is not logged in, don't render anything (useEffect will redirect)
  if (!user) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      
      {/* Error message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p>{error}</p>
        </div>
      )}
      
      {/* Purchase success message */}
      {purchaseSuccess && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          <p className="font-bold">Purchase successful!</p>
          <p>Your courses are now available in "My Courses" section.</p>
          <a 
            href="/my-courses" 
            className="block mt-2 text-blue-600 hover:underline"
          >
            Go to My Courses
          </a>
        </div>
      )}
      
      {/* Loading state */}
      {loading && <p className="text-gray-600">Loading your cart...</p>}
      
      {/* Empty cart */}
      {!loading && cartItems.length === 0 && !purchaseSuccess && (
        <div className="text-center py-12">
          <svg 
            className="mx-auto h-16 w-16 text-gray-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" 
            />
          </svg>
          <h3 className="mt-4 text-xl font-medium text-gray-900">Your cart is empty</h3>
          <p className="mt-1 text-gray-500">Browse our courses and add some to your cart!</p>
          <a 
            href="/courses" 
            className="mt-6 inline-block px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Browse Courses
          </a>
        </div>
      )}
      
      {/* Cart items */}
      {!loading && cartItems.length > 0 && (
        <div>
          <div className="grid grid-cols-1 gap-6 mb-8">
            {cartItems.map((item) => (
              <div key={item.id} className="flex flex-col md:flex-row border rounded-lg overflow-hidden bg-white shadow-sm">
                {/* Course thumbnail */}
                <div className="w-full md:w-1/4">
                  <img
                    src={item.thumbnail || 'https://via.placeholder.com/300x200?text=Course+Image'}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                </div>
                
                {/* Course details */}
                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">Category: {item.category}</p>
                  <p className="text-gray-600 text-sm mb-2">Level: {item.level}</p>
                  {item.duration && <p className="text-gray-600 text-sm">Duration: {item.duration}</p>}
                  
                  <div className="mt-auto flex justify-between items-center">
                    <div>
                      {item.discount_price !== null ? (
                        <div className="flex items-center">
                          <span className="text-lg font-bold">${item.discount_price.toFixed(2)}</span>
                          <span className="ml-2 text-gray-500 line-through">${item.price.toFixed(2)}</span>
                        </div>
                      ) : (
                        <span className="text-lg font-bold">${item.price.toFixed(2)}</span>
                      )}
                    </div>
                    
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Cart summary and checkout */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex justify-between mb-4">
              <span className="text-lg">Total:</span>
              <span className="text-lg font-bold">${calculateTotal().toFixed(2)}</span>
            </div>
            
            <button
              onClick={processPurchase}
              disabled={processingPurchase}
              className={`w-full py-3 rounded-lg text-white font-semibold 
                ${processingPurchase 
                  ? 'bg-indigo-400 cursor-not-allowed' 
                  : 'bg-indigo-600 hover:bg-indigo-700'}`}
            >
              {processingPurchase ? 'Processing...' : 'Complete Purchase'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
