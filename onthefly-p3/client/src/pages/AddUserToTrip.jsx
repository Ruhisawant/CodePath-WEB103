import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const AddUserToTrip = ({ user, api_url }) => {
  const { trip_id } = useParams();
  const navigate = useNavigate();
  const [username, setUsername] = useState(user?.username || "");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${api_url}/api/users-trips/create/${trip_id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to add user to trip");
      }

      navigate(`/trip/get/${trip_id}`);
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="AddUserToTrip">
      <h2>Add user to trip</h2>
      <form onSubmit={handleSubmit}>
        <label>
          GitHub username
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="github username"
          />
        </label>
        <button type="submit" disabled={loading} className="headerBtn">
          {loading ? "Adding..." : "Add user"}
        </button>
      </form>
    </div>
  );
};

export default AddUserToTrip;