"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const CoursePage = ({ params }) => {
  const { id } = params;  // course ID
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null); // to store user ID
  const router = useRouter(); // Initialize the router

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(`https://esanapi.utipong.info/api/course/courselist/${id}/`); // Update with your API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch course data');
        }
        const data = await response.json();
        setCourse(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }

      try {
        const response = await fetch('https://esanapi.utipong.info/auth/users/me/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Pass the token in the Authorization header
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user info');
        }

        const userData = await response.json();
        setUserId(userData.id);  // Set the user ID
      } catch (err) {
        console.error('Error fetching user data:', err);
      }
    };

    fetchCourse(); // Fetch the course data
    fetchUser();   // Fetch the user data
  }, [id]); // Dependency array to re-run the effect when the id changes

  const handleEnrollment = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please log in to enroll.");
      router.push("/login"); // Redirect to login page if not logged in
      return;
    }

    try {
      const response = await fetch(`https://esanapi.utipong.info/api/course/enrollmentlist/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          course: id,  // course ID from params
          student: userId,  // user ID from /me/ endpoint
        }),
      });

      if (response.ok) {
        alert("Successfully enrolled in the course!");
      } else {
        const errorData = await response.json();
        alert(`Enrollment failed: ${JSON.stringify(errorData)}`);
      }
    } catch (err) {
      console.error('Error enrolling:', err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {course && (
        <div>
          <h2 className='my-5 text-center block font-bold text-2xl'>{course.title}</h2>
          <img
            src={course.cover_image}
            alt={course.title}
            className="max-w-[800px] max-h-[500px] w-[100%] h-[100%] mx-auto mt-3 rounded-lg"
          />
          
          <p className='font-bold text-lg md:mx-36 mt-4'>รายละเอียด:</p>
          <p className='mt-3 block text-center md:text-left md:mx-40'>{course.description}</p>
          
          {/* Centered Instructor Info */}
          <div className="flex flex-col items-center mt-5">
            <div className="flex items-center justify-center">
              <img
                src={course.instructor_image}
                alt={course.instructor_name}
                className="w-8 h-8 rounded-full mr-2"
              />
              <p className="text-gray-500 text-sm">{course.instructor_name}</p>
            </div>
          </div>
          
          {/* Enroll Button */}
          <div className="text-center mt-6 mb-6">
            <button
              onClick={handleEnrollment}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Enroll Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoursePage;
