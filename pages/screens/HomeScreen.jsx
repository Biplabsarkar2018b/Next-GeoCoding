import React, { useState } from "react";
import axios from "axios";

const HomeScreen = () => {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("India");
  const [error, setError] = useState("");
  const [data, setData] = useState(null);
  const header = {
    "X-Api-Key": "X4e3pjUrUbjg1QqWzGIeTw==o21cSWFtdu6hy3vi",
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform validation
    if (!city.trim()) {
      setError("City name is required.");
      return;
    }

    // You can now send the data to the API here
    axios
      .get(
        `https://api.api-ninjas.com/v1/geocoding?city=${city}&country=India`,
        {
          headers: header,
        }
      )
      .then((response) => {
        setData(response.data?.[0]);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
    // Reset the error message and clear the form
    setError("");
    setCity("");
    setCountry("India");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="city"
          >
            City Name
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="city"
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="country"
          >
            Country Name
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="country"
            type="text"
            placeholder="Enter country name"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>
        {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
        <div className="flex items-center justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>

      {data && (
        <div>
          <div>Name : {data.name}</div>
          <div>Longitude : {data.longitude}</div>
          <div>Latitude : {data.latitude}</div>
          <div>State : {data.state}</div>
        </div>
      )}
    </div>
  );
};

export default HomeScreen;
