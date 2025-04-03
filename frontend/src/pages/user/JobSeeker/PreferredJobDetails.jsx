// import { NavLink } from "react-router-dom";
// import ProfileSide from "../../../components/Jobseeker/ProfileSide";
// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import Cookies from "js-cookie"; // Import js-cookie to handle cookies easily
// import { getPreferredJobInfo } from "../../../service/jobSeekerService";

// export default function PreferredJobDeatils() {
//   const [jobSeeker, setJobSeeker] = useState({});
//   const [loading, setLoading] = useState(true);
//   // Get userId from localStorage
//   const storedUser = JSON.parse(Cookies.get("user"));

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         if (!storedUser?.id) {
//           toast.error("User ID not found. Please log in.");
//           return;
//         }
//         console.log("User ID:", storedUser?.id);

//         // Fetch JobSeeker info by userId
//         const data = await getPreferredJobInfo(storedUser.id);
//         setJobSeeker(data);
//       } catch (error) {
//         toast.error(error || "Failed to load profile.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (loading) return <p>Loading Preferred Job information...</p>;

//   return (
//     <div className="m-10">
//       <div className="p-4 border border-[#B3B3B3] bg-[#F0EFEF] mb-1">
//         <h3 className="text-lg font-semibold">Account Settings</h3>
//       </div>
//       <div className="flex border border-[#B3B3B3] bg-[#F2F0EF]">
//         <div className="flex border border-[#B3B3B3] bg-[#F2F0EF] shadow-xl font-sans">
//           <ProfileSide />
//         </div>
//         <div className="flex-1 border-b border-[#B3B3B3] bg-[#F2F0EF]">
//           <div className="relative border-b border-[#B3B3B3] p-4 font-bold">
//             Preferred Job Details
//             <NavLink to={`/jobseeker/preferred-job/edit/${storedUser.id}`}>
//               <button
//                 type="button"
//                 className="absolute right-0 top-1/2 transform -translate-y-1/2 py-3 px-4 mr-2 text-sm tracking-wider font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
//               >
//                 Edit
//               </button>
//             </NavLink>
//           </div>
//           <section className="p-1 bg-[#F2F0EF]">
//             <div className="space-y-6 p-4 mx-auto font-[sans-serif]">
//               <div>
//                 <h2>Preferred Job Information</h2>
//                 {/* Assuming jobSeeker has preferred job details */}
//                 <p>
//                   <strong>Preferred Location:</strong>{" "}
//                   {jobSeeker.preferredJobLocation || "N/A"}
//                 </p>
//                 <p>
//                   <strong>Preferred Salary:</strong>{" "}
//                   {jobSeeker.expectedSalary || "N/A"}{" "}
//                   {jobSeeker.salaryFrequency || "N/A"}
//                 </p>
//                 <p>
//                   <strong>Job Type:</strong> {jobSeeker.jobType || "N/A"}
//                 </p>
//                 {/* Add more fields as needed */}
//               </div>
//             </div>
//           </section>
//         </div>
//       </div>
//     </div>
//   );
// }
