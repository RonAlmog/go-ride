import {
  useStripe,
  Elements,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { Stripe } from "@stripe/stripe-js";
import { Button } from "../ui/button";
import { json } from "stream/consumers";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const handleSubmit = async (event: any) => {
    if (elements === null) return null;

    const { error: submitError } = await elements.submit();
    if (submitError) {
      return;
    }

    const res = await fetch("/api/create-intent", {
      method: "POST",
      body: JSON.stringify({ amount: 58 }),
    });
    const secretKey = await res.json();
    console.log(secretKey);
    const { error } = await stripe?.confirmPayment({
      clientSecret: secretKey,
      elements,
      confirmParams: {
        return_url: "http://localhost:3000",
      },
    });
  };

  return (
    <div className="flex flex-col items-center justify-center w-full mt-6">
      <form onSubmit={handleSubmit} className="max-w-md">
        <PaymentElement />
        <Button
          type="submit"
          disabled={!stripe || !elements}
          className="w-full bg-yellow-400 mt-2 text-black font-semibold"
        >
          Pay
        </Button>
      </form>
    </div>
  );
};

export default CheckoutForm;
