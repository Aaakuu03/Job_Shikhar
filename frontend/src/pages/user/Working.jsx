import React from "react";
import { UserCircle, Search, FileCheck, Briefcase } from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Create an Account",
    description:
      "Register with Jobshikhar to create your professional profile and gain full access to our platform.",
    icon: UserCircle,
  },
  {
    id: 2,
    title: "Find the Right Job",
    description:
      "Use our advanced search filters to discover job listings that match your skills and preferences.",
    icon: Search,
  },
  {
    id: 3,
    title: "Apply for Jobs",
    description:
      "Submit applications with your tailored resume and cover letter to stand out to employers.",
    icon: FileCheck,
  },
  {
    id: 4,
    title: "Start Your Career",
    description:
      "Get hired and kickstart your career journey with the perfect position for your goals.",
    icon: Briefcase,
  },
];

const Working = () => {
  return (
    <section className="py-16 bg-[#F2F0EF]">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-[#2B2B2B] text-center mb-4">
          How JobShikhar Works
        </h2>
        <p className="text-md md:text-lg text-[#B3B3B3] text-center">
          Follow these simple steps to find and secure your dream job
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mt-16">
          {steps.map((step) => (
            <div
              key={step.id}
              className="flex flex-col items-center text-center relative"
            >
              <div className="mb-6 relative">
                <div className="w-20 h-20 bg-[#D4D4D4] rounded-full flex items-center justify-center">
                  <step.icon className="h-10 w-10 text-[#BAA898]" />
                </div>
                <div className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-[#BAA898] text-white flex items-center justify-center text-xl font-bold shadow-md">
                  {step.id}
                </div>
                {step.id < steps.length && (
                  <div className="hidden lg:block absolute top-1/2 left-full transform -translate-y-1/2 w-20 h-0.5 bg-[#BAA898]" />
                )}
              </div>
              <h3 className="text-lg font-semibold text-[#2B2B2B] mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-[#2B2B2B]">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Working;
