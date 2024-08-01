import React from "react";
import { useState, useEffect } from "react";

function OnYourMind() {
  const [data, setData] = useState([]);
  const [value, setValue] = useState(0);

  async function fetchData() {
    const data = await fetch(
      `${
        import.meta.env.VITE_BASE_URL
      }/restaurants/list/v5?lat=19.07480&lng=72.88560&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`
    );

    const result = await data.json();

    setData(result.data.cards[0].card.card?.imageGridCards?.info);
  }
  useEffect(() => {
    fetchData();
    //
  }, []);

  function handlePrev() {
    value <= 0 ? "" : setValue((prev) => prev - 133);
  }
  function handleNext() {
    value >= 660 ? "" : setValue((prev) => prev + 133);
  }
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-3xl mt-3">What's on your mind?</h1>
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
              (value >= 660 ? "bg-gray-100 text-gray-300" : "bg-gray-300")
            }
          ></i>
        </div>
      </div>

      <div
        style={{ transform: `translateX(-${value}%)` }}
        className={`w-[40%] h-72 flex items-center justify-between gap-12 duration-700`}
      >
        {data?.map((item, i) => (
          <img
            className="w-40 cursor-pointer"
            key={i}
            src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/${item.imageId}`}
          />
        ))}
      </div>

      <hr />
    </div>
  );
}

export default OnYourMind;
