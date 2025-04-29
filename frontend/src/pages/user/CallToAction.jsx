import React from "react";

const CallToAction = () => {
  return (
    <section className="py-20 bg-[#2B2B2B] text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to Find Your Next Opportunity?
        </h2>
        <p className="text-lg md:text-xl max-w-3xl mx-auto mb-10 text-gray-300">
          Join thousands of job seekers who have found their perfect match
          through JobShikhar. Create your profile today and get access to
          exclusive job listings.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-[#BAA898] hover:bg-white hover:text-[#2B2B2B] text-white px-8 py-6 text-lg">
            Get Started Now
          </button>
          <button
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-[#2B2B2B] px-8 py-6 text-lg"
          >
            For Employers
          </button>
        </div>
        <p className="mt-8 text-gray-400">
          Already have an account?{" "}
          <a href="#" className="text-[#BAA898] hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </section>
  );
};

export default CallToAction;
