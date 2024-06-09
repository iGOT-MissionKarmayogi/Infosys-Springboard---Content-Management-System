import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import BikeList from "./BikeList";

const BikeBoard = ({ type }) => {
  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBikes = async () => {
      try {
        // const res = await fetch("http://127.0.0.1:5000/bikesinfo");
        const res = await fetch(`http://127.0.0.1:5000/${type}`);
        const data = await res.json();
        setBikes(data);
      } catch (error) {
        console.log("Error occurred: ", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBikes();

    // Connect to the WebSocket server
    const socket = io("http://127.0.0.1:5000");

    socket.on("connect", () => {
      console.log("Connected to WebSocket server");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from WebSocket server");
    });

    // Listen for updates from the server
    socket.on("update_data", (message) => {
      console.log("Received update: ", message);
      fetchBikes(); // Re-fetch the bike data when an update is received
    });

    // Clean up the socket connection when the component unmounts
    // return () => {
    //   socket.disconnect();
    // };
  }, []);

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {bikes.map((bike) => (
            <BikeList key={bike.id} bike={bike} />
          ))}
        </div>
      )}
      {error && <p>Failed to fetch API</p>}
    </>
  );
};

export default BikeBoard;
