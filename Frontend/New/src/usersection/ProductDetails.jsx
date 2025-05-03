

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ShippingForm from "../components/ShippingForm";
import RatingForm from "../components/RatingForm";
import RatingList from "../components/RatingList";

const ProductDetails = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);
  const [placingOrder, setPlacingOrder] = useState(false);
  const [showShippingForm, setShowShippingForm] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [showRatingForm, setShowRatingForm] = useState(false);
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    if (!productId) return;
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:4008/api/products/${productId}`);
        setProduct(res.data.product);
      } catch (err) {
        console.error("Error fetching product details:", err);
      }
    };
    fetchProduct();
  }, [productId]);

  const handleAddToCart = async () => {
    try {
      setAddingToCart(true);
      await axios.post(
        "http://localhost:4008/api/cart/add",
        { productId: product._id, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("✅ Added to cart!");
    } catch (err) {
      console.error("❌ Error adding to cart:", err?.response?.data || err);
      alert("Failed to add to cart.");
    } finally {
      setAddingToCart(false);
    }
  };

  const handleShippingSubmit = async (shippingAddress) => {
    if (!token) {
      alert("Please login to place an order.");
      navigate("/login");
      return;
    }

    try {
      setPlacingOrder(true);
      if (paymentMethod === "COD") {
        await axios.post(
          "http://localhost:4008/api/orders/place",
          {
            items: [{ product: product._id, quantity }],
            shippingAddress,
            seller: product.seller,
            paymentMethod: "COD",
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        alert("✅ Order placed with Cash on Delivery!");
        setOrderPlaced(true);
      } else {
        const paymentRes = await axios.post(
          "http://localhost:4008/api/orders/create-payment",
          { amount: product.price * quantity },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const { order } = paymentRes.data;

        const options = {
          key: "rzp_test_LnsqP2mudQkRI8",
          amount: order.amount,
          currency: "INR",
          name: "My Store",
          description: product.name,
          image: "/logo.png",
          order_id: order.id,
          handler: async function (response) {
            try {
              await axios.post(
                "http://localhost:4008/api/orders/place",
                {
                  items: [{ product: product._id, quantity }],
                  shippingAddress,
                  seller: product.seller,
                  paymentMethod: "Online",
                },
                { headers: { Authorization: `Bearer ${token}` } }
              );
              alert("✅ Order placed successfully!");
              setOrderPlaced(true);
            } catch (error) {
              console.error("❌ Error placing order:", error);
              alert("Payment done, but order failed. Please contact support.");
            }
          },
          prefill: {
            name: "",
            email: "",
            contact: "",
          },
          theme: { color: "#3399cc" },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      }
    } catch (err) {
      console.error("❌ Error during order flow:", err?.response?.data || err);
      alert("Something went wrong. Please try again.");
    } finally {
      setPlacingOrder(false);
    }
  };

  const handleQuantityChange = (change) => {
    setQuantity((prev) => Math.max(1, prev + change));
  };

  const getFullImageUrl = (imagePath) => {
    if (!imagePath) return "/placeholder.jpg";
    return imagePath.startsWith("http")
      ? imagePath
      : `http://localhost:4008${imagePath.startsWith("/") ? "" : "/uploads/"}${imagePath}`;
  };

  const imageUrl = getFullImageUrl(product?.imageUrl);

  if (!product)
    return <div className="text-center mt-10 text-lg text-gray-500">Loading product details...</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-blue-100 text-blue-700 hover:bg-blue-200 hover:text-blue-900 text-sm font-medium rounded-full transition duration-200 shadow-sm"
      >
        <span className="text-lg">←</span> Back to Products
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white shadow-lg rounded-2xl overflow-hidden p-6">
        <div className="w-full h-96 overflow-hidden rounded-xl">
          <img
            src={imageUrl}
            alt={product.name}
            className="max-h-full w-auto object-contain transition-transform duration-300 hover:scale-105 mx-auto"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/placeholder.jpg";
            }}
          />
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
            <p className="mt-3 text-gray-700 text-base">{product.description}</p>

            <div className="mt-6">
              <p className="text-2xl text-green-600 font-semibold">₹{product.price?.toFixed(2)}</p>
              <p className="text-sm text-gray-500 mt-1">Category: {product.category}</p>
            </div>

            <div className="mt-6 flex items-center gap-4">
              <span className="text-sm font-medium text-gray-700">Quantity:</span>
              <button
                onClick={() => handleQuantityChange(-1)}
                className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-lg rounded"
              >
                −
              </button>
              <span className="text-lg font-semibold">{quantity}</span>
              <button
                onClick={() => handleQuantityChange(1)}
                className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-lg rounded"
              >
                +
              </button>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={addingToCart}
            className={`mt-8 w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-xl transition-all duration-200 ${
              addingToCart ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {addingToCart ? "Adding..." : "Add to Cart"}
          </button>

          
          <button
  onClick={() => setShowShippingForm(true)}
  className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl transition-all duration-200"
>
  Place Order
</button>

{showShippingForm && (
  <div className="mt-6 p-4 bg-gray-50 rounded-xl border">
    <div className="mb-4">
      <label className="block font-medium text-sm mb-2">Select Payment Method:</label>
      <div className="flex gap-4">
        {["COD", "Online"].map((method) => (
          <label key={method} className="flex items-center gap-2">
            <input
              type="radio"
              name="paymentMethod"
              value={method}
              checked={paymentMethod === method}
              onChange={() => setPaymentMethod(method)}
            />
            {method === "COD" ? "Cash on Delivery" : "Online Payment"}
          </label>
        ))}
      </div>
    </div>
    <ShippingForm onSubmit={handleShippingSubmit} isPlacingOrder={placingOrder} />
  </div>
)}

        </div>
      </div>

      {orderPlaced && !showRatingForm && (
        <button
          onClick={() => setShowRatingForm(true)}
          className="mt-8 w-full bg-yellow-600 hover:bg-yellow-700 text-white font-medium py-3 rounded-xl transition-all duration-200"
        >
          Rate this Product
        </button>
      )}

      {showRatingForm && (
        <RatingForm
          productId={productId}
          setShowRatingForm={setShowRatingForm} // For closing form after submission
        />

      )}

      <RatingList productId={productId} />
    </div>
  );
};

export default ProductDetails;
