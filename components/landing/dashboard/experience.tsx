"use client";

import TextTitle from "@/components/landing/text/title";

export default function Experience() {
  return (
    <div className="flex flex-col  py-8 gap-6">
      <TextTitle
        title="Experience"
        description="My experience in web development and other related fields"
      />
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col items-center text-blue-500">
          <p className="text-xs lg:text-base">2024 - Present</p>
          <i className="ri-map-pin-line"></i>
        </div>
        <div className="flex">
          <div className="flex flex-col gap-2 flex-end items-stretch justify-end px-2 leading-0">
            <p>2021</p>
          </div>
          <div className="h-48 w-96 flex items-center justify-center overflow-hidden relative">
            <div className="w-96 h-96 rounded-full border-2 border-dashed absolute top-0 right-0"></div>
            <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 flex flex-col gap-4 items-center justify-center">
              <p className="text-2xl font-bold text-center">
                Web Developer 
              </p>
              <div>
                <h6>Pt Media sarana data</h6>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 flex-end items-stretch justify-end px-2 leading-0">
            <p>Present</p>
          </div>
        </div>
      </div>
    </div>
  );
}
