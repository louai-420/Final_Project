import React, { useState, useEffect } from "react";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState({
    street: "",
    city: "",
    zipCode: "",
    country: "",
  });

  // Récupère les informations de l'utilisateur
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUser(response.data);
        setEmail(response.data.email);
        setAddress(
          response.data.address || {
            street: "",
            city: "",
            zipCode: "",
            country: "",
          }
        );
      } catch (err) {
        console.error("Error fetching user profile:", err);
      }
    };

    fetchUserProfile();
  }, []);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        "http://localhost:5000/api/profile",
        {
          email,
          password,
          address,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setUser(response.data.user);
      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Failed to update profile");
    }
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Profile</h1>
      {isEditing ? (
        <form onSubmit={handleUpdateProfile}>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New password (leave blank to keep current)"
            />
          </div>
          <div>
            <label>Street:</label>
            <input
              type="text"
              value={address.street}
              onChange={(e) =>
                setAddress({ ...address, street: e.target.value })
              }
            />
          </div>
          <div>
            <label>City:</label>
            <input
              type="text"
              value={address.city}
              onChange={(e) => setAddress({ ...address, city: e.target.value })}
            />
          </div>
          <div>
            <label>Zip Code:</label>
            <input
              type="text"
              value={address.zipCode}
              onChange={(e) =>
                setAddress({ ...address, zipCode: e.target.value })
              }
            />
          </div>
          <div>
            <label>Country:</label>
            <input
              type="text"
              value={address.country}
              onChange={(e) =>
                setAddress({ ...address, country: e.target.value })
              }
            />
          </div>
          <button type="submit">Update Profile</button>
          <button type="button" onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        </form>
      ) : (
        <div>
          <p>Email: {user.email}</p>
          <p>
            Address:{" "}
            {user.address
              ? `${user.address.street}, ${user.address.city}, ${user.address.zipCode}, ${user.address.country}`
              : "Not provided"}
          </p>
          <button onClick={() => setIsEditing(true)}>Edit Profile</button>
        </div>
      )}
    </div>
  );
};

export default Profile;
