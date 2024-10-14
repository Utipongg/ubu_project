// /app/course-details/[id]/page.js
"use client";
import { useEffect, useState } from "react";

export default function CourseDetails({ params }) {
  const [course, setCourse] = useState(null);
  const [error, setError] = useState(null);
  const { id } = params; // Access the dynamic route parameter

  useEffect(() => {
    async function fetchCourse() {
      try {
        let res = await fetch(`https://esanapi.utipong.info/api/course/courselist/${id}/`); // Fetch course details by ID
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        let data = await res.json();
        setCourse(data);
      } catch (err) {
        console.log(err);
        setError('Failed to fetch course details. Please try again later.');
      }
    }
    fetchCourse();
  }, [id]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!course) {
    return <div>Loading...</div>;
  }

  const getEmbedUrl = (videoUrl) => {
    // Extract video ID and convert to embed URL
    const videoId = new URLSearchParams(new URL(videoUrl).search).get("v");
    return `https://www.youtube.com/embed/${videoId}`;
  };
  return (
    <div className="container mx-auto mt-8 text-center">
  <h1 className="text-3xl font-bold">{course.title}</h1>
  {course.lessons.map((item) => (
    <div key={item.id} className="p-2 justify-items-center">
      <h2 className="text-xl my-2">{item.title}</h2>
      <div className="flex justify-center">
        <iframe
          width="50%"
          height="500"
          className="rounded-xl"
          src={getEmbedUrl(item.video_url)} // Updated to use embed URL
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
      <div className="mx-auto w-2/4 p-2">
        <p className="text-2xl font-bold">รายละเอียด</p>
        <p>{item.content}</p>
      </div>
      <hr />
    </div>
  ))}
</div>

  );
}
