"use client"
import Image from "next/image";
import SwiperComponent from "./components/SwiperComponent";
import CourseGrid from "./components/CourseGrid";

export default function Home() {

  return (
   <>
   <div>
    <div className="w-full bg-cover bg-center">
    <SwiperComponent />
    </div>
    <div className="mt-10 container mx-auto">
        <CourseGrid />
      </div>
    </div>
   </>
  );
}
