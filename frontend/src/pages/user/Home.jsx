import FeaturedJob from "../../components/FeaturedJob";
import Hero from "../../components/Hero";
import JobCategories from "../../components/JobCategories";

export default function Home() {
  return (
    <div>
      <Hero />
      <FeaturedJob />
      <JobCategories />
    </div>
  );
}
