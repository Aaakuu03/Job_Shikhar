import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import UpdateStatus from "./UpdateStatus";

const ViewApplicants = () => {
  const [applications, setApplications] = useState(null);
  const [loading, setLoading] = useState(true);
  const { jobId, applicationId } = useParams();

  useEffect(() => {
    const fetchApplications = async () => {
      if (!jobId) {
        console.error("❌ jobId is undefined or missing!");
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get(
          `http://localhost:3000/api/employer/job/${jobId}/application/${applicationId}`,
          {
            withCredentials: true, // ✅ Ensures cookies are sent
          }
        );
        setApplications(response.data);
      } catch (error) {
        console.error("🔥 Error fetching applications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [jobId, applicationId]);

  if (loading)
    return (
      <p className="text-center text-gray-500">
        Loading application details...
      </p>
    );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-xl rounded-lg border border-gray-300">
      {applications && applications.jobSeeker ? (
        <>
          <h2 className="text-2xl font-bold text-gray-800 border-b pb-3 mb-4">
            Application Details
          </h2>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <p>
              <strong>Name:</strong> {applications.jobSeeker.name || "N/A"}
            </p>
            <p>
              <strong>Email:</strong> {applications.jobSeeker.email || "N/A"}
            </p>
            <p>
              <strong>Phone:</strong> {applications.jobSeeker.phone || "N/A"}
            </p>
            <p>
              <strong>Status:</strong> {applications.status}
            </p>
            <p>
              <strong>Resume:</strong>{" "}
              {applications.jobSeeker.resumeUrl ? (
                <a
                  href={applications.jobSeeker.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  View Resume
                </a>
              ) : (
                "Not Provided"
              )}
            </p>
          </div>

          {/* Education Section */}
          <h3 className="text-xl font-semibold mt-6 mb-2 border-b pb-2">
            Education
          </h3>
          {applications.jobSeeker.education.length > 0 ? (
            <ul className="space-y-3">
              {applications.jobSeeker.education.map((edu) => (
                <li key={edu.id} className="p-3 border rounded-lg bg-gray-50">
                  <p>
                    <strong>Degree:</strong> {edu.degree}
                  </p>
                  <p>
                    <strong>Course:</strong> {edu.courseProgram}
                  </p>
                  <p>
                    <strong>Board:</strong> {edu.board}
                  </p>
                  <p>
                    <strong>College:</strong> {edu.college}
                  </p>
                  <p>
                    <strong>Duration:</strong> {edu.startDate} -{" "}
                    {edu.currentlyStudying ? "Present" : edu.endDate}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No education details provided.</p>
          )}

          {/* Training Section */}
          <h3 className="text-xl font-semibold mt-6 mb-2 border-b pb-2">
            Training
          </h3>
          {applications.jobSeeker.training.length > 0 ? (
            <ul className="space-y-3">
              {applications.jobSeeker.training.map((training) => (
                <li
                  key={training.id}
                  className="p-3 border rounded-lg bg-gray-50"
                >
                  <p>
                    <strong>Training Name:</strong> {training.trainingName}
                  </p>
                  <p>
                    <strong>Institute:</strong> {training.institute}
                  </p>
                  <p>
                    <strong>Duration:</strong> {training.duration} months
                  </p>
                  <p>
                    <strong>Year:</strong> {training.year}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No training details provided.</p>
          )}

          {/* Experience Section */}
          <h3 className="text-xl font-semibold mt-6 mb-2 border-b pb-2">
            Work Experience
          </h3>
          {applications.jobSeeker.experience.length > 0 ? (
            <ul className="space-y-3">
              {applications.jobSeeker.experience.map((exp) => (
                <li key={exp.id} className="p-3 border rounded-lg bg-gray-50">
                  <p>
                    <strong>Company:</strong> {exp.companyName}
                  </p>
                  <p>
                    <strong>Position:</strong> {exp.position}
                  </p>
                  <p>
                    <strong>Location:</strong> {exp.jobLocation}
                  </p>
                  <p>
                    <strong>Duration:</strong> {exp.startDate} - {exp.endDate}
                  </p>
                  <p>
                    <strong>Description:</strong> {exp.description}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">
              No work experience details provided.
            </p>
          )}

          {/* Status Update */}
          <div className="mt-6">
            <UpdateStatus applicationId={applicationId} />
          </div>
        </>
      ) : (
        <p className="text-center text-red-500">Application not found.</p>
      )}
    </div>
  );
};

export default ViewApplicants;
