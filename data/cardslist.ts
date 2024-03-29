export const getPaymentMethods = () => {
  const paymentMethods = [
    {
      id: 1,
      name: "Master Card",
      image: "/mc.png",
    },
    {
      id: 2,
      name: "Visa",
      image: "/visa.png",
    },
    {
      id: 3,
      name: "Apple Pay",
      image: "/apay.png",
    },
    {
      id: 4,
      name: "Google Pay",
      image: "/gpay.png",
    },
  ];

  return paymentMethods;
};
