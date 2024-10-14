"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user, loading } = useAuth();
  const [crose, setCrose] = useState([]);
  const router = useRouter();
  
  // Ensure localStorage is only accessed in the browser
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  async function Getcrose() {
    if (!token) {
      console.log("No token available");
      return;
    }

    try {
      let res = await fetch("https://esanapi.utipong.info/auth/users/me/", {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      let data = await res.json();
      setCrose(data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    // Run the function only when window is defined (i.e., in the browser)
    if (typeof window !== "undefined") {
      Getcrose();
    }
  }, []);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleCourseClick = (courseId) => {
    router.push(`/course-details/${courseId}`); // Navigate to course details page with ID
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mt-4 text-center">ยินดีต้อนรับ: {user.username}</h1>
      <hr className="w-[85%] mx-auto mt-4" />
      <h1 className="text-xl font-bold mt-4 text-center">คอร์สเรียนของคุณ</h1>
      <section className="w-full h-full grid grid-cols-3">
        {crose.enrollments?.map(second => (
          <div
            className="border-2 shadow-lg p-4 rounded-lg cursor-pointer"
            key={second.id}
            onClick={() => handleCourseClick(second.id)} // Click to navigate with ID
          >
            <h1 className="text-2xl font-bold">{second.title}</h1>
            <img className=" h-fit" src={`https://esanapi.utipong.info/${second.cover_image}`} alt="Course" />
            <p className="mt-2 text-xs">{second.description}</p>
            <hr className="border-2 my-2"/>
            <div className="items-center space-x-2 h-[50px] flex">
              <img className="w-fit h-full rounded-full" src={`https://esanapi.utipong.info/${second.instructor_image}`} alt="Instructor" />
              <p>{second.instructor_name}</p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
