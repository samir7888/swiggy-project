import React, { useContext, useEffect, useState } from "react";
import OnYourMind from "./OnYourMind";
import TopResturant from "./TopResturant";
import OnlineFood from "./OnlineFood";
import Shimmer from "./Shimmer";
// import { Coordinates } from "../context/contextApi";
import { useSelector } from "react-redux";

function Body() {
  const [topResturantData, setTopResturantData] = useState([]);
  const [topResTitle, setTopResTitle] = useState("");
  const [onlineTitle, setOnlineTitle] = useState("");
  const [OnYourMindData, setOnYourMindData] = useState([]);
  const [data, setData] = useState({});
  const lat = useSelector((state) => state.coordinatesSlice.lat);
  const lng = useSelector((state) => state.coordinatesSlice.lng);

  // const {
  //   coord: { lat, lng },
  // } = useContext(Coordinates);

  /**
   * Fetches data from the Swiggy API and updates the component's state
   * with the fetched data.
   *
   * @return {Promise<void>} - A Promise that resolves when the data is fetched
   * and the component's state is updated.
   */
  async function fetchData() {
    // Fetch data from Swiggy API
    const data = await fetch(
      `${import.meta.env.VITE_BASE_URL}/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`
    );

    // Parse the response as JSON
    const result = await data.json();

    // Update component's state with the fetched data

    // Update title of top restaurants section
    setTopResTitle(result.data.cards[1].card?.card?.header?.title);

    // Update title of online food section
    setOnlineTitle(result.data.cards[2].card?.card?.title);

    // Find the main data for top restaurants section
    // console.log(result);
    let mainData = result?.data?.cards.find(
      (data) => data?.card?.card?.id == "top_brands_for_you"
    )?.card?.card?.gridElements?.infoWithStyle?.restaurants;

    let mainData2 = result?.data?.cards.find(
      (data) => data?.card?.card?.id == "restaurant_grid_listing"
    )?.card?.card?.gridElements?.infoWithStyle?.restaurants;

    // Update component's state with the main data
    setTopResturantData(mainData || mainData2);

    // Find the data for "What's on your mind" section
    let data2 = result?.data?.cards.find(
      (data) => data?.card?.card?.id == "whats_on_your_mind"
    )?.card.card?.imageGridCards?.info;

    // Update component's state with the data
    setOnYourMindData(data2);

    // Update component's state with the entire data
    setData(result.data);
  }
  useEffect(() => {
    fetchData();
  }, [lat, lng]);

  const filterVal = useSelector((state) => state.filterSlice.filterVal);

  const filterData = topResturantData.filter((item) => {
    if (!filterVal) return true;

    switch (filterVal) {
      case "Ratings 4.0+":
        return item?.info?.avgRating > 4;
      case "Offers":
        return item?.info?.aggregatedDiscountInfoV3?.header
          ? item?.info?.aggregatedDiscountInfoV3?.header
          : true;
      case "Rs 300-Rs 600":
        return (
          item?.info?.costForTwo?.slice(1, 4) >= "300" &&
          item?.info?.costForTwo?.slice(1, 4) <= "600"
        );
      case "Less than Rs 300":
        return item?.info?.costForTwo?.slice(1, 4) < "300";

      default:
        return true;
    }
  });

  if (data.communication) {
    return (
      <div className="flex pt-24 flex-col items-center justify-center">
        <img
          className="w-52 my-14"
          src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_476,h_476/portal/m/location_unserviceable.png"
        ></img>
        <h1 className="text-2xl font-bold">Location Unserviceable</h1>
        <p className="text-center opacity-60">
          We don’t have any services here till now. Try <br /> changing
          location.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full  pt-24  m-0 overflow-hidden">
      {
        topResturantData.length ? (
          <div className="w-[95%]  md:w-[90%] lg:w-[80%]  mx-auto   overflow-hidden">
        
          {OnYourMindData ? (
            <>
              <OnYourMind data={OnYourMindData} />
              <TopResturant data={topResturantData} title={topResTitle} />
            </>
          ): ""}
  
          <OnlineFood
            data={filterVal ? filterData : topResturantData}
            title={onlineTitle}
          />
        </div>
        ):<Shimmer/>
      }
     
    </div>
  );
}

export default Body;
