// routes/paymentRoutes.js
import express from "express";
import {
  initiatePayment,
  handleSuccess,
  handleFailure,
  getPaymentSuccessDetails,
  downloadReceipt,
} from "../controller/paymentController.js";

const paymentRouter = express.Router();

paymentRouter.post("/initiate", initiatePayment);
paymentRouter.get("/success", handleSuccess);
paymentRouter.get("/failure", handleFailure);
paymentRouter.get("/details", getPaymentSuccessDetails);
paymentRouter.get("/receipt", downloadReceipt);
export default paymentRouter;
