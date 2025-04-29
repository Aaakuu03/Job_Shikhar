import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Success = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  const transactionUuid = queryParams.get("transaction_uuid");
  const employerId = queryParams.get("employerId");
  const packageId = queryParams.get("packageId");

  const [paymentDetails, setPaymentDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleDownloadReceipt = () => {
    const link = document.createElement("a");
    link.href = `http://localhost:5000/api/payment/receipt?transactionId=${transactionUuid}`;
    link.setAttribute("download", `receipt_${transactionUuid}.pdf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    const handleSuccessAndFetch = async () => {
      if (!transactionUuid) {
        setError("Transaction ID missing.");
        setLoading(false);
        return;
      }

      try {
        // First: Call handleSuccess API to update database
        if (employerId && packageId) {
          await axios.get("http://localhost:5000/api/payment/success", {
            params: {
              transaction_uuid: transactionUuid,
              employerId,
              packageId,
            },
          });

          // Clean up URL to remove employerId & packageId after update
          const cleanUrl = `/employer/payment/success?transaction_uuid=${transactionUuid}`;
          window.history.replaceState(null, "", cleanUrl);
        }

        // Then: Fetch payment details
        const res = await axios.get(
          `http://localhost:5000/api/payment/details`,
          {
            params: { transactionId: transactionUuid },
          }
        );
        setPaymentDetails(res.data);
      } catch (err) {
        console.error(
          "❌ Error handling payment success or fetching details:",
          err
        );
        setError("Failed to confirm payment.");
      } finally {
        setLoading(false);
      }
    };

    handleSuccessAndFetch();
  }, [transactionUuid, employerId, packageId]);

  if (loading)
    return (
      <p className="text-center text-gray-500 mt-10">
        Processing and loading payment details...
      </p>
    );

  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-8 mt-10">
      <h1 className="text-3xl font-bold text-green-600 text-center mb-2">
        ✅ Payment Successful
      </h1>
      <h3 className="text-center text-gray-600 mb-6">
        Transaction ID:{" "}
        <span className="font-semibold">{paymentDetails.transactionId}</span>
      </h3>

      <div className="mb-6 border border-gray-200 rounded-lg p-5 bg-gray-50">
        <h2 className="text-xl font-semibold text-blue-600 mb-3">
          📦 Package Info
        </h2>
        <p>
          <span className="font-semibold">Name:</span>{" "}
          {paymentDetails.package.name}
        </p>
        <p>
          <span className="font-semibold">Price:</span> $
          {paymentDetails.package.price}
        </p>
        <p>
          <span className="font-semibold">Duration:</span>{" "}
          {paymentDetails.package.duration} days
        </p>
        <p>
          <span className="font-semibold">Job Limit:</span>{" "}
          {paymentDetails.package.jobLimit}
        </p>
        {paymentDetails.package.description && (
          <p>
            <span className="font-semibold">Description:</span>{" "}
            {paymentDetails.package.description}
          </p>
        )}
      </div>

      <div className="mb-6 border border-gray-200 rounded-lg p-5 bg-gray-50">
        <h2 className="text-xl font-semibold text-blue-600 mb-3">
          🧑 Employer Info
        </h2>
        <p>
          <span className="font-semibold">Name:</span>{" "}
          {paymentDetails.employer.name}
        </p>
        <p>
          <span className="font-semibold">Email:</span>{" "}
          {paymentDetails.employer.email}
        </p>
      </div>

      <div className="mb-6 border border-gray-200 rounded-lg p-5 bg-gray-50">
        <h2 className="text-xl font-semibold text-blue-600 mb-3">
          📅 Package Validity
        </h2>
        <p>
          <span className="font-semibold">Expires At:</span>{" "}
          {new Date(paymentDetails.employerPackage?.expiresAt).toLocaleString()}
        </p>
        <p>
          <span className="font-semibold">Jobs Posted:</span>{" "}
          {paymentDetails.employerPackage?.jobCount}
        </p>
      </div>

      <div className="text-center">
        <button
          onClick={handleDownloadReceipt}
          className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
        >
          📥 Download Receipt (PDF)
        </button>
      </div>
    </div>
  );
};

export default Success;
