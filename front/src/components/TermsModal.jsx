import React, { useState, useEffect } from "react";

function TermsModal() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setShowModal(true);
  }, []);

  function handleCloseModal() {
    setShowModal(false);
  }

  return (
    <>
      {showModal && (
        <div className={`fixed transease z-[100] bottom-0 p-4 left-0 w-screen bg-slate-900 text-white flex items-center justify-center gap-4`}>
          <p className="text-sm max-w-[600px]">
            By using this website, you understand that it is a concept platform with no actual products.
            Please refer to Stripe API documentation for test payment information.
          </p>
          <button
            className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded text-white"
            onClick={handleCloseModal}
          >
            Accept
          </button>
        </div>
      )}
    </>
  );
}

export default TermsModal;
