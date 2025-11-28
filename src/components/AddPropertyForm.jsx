import React, { useState } from "react";

function AddPropertyForm({ addProperty }) {
  const [formData, setFormData] = useState({
    image: "https://via.placeholder.com/300x200", // placeholder image
    title: "Beautiful Apartment", // placeholder title
    location: "Nairobi", // placeholder location
    price: "1000", // placeholder price
    description: "A lovely property to live in.", // placeholder description
    amenities: {
      generator: false,
      swimmingPool: false,
      parking: false,
      wifi: false
    }
  });

  // Handle text/number/textarea inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle checkbox inputs
  const handleAmenityChange = (e) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      amenities: { ...prev.amenities, [name]: checked }
    }));
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const selectedAmenities = Object.keys(formData.amenities).filter(key => formData.amenities[key]);

    const propertyPayload = {
      image: formData.image,
      title: formData.title,
      location: formData.location,
      price: Number(formData.price),
      description: formData.description,
      amenities: selectedAmenities
    };

    fetch("http://localhost:4000/properties", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(propertyPayload)
    })
      .then(res => res.json())
      .then(newProperty => {
        addProperty(newProperty); // update parent state
        // clear form
        setFormData({
          image: "https://via.placeholder.com/300x200",
          title: "Beautiful Apartment",
          location: "Nairobi",
          price: "1000",
          description: "A lovely property to live in.",
          amenities: {
            generator: false,
            swimmingPool: false,
            parking: false,
            wifi: false
          }
        });
      })
      .catch(err => {
        console.error("Failed to add property:", err);
        alert("Could not add property. Check console for details.");
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Property</h2>

      <label>Image URL:</label>
      <input
        type="url"
        name="image"
        value={formData.image}
        onChange={handleChange}
        required
        placeholder="https://via.placeholder.com/300x200"
      />

      <label>Title:</label>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        required
        placeholder="Beautiful Apartment"
      />

      <label>Location:</label>
      <input
        type="text"
        name="location"
        value={formData.location}
        onChange={handleChange}
        required
        placeholder="Nairobi"
      />

      <label>Price:</label>
      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        required
        placeholder="1000"
      />

      <label>Description:</label>
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        rows={4}
        placeholder="A lovely property to live in."
      />

      <fieldset>
        <legend>Amenities</legend>

        <label>
          <input
            type="checkbox"
            name="generator"
            checked={formData.amenities.generator}
            onChange={handleAmenityChange}
          />
          Generator
        </label>

        <label>
          <input
            type="checkbox"
            name="swimmingPool"
            checked={formData.amenities.swimmingPool}
            onChange={handleAmenityChange}
          />
          Swimming Pool
        </label>

        <label>
          <input
            type="checkbox"
            name="parking"
            checked={formData.amenities.parking}
            onChange={handleAmenityChange}
          />
          Parking
        </label>

        <label>
          <input
            type="checkbox"
            name="wifi"
            checked={formData.amenities.wifi}
            onChange={handleAmenityChange}
          />
          WiFi
        </label>
      </fieldset>

      <button type="submit">Add Property</button>
    </form>
  );
}

export default AddPropertyForm;
