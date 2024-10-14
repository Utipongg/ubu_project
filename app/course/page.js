"use client"
import Image from "next/image";
import CourseGrid from "../components/CourseGrid";

export default function Course() {
  
  return (
    <>
   <a className="block text-center mt-5 text-2xl font-bold">คอร์สเรียนทั้งหมด</a>

   <div className="mt-10 container mx-auto">
        <CourseGrid />
      </div>
  </>
  );
}
