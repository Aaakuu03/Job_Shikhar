import JobCard from "./JobCard";

export default function FeaturedJob() {
  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4"> Featured Jobs</h1>
      <div className="flex gap-10 flex-wrap  justify-center p-2">
        <JobCard />
        <JobCard />
        <JobCard />
        <JobCard />
        <JobCard />
        <JobCard />
      </div>
    </div>
  );
}
