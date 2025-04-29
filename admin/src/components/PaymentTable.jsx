import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function PaymentTable() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    axios
      .get("/api/admin/payments")
      .then((res) => setPayments(res.data))
      .catch(() => toast.error("Failed to load payment records"));
  }, []);

  return (
    <div className="p-4 bg-white rounded-xl shadow text-black">
      <h2 className="text-xl font-bold mb-4">Payment Records</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm  text-black">
          <thead>
            <tr className="bg-gray-200 text-left  text-black">
              <th className="p-2">Employer</th>
              <th className="p-2">Package</th>
              <th className="p-2">Amount</th>
              <th className="p-2">Method</th>
              <th className="p-2">Status</th>
              <th className="p-2">Transaction ID</th>
              <th className="p-2">Purchased On</th>
              <th className="p-2">Expires</th>
              <th className="p-2">Jobs Posted</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p) => (
              <tr key={p.id} className="border-b hover:bg-gray-100">
                <td className="p-2">{p.employer?.user?.name}</td>
                <td className="p-2">{p.package?.name}</td>
                <td className="p-2">${p.amount}</td>
                <td className="p-2">{p.method}</td>
                <td className="p-2">{p.status}</td>
                <td className="p-2">{p.transactionId}</td>
                <td className="p-2">
                  {new Date(p.createdAt).toLocaleDateString()}
                </td>
                <td className="p-2">
                  {p.employerPackage?.expiresAt
                    ? new Date(p.employerPackage.expiresAt).toLocaleDateString()
                    : "N/A"}
                </td>
                <td className="p-2">{p.employerPackage?.jobCount ?? "0"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
