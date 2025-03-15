import { useEffect, useState } from "react";

export default function BasicInformationForm() {
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    position: "",
    companyName: "",
    jobLocation: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  useEffect(() => {
    const fetchWorkExperienceData = async () => {
      try {
        const response = await axios.get(
          `/api/http://localhost:3000/api/jobseeker/profile/:id/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        console.log("Fetched workexperience data:", response.data); // Check if it contains workexperience

        // Ensure you're accessing the workexperience object
        setFormData({
          position: response.data.workExperience.position || "", // Now using response.data.workexperience
          companyName: response.data.workExperience.companyName || "",
          jobLocation: response.data.workExperience.jobLocation || "",
          description: response.data.workExperience.description || "",
          startDate: response.data.workExperience.startDate || "",
          endDate: response.data.workExperience.endDate || "",
        });
      } catch (error) {
        console.error("Error fetching workExperience data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkExperienceData();
  }, [id]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/jobseeker/profile/:id/${id}`, formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      navigate("/jobseeker/workexperience/info"); // Redirect to workExperience page after successful update
    } catch (error) {
      console.error("Error updating workExperience:", error);
    }
  };

  if (loading) return <p>Loading workExperience data...</p>;
  return (
    <>
      <form class="space-y-6    font-[sans-serif] ">
        <div class="flex items-center">
          <label class="text-gray-400 w-36 text-sm">Name</label>
          <input
            type="text"
            name="address"
            placeholder="Enter your full name"
            class="px-2 py-2 w-full border-b-2 focus:border-[#333] outline-none text-sm bg-white"
          />
        </div>
        <div class="flex items-center">
          <label class="text-gray-400 w-36 text-sm">Phone Number</label>
          <input
            type="text"
            name="address"
            placeholder="Enter your contact no"
            class="px-2 py-2 w-full border-b-2 focus:border-[#333] outline-none text-sm bg-white"
          />
        </div>
        <div class="flex items-center">
          <label class="text-gray-400 w-36 text-sm">Address</label>
          <input
            type="text"
            name="address"
            placeholder="Enter your permanent address"
            class="px-2 py-2 w-full border-b-2 focus:border-[#333] outline-none text-sm bg-white"
          />
        </div>

        <div class="flex items-center">
          <label class="text-gray-400 w-36 text-sm">Gender</label>
          <input
            type="text"
            name="gender"
            placeholder="Enter your permanent address"
            class="px-2 py-2 w-full border-b-2 focus:border-[#333] outline-none text-sm bg-white"
          />
        </div>

        <div class="flex items-center">
          <label class="text-gray-400 w-36 text-sm block">DOB</label>
          <input
            type="date"
            name="dob"
            class="px-2 py-2 w-full border-b-2 focus:border-[#333] outline-none text-sm bg-white"
          />
        </div>
        <div class="flex items-center">
          <label for="degree" class="text-gray-400 w-36 text-sm">
            Martial status
          </label>
          <select
            class="px-2 py-2 w-full border-b-2 focus:border-[#333] outline-none text-sm bg-white"
            id="degree"
            name="degree"
          >
            <option value="" disabled selected>
              Select an option
            </option>

            <option value="married">Married</option>
            <option value="unmarried">Unmarried</option>
          </select>

          <p id="selectedDegree"></p>
        </div>

        <button
          type="submit"
          class="!mt-8 px-6 py-2 w-100 bg-[#333] hover:bg-[#444] text-sm text-white mx-auto block rounded-lg shadow-2xl"
        >
          Submit
        </button>
      </form>
    </>
  );
}
