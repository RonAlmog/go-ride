"use client";
import { SelectedAmountContext } from "@/context/selected-amount";
import { useContext } from "react";
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "@/components/payment/checkout";

const PaymentPage = () => {
  //   const { selectedAmout, setSelectedAmount } = useContext(
  //     SelectedAmountContext
  //   );

  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
  );
  const options: StripeElementsOptions = {
    mode: "payment",
    amount: 1099,
    currency: "usd",
  };
  return (
    <div>
      <Elements stripe={stripePromise} options={options}>
        <CheckoutForm />
      </Elements>
    </div>
  );
};

export default PaymentPage;
