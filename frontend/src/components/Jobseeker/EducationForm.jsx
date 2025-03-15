import { useState } from "react";
import axios from "axios";

export default function EducationForm() {
  // Initialize state for education data and errors
  const [educationList, setEducationList] = useState([
    {
      degree: "",
      courseProgram: "",
      board: "",
      startDate: "",
      endDate: "",
      currentlyStudying: false,
    },
  ]);
  S;
  const [error, setError] = useState("");

  // Handle input changes for each form field
  const handleChange = (index, e) => {
    const { name, value, type, checked } = e.target;
    const updatedEducationList = [...educationList];

    // If checkbox (Currently Studying) is checked, reset the endDate
    if (type === "checkbox") {
      updatedEducationList[index].currentlyStudying = checked;
      updatedEducationList[index].endDate = ""; // Clear endDate when studying
    } else {
      updatedEducationList[index][name] = value; // Update other fields
    }

    setEducationList(updatedEducationList); // Update state with new values
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate if degree, board, and startDate are filled for each entry
    for (let edu of educationList) {
      if (!edu.degree || !edu.board || !edu.startDate) {
        setError(
          "Degree, Board, and Start Date are required for all education."
        );
        return;
      }
    }

    try {
      // Submit all education entries in one request
      const response = await axios.put(
        "http://localhost:3000/api/jobseekers/education",
        {
          education: educationList.map((edu) => ({
            degree: edu.degree,
            courseProgram: edu.courseProgram,
            board: edu.board,
            startDate: new Date(edu.startDate),
            endDate: edu.currentlyStudying ? null : new Date(edu.endDate), // Set endDate only if not studying
            currentlyStudying: edu.currentlyStudying,
          })),
        }
      );

      console.log(response.data.message); // Success message from backend

      // Reset the form after successful submission
      setEducationList([
        {
          degree: "",
          courseProgram: "",
          board: "",
          startDate: "",
          endDate: "",
          currentlyStudying: false,
        },
      ]);
      setError(""); // Clear error if submission was successful
    } catch (err) {
      console.error(err);
      setError("Error updating education.");
    }
  };

  // Add a new education form
  const handleAddEducation = () => {
    setEducationList([
      ...educationList,
      {
        degree: "",
        courseProgram: "",
        board: "",
        startDate: "",
        endDate: "",
        currentlyStudying: false,
      },
    ]);
  };

  // Delete an education form by index
  const handleDeleteEducation = (index) => {
    const updatedEducationList = educationList.filter((_, i) => i !== index);
    setEducationList(updatedEducationList);
  };

  return (
    <>
      <h2 className="text-3xl mb-3 font-bold">Fill the Education Details</h2>

      {/* Loop through educationList to render forms for each education entry */}
      {educationList.map((educationData, index) => (
        <form
          key={index}
          className="space-y-6 font-[sans-serif]"
          onSubmit={handleSubmit}
        >
          {/* Degree Dropdown */}
          <div className="flex items-center">
            <label htmlFor="degree" className="text-gray-400 w-36 text-sm">
              Degree
            </label>
            <select
              className="px-2 py-2 w-full border-b-2 focus:border-[#333] outline-none text-sm bg-white"
              name="edegree"
              value={educationData.edegree}
              onChange={(e) => handleChange(index, e)}
              required
            >
              <option value="" disabled>
                Select an option
              </option>
              <option value="slc">
                SEE (Secondary Education Examination)/SLC
              </option>
              <option value="plus2">
                +2 (Higher Secondary - Grade 11 & 12)
              </option>
              <option value="diploma">Diploma</option>
              <option value="bachelor">Bachelor’s Degree</option>
              <option value="master">Master’s Degree</option>
              <option value="mphil">MPhil</option>
              <option value="phd">PhD</option>
            </select>
          </div>

          {/* Course/Program Input */}
          <div className="flex items-center">
            <label className="text-gray-400 w-36 text-sm">Course/Program</label>
            <input
              type="text"
              name="courseProgram"
              value={educationData.courseProgram}
              onChange={(e) => handleChange(index, e)}
              placeholder="Enter the program"
              className="px-2 py-2 w-full border-b-2 focus:border-[#333] outline-none text-sm bg-white"
            />
          </div>

          {/* Board/University Input */}
          <div className="flex items-center">
            <label className="text-gray-400 w-36 text-sm">
              Education Board/University
            </label>
            <input
              type="text"
              name="board"
              value={educationData.board}
              onChange={(e) => handleChange(index, e)}
              required
              placeholder="Enter your Board Level/University"
              className="px-2 py-2 w-full border-b-2 focus:border-[#333] outline-none text-sm bg-white"
            />
          </div>

          {/* Start Date Input */}
          <div className="flex items-center">
            <label className="text-gray-400 w-36 text-sm">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={educationData.startDate}
              onChange={(e) => handleChange(index, e)}
              className="px-2 py-2 w-full border-b-2 focus:border-[#333] outline-none text-sm bg-white"
            />
          </div>

          {/* End Date Input (Only shown if not currently studying) */}
          {!educationData.currentlyStudying && (
            <div className="flex items-center">
              <label className="text-gray-400 w-36 text-sm">End Date</label>
              <input
                type="date"
                name="endDate"
                value={educationData.endDate}
                onChange={(e) => handleChange(index, e)}
                className="px-2 py-2 w-full border-b-2 focus:border-[#333] outline-none text-sm bg-white"
              />
            </div>
          )}

          {/* Checkbox for Currently Studying */}
          <div className="flex items-center">
            <label className="text-gray-400 text-sm">Currently Studying</label>
            <input
              type="checkbox"
              checked={educationData.currentlyStudying}
              onChange={(e) => handleChange(index, e)}
            />
          </div>

          {/* Error message if validation fails */}
          {error && <p style={{ color: "red" }}>{error}</p>}

          {/* Delete button (only visible if it's not the last form) */}
          {educationList.length > 1 && (
            <div className="flex justify-between mt-4">
              <button
                type="button"
                onClick={() => handleDeleteEducation(index)}
                className="px-6 py-2 bg-red-500 hover:bg-red-600 text-sm text-white rounded-lg"
              >
                Delete
              </button>
            </div>
          )}
        </form>
      ))}

      {/* Add new education form */}
      <button
        type="button"
        onClick={handleAddEducation}
        className="mt-8 px-6 py-2 w-100 bg-[#333] hover:bg-[#444] text-sm text-white mx-auto block rounded-lg shadow-2xl"
      >
        Add Another Education
      </button>

      {/* Submit button */}
      <button
        type="submit"
        className="mt-8 px-6 py-2 w-100 bg-[#333] hover:bg-[#444] text-sm text-white mx-auto block rounded-lg shadow-2xl"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </>
  );
}
