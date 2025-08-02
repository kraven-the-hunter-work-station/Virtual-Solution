import React, { useState } from 'react';

/**
 * Course interface for cart button
 */
interface Course {
  id: number;
  title: string;
}

/**
 * AddToCartButton props
 */
interface AddToCartButtonProps {
  course: Course;
  userId?: number | string;
  onSuccess?: () => void;
  onError?: (error: string) => void;
  className?: string;
  buttonText?: string;
}

/**
 * Add to Cart Button Component
 * 
 * This component renders a button to add a course to the user's cart
 * It handles the API call to add the course and shows loading/success states
 */
const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  course,
  userId,
  onSuccess,
  onError,
  className = "",
  buttonText = "Add to Cart"
}) => {
  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddToCart = async () => {
    // If no user ID is provided, redirect to login
    if (!userId) {
      window.location.href = '/auth';
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/config/auth-handler.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'add_to_cart',
          user_id: userId,
          course_id: course.id
        })
      });

      const data = await response.json();

      if (data.success) {
        setAdded(true);
        
        // Call success callback if provided
        if (onSuccess) {
          onSuccess();
        }
        
        // Reset added state after 2 seconds to allow adding again
        setTimeout(() => {
          setAdded(false);
        }, 2000);
      } else {
        setError(data.message || 'Failed to add course to cart');
        
        // Call error callback if provided
        if (onError) {
          onError(data.message || 'Failed to add course to cart');
        }
      }
    } catch (err) {
      const errorMessage = 'Error connecting to server';
      setError(errorMessage);
      
      // Call error callback if provided
      if (onError) {
        onError(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleAddToCart}
        disabled={loading || added}
        className={`${className} relative ${
          added ? 'bg-green-600 hover:bg-green-700' : 
          'bg-indigo-600 hover:bg-indigo-700'
        } text-white px-4 py-2 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
      >
        {loading && (
          <span className="absolute inset-0 flex items-center justify-center">
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </span>
        )}
        
        <span className={loading ? 'opacity-0' : 'flex items-center'}>
          {added ? (
            <>
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
              </svg>
              Added to Cart
            </>
          ) : (
            <>
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
              {buttonText}
            </>
          )}
        </span>
      </button>
      
      {error && (
        <p className="text-red-500 text-xs mt-1">{error}</p>
      )}
    </div>
  );
};

export default AddToCartButton;
