import { useState } from "react";
import "./CreateTrip.css";

const CreateTrip = ({ user, api_url }) => {
  const [trip, setTrip] = useState({
    id: 0,
    title: "",
    description: "",
    img_url: "",
    num_days: 0,
    start_date: "",
    end_date: "",
    total_cost: 0.0,
    username: user.username, // Add the creator's username
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTrip((prev) => ({ ...prev, [name]: value }));
  };

  const createTrip = async (event) => {
    event.preventDefault();

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(trip),
    };

  // Send trip creation request
  const response = await fetch(`${api_url}/api/trips`, options);
    const newTrip = await response.json();

    // Redirect to home or trip details page
    window.location.href = "/";
  };

  return (
    <div>
      <center>
        <h3>Create New Trip</h3>
      </center>
      <form>
        <label>Title</label>
        <br />
        <input
          type="text"
          name="title"
          value={trip.title}
          onChange={handleChange}
        />
        <br />
        <br />
        <label>Description</label>
        <br />
        <textarea
          rows="5"
          cols="50"
          name="description"
          value={trip.description}
          onChange={handleChange}
        ></textarea>
        <br />
        <label>Image URL</label>
        <br />
        <input
          type="text"
          name="img_url"
          value={trip.img_url}
          onChange={handleChange}
        />
        <br />
        <br />
        <label>Number of Days</label>
        <br />
        <input
          type="number"
          name="num_days"
          value={trip.num_days}
          onChange={handleChange}
        />
        <br />
        <br />
        <label>Start Date</label>
        <br />
        <input
          type="text"
          name="start_date"
          value={trip.start_date}
          onChange={handleChange}
        />
        <br />
        <br />
        <label>End Date</label>
        <br />
        <input
          type="text"
          name="end_date"
          value={trip.end_date}
          onChange={handleChange}
        />
        <br />
        <br />
        <label>Total Cost</label>
        <br />
        <input
          type="text"
          name="total_cost"
          value={trip.total_cost}
          onChange={handleChange}
        />
        <br />
        <br />
        <input type="submit" value="Submit" onClick={createTrip} />
      </form>
    </div>
  );
};

export default CreateTrip;