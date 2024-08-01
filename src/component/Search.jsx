import React, { useEffect, useState } from "react";

export function Search() {
  const [searchQuery, setsearchQuery] = useState("");
  const filterOptions = ["Resturants", "Dishes"];
  const [active, setActive] = useState("Dishes");

  function handleFilterBtn(filterName) {
    setActive(active === filterName ? null : filterName);
    // console.log(active);
  }

  async function fetchDishes() {
    const res = await fetch(
      `https://www.swiggy.com/dapi/restaurants/search/v3?lat=28.7040592&lng=77.10249019999999&str=${searchQuery}&trackingId=4836a39e-ca12-654d-dc3b-2af9d645f8d7&submit Action=ENTER&queryUniqueId=7abdce29-5ac6-7673-9156-302260e032f0`
    );
    const data = await res.json();
    // console.log(data);
  }

  async function fetchResturantsData() {
    const res = await fetch(
      `https://www.swiggy.com/dapi/restaurants/search/v3?lat=28.7040592&lng=77.10249019999999&str=${searchQuery}&trackingId=4836a39e-ca12-654d-dc3b-2af9d645f8d7&submit Action=ENTER&queryUniqueId=7abdce29-5ac6-7673-9156-302260e032f0&selectedPLTab=RESTAURANT`
    );
    const data = await res.json();
    // console.log(data);
  }
  useEffect(() => {
    fetchDishes();
    fetchResturantsData();
  }, []);

  return (
    <div className="mt-32 w-full md:w-[800px] mx-auto">
      <input
        onChange={(e) => setsearchQuery(e.target.value)}
        className="border py-3 w-[100%] my-5 px-10 focus:outline-none focus:shadow-lg"
        type="text"
        placeholder="Search for food"
      />

      <div className="my-7 flex flex-wrap gap-3">
        {filterOptions.map((data, i) => (
          <div
            key={i}
            onClick={() => handleFilterBtn(data)}
            className="flex gap-2"
          >
            <button
              className={"filterBtn " + (active === data ? "bg-gray-300" : "")}
            >
              <p>{data}</p>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;
