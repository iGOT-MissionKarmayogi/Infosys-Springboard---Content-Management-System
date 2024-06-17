import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BikeDetailPage from "../pages/BikeDetailPage";
import io from "socket.io-client";

const BikeDetails = () => {
  const [bike, setBike] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchBikes = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:5000/bikesinfo/${id}`);
        const data = await res.json();
        // console.log("Fetched bike data:", data);
        setBike(data[0]);
      } catch (error) {
        console.log("Error occurred:", error);
      }
    };
    fetchBikes();

    const socket = io("http://127.0.0.1:5000");

    socket.on("connect", () => {
      console.log("Connected to WebSocket server");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from WebSocket server");
    });

    socket.on("update_data", (message) => {
      console.log("Received update: ", message);
      fetchBikes(); // Re-fetch the bike data when an update is received
    });

    socket.on("update_data", (message) => {
      console.log("Received update: ", message);
      fetchBikes(); // Re-fetch the bike data when an update is received
    });
  }, [id]); // Dependency array includes id
  // console.log(bike);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  if (!bike) {
    return <div>No bike data found.</div>;
  }

  return <BikeDetailPage bikedetail={bike} />;
};

export default BikeDetails;
