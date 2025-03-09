import { useState } from "react";

const FAQs = [
  {
    question: "Registration | How can I register as an employer?",
    answer:
      "To register, visit our website, click on 'Employer Sign Up', and provide your company details. Verify your email to activate your account.",
  },
  {
    question: "Job Posting | How do I post a job?",
    answer:
      "Log in to your employer account, go to 'Post a Job', and fill in the job details. Submit the form to publish your job listing.",
  },
  {
    question: "Applicant Review | How do I review job applications?",
    answer:
      "Access the 'Job Applications' section from your dashboard to view and manage applications for your job postings.",
  },
  {
    question: "Contact Applicants | How do I contact shortlisted candidates?",
    answer:
      "Use the messaging feature on the platform or reach out via the provided contact information of the applicant.",
  },
  {
    question: "Edit Job | Can I edit or delete a job posting?",
    answer:
      "Yes, you can edit or delete job postings from the 'Manage Jobs' section of your employer dashboard.",
  },
  {
    question: "Subscription | How do I manage my subscription plan?",
    answer:
      "You can manage or upgrade your subscription plan in the 'Billing' section of your dashboard.",
  },
];

const EmpFaqs = () => {
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
export default EmpFaqs;
