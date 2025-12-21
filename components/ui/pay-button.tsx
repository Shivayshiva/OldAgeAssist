"use client";

export default function PayButton() {
  const loadRazorpay = () =>
    new Promise<boolean>((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => reject(false);
      document.body.appendChild(script);
    });

  const handlePayment = async () => {
    try {
      await loadRazorpay();
      const res = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: 500 }),
      });
      if (!res.ok) throw new Error("Failed to create order");
      const order = await res.json();
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        order_id: order.id,
        amount: order.amount,
        currency: "INR",
        name: "Next.js App",
        description: "Test Payment",
        handler: (response: any) => {
          console.log("Frontend success (not final)", response);
          window.location.href = "/donate/success";
        },
        theme: { color: "#0f172a" },
      };
      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment failed:", error);
      alert("Payment initialization failed. Please try again.");
    }
  };

  return <button onClick={handlePayment}>Pay ₹500</button>;
}
