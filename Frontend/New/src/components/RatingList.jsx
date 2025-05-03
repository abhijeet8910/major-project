import React, { useEffect, useState } from "react";
import axios from "axios";

const RatingList = ({ productId }) => {
  const [ratings, setRatings] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const response = await axios.get(`http://localhost:4008/api/ratings/product/${productId}`);
        setRatings(response.data.ratings || []); // Ensure ratings is set to an empty array if undefined
      } catch (err) {
        console.error("Error fetching ratings:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRatings();
  }, [productId]);

  // Loading or no ratings state handling
  if (loading) return <div className="text-center">Loading ratings...</div>;

  if (ratings.length === 0)
    return <div className="text-center text-gray-500">No ratings yet.</div>;

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">Product Reviews</h3>
      <div className="space-y-4">
        {ratings.map((rating) => (
          <div key={rating._id} className="border p-4 rounded-lg shadow-sm bg-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="text-sm font-semibold">{rating.user.name}</div>
                <div className="text-sm text-yellow-500">
                  {Array(rating.rating)
                    .fill("★")
                    .join("")}
                  {Array(5 - rating.rating)
                    .fill("☆")
                    .join("")}
                </div>
              </div>
              <div className="text-sm text-gray-500">{new Date(rating.createdAt).toLocaleDateString()}</div>
            </div>
            <p className="mt-2 text-sm text-gray-700">{rating.comment}</p>
            {rating.image && (
              <div className="mt-2">
                <img
                  src={rating.image} // Assuming the image URL is stored in `rating.image`
                  alt="Rating Image"
                  className="max-w-full h-auto"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RatingList;
