import { useState, useEffect } from 'react';

/**
 * Course with purchase information interface
 */
interface PurchasedCourse {
  id: number;
  title: string;
  description: string;
  thumbnail: string | null;
  category: string;
  duration: string | null;
  level: string;
  instructor_id: number;
  purchase_date: string;
  purchase_price: number;
  progress_percentage: number;
  completion_date: string | null;
}

/**
 * MyCoursesProps interface
 */
interface MyCoursesProps {
  user: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
  } | null;
}

/**
 * My Courses page component to display user's purchased courses
 */
const MyCoursesPage = ({ user }: MyCoursesProps) => {
  const [courses, setCourses] = useState<PurchasedCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    // Redirect to login if not authenticated
    if (!user) {
      window.location.href = '/auth'; // Redirect to login page
      return;
    }
    
    // Fetch purchased courses
    fetchUserCourses();
  }, [user]);
  
  // Fetch user's purchased courses
  const fetchUserCourses = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const response = await fetch('/config/auth-handler.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'get_purchases',
          user_id: user.id
        })
      });
      
      const data = await response.json();
      if (data.success) {
        setCourses(data.purchases || []);
      } else {
        setError(data.message || 'Failed to load your courses');
      }
    } catch (err) {
      setError('Error connecting to server. Please try again later.');
      console.error('Error fetching courses:', err);
    } finally {
      setLoading(false);
    }
  };
  
  // Format purchase date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  // If user is not logged in, don't render anything (useEffect will redirect)
  if (!user) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Courses</h1>
      
      {/* Error message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p>{error}</p>
        </div>
      )}
      
      {/* Loading state */}
      {loading && <p className="text-gray-600">Loading your courses...</p>}
      
      {/* No courses */}
      {!loading && courses.length === 0 && (
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
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" 
            />
          </svg>
          <h3 className="mt-4 text-xl font-medium text-gray-900">You haven't purchased any courses yet</h3>
          <p className="mt-1 text-gray-500">Browse our courses and start learning today!</p>
          <a 
            href="/courses" 
            className="mt-6 inline-block px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Browse Courses
          </a>
        </div>
      )}
      
      {/* Course grid */}
      {!loading && courses.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div key={course.id} className="border rounded-lg overflow-hidden bg-white shadow-sm flex flex-col">
              {/* Course thumbnail */}
              <div className="relative">
                <img
                  src={course.thumbnail || 'https://via.placeholder.com/300x200?text=Course+Image'}
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
                
                {/* Course level badge */}
                <div className="absolute top-2 right-2 bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  {course.level}
                </div>
              </div>
              
              {/* Course content */}
              <div className="p-4 flex-grow">
                <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
                <p className="text-gray-600 text-sm mb-2">Category: {course.category}</p>
                {course.duration && <p className="text-gray-600 text-sm mb-2">Duration: {course.duration}</p>}
                
                {/* Progress bar */}
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>{course.progress_percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-indigo-600 h-2.5 rounded-full" 
                      style={{ width: `${course.progress_percentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              
              {/* Course footer */}
              <div className="p-4 border-t">
                <div className="text-xs text-gray-500 mb-2">
                  Purchased on {formatDate(course.purchase_date)}
                </div>
                <a 
                  href={`/course/${course.id}`} 
                  className="block w-full text-center py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                >
                  {course.progress_percentage > 0 ? 'Continue Learning' : 'Start Course'}
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyCoursesPage;
