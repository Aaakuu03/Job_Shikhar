import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const JobDetail = () => {
  const { id } = useParams(); // Get job ID from the URL
  const [job, setJob] = useState(null);

  useEffect(() => {
    const fetchJobDetail = async () => {
      try {
        const response = await axios.get(`/api/jobseekers/job/${id}`);
        console.log("Job Details:", response.data); // Log response to check the data
        setJob(response.data);
      } catch (error) {
        toast.error("Failed to fetch job details");
      }
    };

    fetchJobDetail();
  }, [id]);

  if (!job) return <p>Loading job details...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">{job.title}</h2>
      <p>
        <strong>Category:</strong> {job.category?.name ?? "N/A"}
      </p>

      <p>
        <strong>Salary:</strong> ${job.salary}
      </p>
      <p>
        <strong>Description:</strong> {job.description}
      </p>
      <p>
        <strong>Requirement:</strong> {job.requirement}
      </p>
      <p>
        <strong>Experience:</strong> {job.experience}
      </p>
      <p>
        <strong>Application Deadline:</strong>{" "}
        {new Date(job.applicationDeadline).toLocaleDateString()}
      </p>
      <p>
        <strong>Type:</strong> {job.jobType}
      </p>
    </div>
  );
};

export default JobDetail;
