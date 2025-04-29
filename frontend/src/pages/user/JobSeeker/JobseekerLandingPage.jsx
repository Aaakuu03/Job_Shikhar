import IndustryTypeJob from "../../../components/IndustryTypeJob";
import JobListing from "../../../components/Jobseeker/JobListing";
import JobseekerFilter from "../../../components/Jobseeker/JobseekerFilter";
import JobseekerHero from "../../../components/Jobseeker/JobseekerHero";
import CallToAction from "../CallToAction";
import Working from "../Working";

export default function JobseekerLandingPage() {
  return (
    <div className="mb-2">
      <JobseekerHero />
      <JobseekerFilter />
      <JobListing />
      <IndustryTypeJob />
      <Working />
      <CallToAction />
    </div>
  );
}
