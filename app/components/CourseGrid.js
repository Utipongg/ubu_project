import React from "react";
import Link from 'next/link'; // Import Link from Next.js
import { useState, useEffect } from 'react';

export default function CourseGrid() {
    const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Fetch the courses from your API
    fetch("https://esanapi.utipong.info/api/course/courselist/")
      .then((response) => response.json())
      .then((data) => setCourses(data))
      .catch((error) => console.error("Error fetching courses:", error));
  }, []);
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {courses.map((course) => (
          <Link key={course.id} href={`/course/${course.id}`}>
            <div className="border rounded-lg overflow-hidden shadow-lg cursor-pointer transition ease-in-out hover:-translate-y-1 hover:scale-105 duration-300">
              <img
                src={course.cover_image}
                alt={course.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                <p className="text-gray-700 text-sm mb-4">
                  {course.description.substring(0, 100)}...
                </p>
                <div className="flex items-center">
                  <img
                    src={course.instructor_image}
                    alt={course.instructor_name}
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  <p className="text-gray-500 text-sm">{course.instructor_name}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    );
  }
  


