import { useState } from "react";

const FAQs = [
  {
    question: "Registration | How can I register my profile at Job Shikhar?",
    answer:
      "To register, visit our website, click on 'Sign Up', and fill in your details. Verify your email to activate your account.",
  },
  {
    question: "Email Verification | How to verify email?",
    answer:
      "After signing up, you will receive a verification link in your email. Click on the link to verify your email address.",
  },
  {
    question: "Password Setting | How can I change my password?",
    answer:
      "Go to 'Account Settings', select 'Change Password', enter your current password and new password, then save changes.",
  },
  {
    question: "Forget | I have forgotten my password?",
    answer:
      "Click on 'Forgot Password' on the login page. Enter your registered email, and we will send you a reset link.",
  },

  {
    question: "Job Apply | What kind of jobs should I apply to?",
    answer:
      "Apply to jobs that match your skills, experience, and interests. Make sure to read the job description carefully before applying.",
  },
  {
    question:
      "Application Status | How do I know if I have been selected for the job I have applied for?",
    answer:
      "You can check your application status in the 'My Applications' section. If shortlisted, the employer will contact you.",
  },
];

const JobseekerFaqs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {FAQs.map((faq, index) => (
        <div
          key={index}
          className="collapse collapse-plus bg-base-100 border border-base-300"
        >
          <input
            type="checkbox"
            checked={openIndex === index}
            onChange={() => toggleAccordion(index)}
          />
          <div className="collapse-title font-semibold">{faq.question}</div>
          <div className="collapse-content text-sm">
            <p>{faq.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default JobseekerFaqs;
