import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function TopResturant({ data, title }) {
  const [value, setValue] = useState(0);

  function handlePrev() {
    value <= 0 ? "" : setValue((prev) => prev - 150);
  }
  function handleNext() {
    value >= 1200 ? "" : setValue((prev) => prev + 150);
  }

  return (
    <>
      <div className="h-[550px] w-full">
        <div className="h-32 w-full flex items-center justify-between">
          <h1 className="font-bold text-3xl mt-9">{title}</h1>
          <div className="gap-3 flex">
            <i
              onClick={handlePrev}
              className={
                `fa-solid fa-arrow-left  p-2 rounded-full w-9 h-9 flex items-center justify-center cursor-pointer ` +
                (value <= 0 ? "bg-gray-100 text-gray-300" : "bg-gray-300")
              }
            ></i>
            <i
              onClick={handleNext}
              className={
                `fa-solid fa-arrow-right  p-2 rounded-full w-9 h-9 flex items-center justify-center cursor-pointer ` +
                (value >= 1200 ? "bg-gray-100 text-gray-300" : "bg-gray-300")
              }
            ></i>
          </div>
        </div>

        <div
          style={{ transform: `translateX(-${value}%)` }}
          className={`w-[40%] min-h-[300px] flex items-center justify-between gap-10 duration-700 `}
        >
          {data.map((item, i) => (
            <Link key={i} to={`/resturant/${item.cta.link.split("/")[4]}`}>
              <div className="w-72 hover:scale-95 duration-300 relative">
                <img
                  className="min-w-72 object-cover border rounded-2xl  h-52 cursor-pointer"
                  key={i}
                  src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${item.info.cloudinaryImageId}`}
                />
                <div className="bg-gradient-to-t from-black to-transparent to-40% min-w-72 border rounded-2xl h-52 absolute top-0 left-0"></div>
                <p className="absolute bottom-40 left-3 text-xl text-white font-extrabold">
                  {item.info.aggregatedDiscountInfoV3?.header +
                    " " +
                    item.info.aggregatedDiscountInfoV3?.subHeader}
                </p>

                <div className="p-3">
                  <h1 className="font-bold text-xl mt-2 truncate">
                    {item.info.name}
                  </h1>
                  <div className="flex items-center gap-1 font-semibold">
                    <i className="fa-solid fa-star p-1 bg-green-700 text-white border rounded-full w-9 h-9 text-center text-xl mt-1"></i>
                    <p className=" text-xl mt-2">{item.info.avgRating}. </p>
                    <p className=" text-xl mt-2"> {item.info.sla.slaString}</p>
                  </div>

                  <div className="flex w-full items-center gap-2">
                    <p className="truncate text-lg text-gray-500">
                      {item.info.cuisines.join(", ")}
                    </p>
                  </div>
                  <p className="text-lg text-gray-500">{item.info.areaName}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="h-1 w-[105px] mb-11 bg-gray-200 mx-auto flex justify-start border rounded-lg">
          <div
            style={{ transform: `translateX(${value}%)` }}
            className="h-1 w-2 bg-red-500 border rounded-lg duration-700"
          ></div>
        </div>

        <hr />
      </div>
    </>
  );
}

export default TopResturant;
