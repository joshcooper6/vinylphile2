import React, { useState, useEffect } from "react";

function PaymentStatus() {
  const [success, setSuccess] = useState(false);
  const [canceled, setCanceled] = useState(false);
  
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.get("success")) {
      setSuccess(true);
    } else if (searchParams.get("canceled")) {
      setCanceled(true);
    }
  }, []);

  useEffect(() => {
    if (success || canceled) {
      setTimeout(() => {
        setSuccess(false);
        setCanceled(false);
      }, 5000);
    }
  }, [success, canceled]);

  return (
    <div className="flex items-center justify-center w-full text-center">
      {success && (
        <p className="text-3xl p-6">
          Payment successful!
          <br />
          Check your email for confirmation.
        </p>
      )}
      {canceled && <p className="text-3xl p-6">Payment canceled!</p>}
    </div>
  );
}

export default PaymentStatus;