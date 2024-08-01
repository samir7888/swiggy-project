import React from "react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setFilterValue } from "../utils/filterSlice";

function OnlineFood({ data, title }) {
  const filterOptions = [
    {
      filterName: "Ratings 4.0+",
    },
    {
      filterName: "offers",
    },
    {
      filterName: "Rs 300-Rs 600",
    },
    {
      filterName: "Less than Rs 300",
    },
  ];
  const [active, setActive] = useState(null);
  const dispatch = useDispatch();
  function handleFilterBtn(filterName) {
    setActive(active === filterName ? null : filterName);
  }
  dispatch(setFilterValue(active));
  return (
    <div className="h-fit w-full ">
      <h1 className="font-bold text-3xl mt-5 mb-9">{title}</h1>
      <div className="my-7 flex flex-wrap gap-3">
        {filterOptions.map((data, i) => (
          <div key={i}
            onClick={() => handleFilterBtn(data.filterName)}
            className="flex gap-2"
          >
            <button
              className={
                "filterBtn " + (active === data.filterName ? "bg-gray-300" : "")
              }
            >
              {data.filterName}

              <span
                className={
                  "ml-2 " + (active === data.filterName ? " " : "hidden")
                }
              >
                <i className="fa-solid fa-x"></i>
              </span>
            </button>
          </div>
        ))}
      </div>

      <div
        className={`w-full min-h-[300px] grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-2 gap-4`}
      >
        {data.map((item, i) => (
          <Link key={i} to={`/resturant/${item.cta.link.split("/")[4]}`}>
            <div className="w-full  hover:scale-95 duration-300 relative  ">
              <img
                className="w-full object-cover border rounded-2xl  h-40 cursor-pointer"
                key={i}
                src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${item.info.cloudinaryImageId}`}
              />
              <div className="bg-gradient-to-t from-black to-transparent to-40% w-full border rounded-2xl h-40 absolute top-0 left-0"></div>
              {item?.info?.aggregatedDiscountInfoV3?.header ? (
                <p className="absolute bottom-36 left-6 text-lg text-white font-extrabold">
                  {item?.info?.aggregatedDiscountInfoV3?.header +
                    " " +
                    item?.info?.aggregatedDiscountInfoV3?.subHeader}
                </p>
              ) : (
                ""
              )}

              <div className="p-1">
                <h1 className="font-semibold text-md mt-2 truncate">
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
    </div>
  );
}

export default OnlineFood;
