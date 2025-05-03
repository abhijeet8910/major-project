import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserProfile = ({ userId }) => {
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    profilePicture: '',
  });

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    profilePicture: '',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');

  // ✅ Fetch user profile
  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const res = await axios.get(`http://localhost:4008/api/user/profile/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = res.data.user;

      setUserDetails(data);
      setForm(data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch user profile');
    }
  };

  useEffect(() => {
    if (userId) fetchUserProfile();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('authToken');
      await axios.put(
        `http://localhost:4008/api/user/profile/update/${userId}`,
        form,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setMessage('Profile updated successfully');
      setIsEditing(false);
      fetchUserProfile(); // refresh user details
    } catch (err) {
      console.error(err);
      setError('Failed to update profile');
    }
  };

  const displayValue = (field) => userDetails[field] || '';

  return (
    <section className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-green-800 mb-6">
        {isEditing ? 'Edit Profile' : `Welcome, ${userDetails.name || ''}`}
      </h1>

      {message && <p className="text-green-600 mb-4">{message}</p>}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 gap-4">
          {/* ✅ Profile Picture Preview */}
          {!isEditing && userDetails.profilePicture && userDetails.profilePicture.startsWith('http') && (
            <img
              src={userDetails.profilePicture}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover"
            />
          )}

          {/* ✅ Profile Fields */}
          {['name', 'email', 'phone', 'address', 'profilePicture'].map((field) => (
            <div key={field}>
              <label className="block font-medium capitalize text-gray-700">
                {field === 'profilePicture' ? 'Profile Picture URL' : field}
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name={field}
                  value={form[field] || ''}
                  onChange={handleChange}
                  className="mt-1 block w-full border rounded px-3 py-2"
                  placeholder={`Enter ${field}`}
                />
              ) : (
                <p className="text-gray-900">{displayValue(field)}</p>
              )}
            </div>
          ))}
        </div>

        {/* ✅ Action Buttons */}
        <div className="mt-6 flex gap-4">
          {isEditing ? (
            <>
              <button
                onClick={handleUpdate}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setForm(userDetails); // reset form to current state
                }}
                className="text-gray-600 hover:underline"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="text-blue-600 hover:underline"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
