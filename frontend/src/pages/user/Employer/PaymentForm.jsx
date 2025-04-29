import React, { useState } from "react";
import axios from "axios";

const PaymentForm = ({ selectedPackage, employerId }) => {
  const [paymentData, setPaymentData] = useState(null);

  // Function to initiate the payment
  const handlePayment = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/payment/initiate",
        {
          packageId: selectedPackage.id,
          employerId,
        }
      );

      setPaymentData(res.data);
    } catch (error) {
      console.error("Error initiating payment", error);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Pay with eSewa</h2>
      <button
        onClick={handlePayment}
        className="bg-green-500 text-white p-2 rounded"
      >
        Pay Now
      </button>

      {paymentData && (
        <form
          action="https://rc-epay.esewa.com.np/api/epay/main/v2/form"
          method="POST"
        >
          <input type="hidden" name="amount" value={paymentData.amount} />
          <input type="hidden" name="tax_amount" value="0" />
          <input
            type="hidden"
            name="total_amount"
            value={paymentData.total_amount}
          />
          <input
            type="hidden"
            name="transaction_uuid"
            value={paymentData.transaction_uuid}
          />
          <input
            type="hidden"
            name="product_code"
            value={paymentData.product_code}
          />
          <input type="hidden" name="product_service_charge" value="0" />
          <input type="hidden" name="product_delivery_charge" value="0" />
          <input
            type="hidden"
            name="success_url"
            value={paymentData.success_url}
          />
          <input
            type="hidden"
            name="failure_url"
            value={paymentData.failure_url}
          />
          <input
            type="hidden"
            name="signed_field_names"
            value={paymentData.signed_field_names}
          />
          <input type="hidden" name="signature" value={paymentData.signature} />

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
          >
            Proceed to Pay
          </button>
        </form>
      )}
    </div>
  );
};

export default PaymentForm;
