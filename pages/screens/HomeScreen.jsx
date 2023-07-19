import React, { useState } from "react";
import axios from "axios";

const HomeScreen = () => {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("India");
  const [error, setError] = useState("");
  const [data, setData] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const header = {
    "X-Api-Key": "X4e3pjUrUbjg1QqWzGIeTw==o21cSWFtdu6hy3vi",
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setisLoading(true);

    // Perform validation
    if (!city.trim()) {
      setError("City name is required.");
      setisLoading(false);
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
        if (response.data?.length > 0) {
          setData(response.data[0]);
          setError("");
        } else {
          setError("Please enter a valid city name or country name.");
        }
      })
      .catch((err) => {
        setError(
          "An error occurred while fetching data. Please try again later."
        );
      })
      .finally(() => {
        setisLoading(false);
      });

    // Reset the form
    setCity("");
    setCountry("India");
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <form
        className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4"
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
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Submit"}
          </button>
        </div>
      </form>

      {data && (
        <div className="bg-white shadow-md rounded-lg p-8">
          <div className="text-lg font-bold mb-4">Data Details</div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-gray-700">Name:</div>
              <div className="font-bold">{data.name}</div>
            </div>
            <div>
              <div className="text-gray-700">State:</div>
              <div className="font-bold">{data.state}</div>
            </div>
            <div>
              <div className="text-gray-700">Longitude:</div>
              <div className="font-bold">{data.longitude}</div>
            </div>
            <div>
              <div className="text-gray-700">Latitude:</div>
              <div className="font-bold">{data.latitude}</div>
            </div>
          </div>
        </div>
      )}
      {data == null && (
        <div className="bg-white shadow-md rounded-lg p-8">
          <div>
            <div className="text-gray-700">
              Please enter a valid city and country
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeScreen;
