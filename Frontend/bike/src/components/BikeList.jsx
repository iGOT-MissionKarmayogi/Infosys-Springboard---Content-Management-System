import React from "react";
import { Link } from "react-router-dom";

const BikeList = ({ bike }) => {
  return (
    <>
      <div className="max-w-sm bg-slate-50 text-white rounded-lg shadow-lg overflow-hidden mb-3 inline-block mx-14">
        <div className="w-auto h-48 bg-gray-200">
          <img
            src={bike.image}
            className="w-full h-full object-contain"
            alt={bike.name}
          />
        </div>
        {/* <img
          className="lg:h-48 md:h-36 w-full object-cover object-center"
          src={bike.image}
          alt="blog"
        ></img> */}
        <div className="p-4">
          <h2 className="tracking-widest text-xs title-font font-medium text-gray-500 mb-1">
            {bike.category}
          </h2>
          <h5 className="text-xl text-gray-900 font-semibold mb-2">
            {bike.name}
          </h5>
          <p className="text-sm text-gray-700 mb-4">
            {bike.description.slice(0, 90) + "..."}
          </p>
          <Link
            to={`/bikedetail/${bike.id}`}
            className="inline-block px-4 py-2 bg-blue-500 text-white font-medium text-sm rounded hover:bg-gray-400"
          >
            More detail
          </Link>
        </div>
      </div>
    </>
  );
};

export default BikeList;
