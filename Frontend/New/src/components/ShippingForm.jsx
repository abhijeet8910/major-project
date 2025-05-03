import React, { useState } from "react";

const ShippingForm = ({ onSubmit, isPlacingOrder }) => {
  const [form, setForm] = useState({
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    paymentMethod: "cod", // Default to Cash on Delivery
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="bg-white p-6 shadow-xl rounded-xl mb-6 border border-gray-200">
      <h2 className="text-xl font-semibold mb-4">Shipping & Payment Details</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          name="street"
          value={form.street}
          onChange={handleChange}
          placeholder="Street"
          required
          className="border px-3 py-2 rounded"
        />
        <input
          name="city"
          value={form.city}
          onChange={handleChange}
          placeholder="City"
          required
          className="border px-3 py-2 rounded"
        />
        <input
          name="state"
          value={form.state}
          onChange={handleChange}
          placeholder="State"
          required
          className="border px-3 py-2 rounded"
        />
        <input
          name="zipCode"
          value={form.zipCode}
          onChange={handleChange}
          placeholder="Zip Code"
          required
          className="border px-3 py-2 rounded"
        />
        <input
          name="country"
          value={form.country}
          onChange={handleChange}
          placeholder="Country"
          required
          className="border px-3 py-2 rounded col-span-2"
        />

        

        <button
          type="submit"
          disabled={isPlacingOrder}
          className="col-span-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded mt-4"
        >
          {isPlacingOrder ? "Placing Order..." : "Confirm Order"}
        </button>
      </form>
    </div>
  );
};

export default ShippingForm;
