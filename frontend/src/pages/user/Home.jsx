import FeaturedJob from "../../components/FeaturedJob";
import Hero from "../../components/Hero";
import JobCategories from "../../components/JobCategories";
import JobFilter from "../../components/Jobseeker/JobFilter";
import CallToAction from "./CallToAction";
import Working from "./Working";

export default function Home() {
  return (
    <div className="mb-2">
      <Hero />
      <JobFilter />
      <FeaturedJob />
      <JobCategories />
      <Working />
      <CallToAction />
    </div>
  );
}
