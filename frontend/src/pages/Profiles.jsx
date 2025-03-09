// components/EditProfileForm.js
import { useState } from "react";
import { useJobSeeker } from "../context/JobSeekerContext";

const EditProfileForm = () => {
  const { profile, updateProfile, loading } = useJobSeeker();
  const [formData, setFormData] = useState({
    name: profile.name || "",
    dob: profile.dob ? new Date(profile.dob).toISOString().split("T")[0] : "",
    gender: profile.gender || "",
    aboutYourself: profile.aboutYourself || "",
    address: profile.address || "",
    salaryExpectation: profile.salaryExpectation || "",
    preferredJobLocation: profile.preferredJobLocation || "",
    skills: profile.skills || "",
    university: profile.university || "",
    degree: profile.degree || "",
    educationStatus: profile.educationStatus || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit}>
      <label>Name:</label>
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <label>Date of Birth:</label>
      <input
        type="date"
        name="dob"
        value={formData.dob}
        onChange={handleChange}
      />

      <label>Gender:</label>
      <input name="gender" value={formData.gender} onChange={handleChange} />

      <label>About Yourself:</label>
      <textarea
        name="aboutYourself"
        value={formData.aboutYourself}
        onChange={handleChange}
      />

      <label>Address:</label>
      <input name="address" value={formData.address} onChange={handleChange} />

      <label>Salary Expectation:</label>
      <input
        type="number"
        name="salaryExpectation"
        value={formData.salaryExpectation}
        onChange={handleChange}
      />

      <label>Preferred Job Location:</label>
      <input
        name="preferredJobLocation"
        value={formData.preferredJobLocation}
        onChange={handleChange}
      />

      <label>Skills:</label>
      <input name="skills" value={formData.skills} onChange={handleChange} />

      <label>University:</label>
      <input
        name="university"
        value={formData.university}
        onChange={handleChange}
      />

      <label>Degree:</label>
      <input name="degree" value={formData.degree} onChange={handleChange} />

      <label>Education Status:</label>
      <input
        name="educationStatus"
        value={formData.educationStatus}
        onChange={handleChange}
      />

      <button type="submit">Update Profile</button>
    </form>
  );
};

export default EditProfileForm;
