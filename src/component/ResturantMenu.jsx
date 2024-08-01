import { info } from "autoprefixer";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
// import { Coordinates, CartContext } from "../context/contextApi";
// import { useContext } from "react";
import { useSelector } from "react-redux";
import { addToCart } from "../utils/cartSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { clearCart } from "../utils/cartSlice";
import { MenuShimmer } from "./Shimmer";

function ResturantMenu() {
  const { id } = useParams();

  const [resInfo, setResInfo] = useState([]);
  const [menuData, setmenuData] = useState([]);
  const [topPicks, setTopPicks] = useState(null);

  const [discountData, setDiscountData] = useState([]);
  const [value, setValue] = useState(0);
  const [Topvalue, setTopValue] = useState(0);

  // const {
  //   coord: { lat, lng },
  // } = useContext(Coordinates);
  const lat = useSelector((state) => state.coordinatesSlice.lat);
  const lng = useSelector((state) => state.coordinatesSlice.lng);

  async function fetchMenu() {
    let data = await fetch(
      `${import.meta.env.VITE_BASE_URL}/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${lng}&restaurantId=${id
        .split("-")
        .at(-1)}&catalog_qa=undefined&submitAction=ENTER`
    );
    let res = await data.json();
    console.log(res);

    const resInfo = res?.data?.cards.find((data) =>
          data?.card?.card?.["@type"].includes("food.v2.Restaurant")
        )?.card?.card?.info;
         setResInfo(resInfo);

    let actualMenu = res?.data?.cards
      .find((data) => data?.groupedCard)
      ?.groupedCard?.cardGroupMap?.REGULAR?.cards?.filter(
        (data) => data?.card?.card?.itemCards || data?.card?.card?.categories
      );

    setmenuData(actualMenu);
    setTopPicks(
      actualMenu?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
        (data) => data.card.card.title == "Top Picks"
      )[0]
    );

    setDiscountData(
      res?.data?.cards[3]?.card?.card?.gridElements.infoWithStyle.offers
    );
  }

  useEffect(() => {
    fetchMenu();
  }, []);

  function handlePrev() {
    value <= 0 ? "" : setValue((prev) => prev - 115);
  }
  function handleNext() {
    value >= 200 ? "" : setValue((prev) => prev + 115);
  }

  function handlePrevTop() {
    Topvalue <= 0 ? "" : setTopValue((prev) => prev - 115);
  }

  function handleNextTop() {
    Topvalue >= 200 ? "" : setTopValue((prev) => prev + 115);
  }

  return (
    <div className="w-full pt-24 m-0 h-full overflow-hidden ">
      {
        menuData.length ? (
          <div className="w-[95%] sm:w-[90%] md:w-[80%] lg:w-[70%] h-full  mx-auto pt-5 overflow-hidden">
        <div>
          <p className="text-xs">
            <Link to="/">
              <span className="text-gray-500 hover:text-black  cursor-pointer">
                Home
              </span>
            </Link>{" "}
            /
            <Link to="/">
              {" "}
              <span className="text-gray-500 hover:text-black cursor-pointer">
                {resInfo?.city}
              </span>
            </Link>
            /<span>{resInfo?.name}</span>
          </p>

          <h1 className="font-bold pt-6 text-2xl ml-3">{resInfo?.name}</h1>
          <div className="w-full h-full bg-gradient-to-t from-slate-200/70 mt-3 rounded-[30px] p-5">
            <div className="w-full h-full border border-slate-200 bg-white rounded-[30px] ">
              <div className="flex items-center  gap-1 font-semibold p-3">
                <i className="fa-solid fa-star p-1 bg-green-700 text-white border rounded-full w-9 h-9 text-center text-xl mt-1"></i>
                <span className=" text-xl mt-1">{resInfo?.avgRating}</span>
                <span className=" text-xl mt-1">
                  ({resInfo?.totalRatingsString})
                </span>
                .
                <span className=" text-xl mt-1">
                  {resInfo?.costForTwoMessage}
                </span>
              </div>
              <p className="underline text-orange-500 font-semibold pl-5">
                {resInfo?.cuisines?.join(", ")}
              </p>

              <div className="my-4 flex gap-3 pl-5">
                <div className="w-2 flex flex-col justify-center items-center">
                  <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                  <div className="w-[1px] h-6 bg-gray-300 "></div>
                  <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                </div>

                <div className="flex flex-col gap-2 justify-center items-start">
                  <div className="flex gap-3">
                    <p className="font-semibold mb-1">Outlet</p>
                    <p className="text-gray-500 text-sm ">
                      {resInfo?.areaName}
                    </p>
                  </div>
                  <p className="text-black text-sm font-semibold  ">
                    {resInfo?.sla?.slaString?.toLowerCase()}
                  </p>
                </div>
              </div>

              <hr />
              <div className="pl-5 pt-2 flex items-center text-gray-500 gap-2">
                <i className="fa-solid fa-person-biking text-xl"></i>
                <p>
                  {resInfo?.feeDetails?.message?.slice(3, 10)} |
                  {resInfo?.feeDetails?.message?.slice(16, 45)}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="my-8 w-full flex flex-col overflow-hidden">
          <div className=" flex justify-between items-center w-full">
            <div className="font-bold text-2xl ">Deals for you</div>
            <div className="gap-3 flex ">
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
                  (value >= 200 ? "bg-gray-100 text-gray-300" : "bg-gray-300")
                }
              ></i>
            </div>
          </div>

          <div className="mt-8 flex gap-3 w-full overflow-hidden ">
            {discountData.map((item, i) => (
              <div
                key={i}
                style={{ transform: `translateX(-${value}%)` }}
                className="min-w-72 h-full bg-white border rounded-2xl p-4 flex items-center duration-500"
              >
                <div className="flex w-[25%] ">
                  <img
                    className="w-12 h-12"
                    src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_96,h_96/${item.info.offerLogo}`}
                  />
                </div>
                <div>
                  <h1 className="font-bold">{item.info.header}</h1>

                  <h1 className="font-semibold text-gray-400">
                    {item.info.couponCode
                      ? `${item.info.couponCode}`
                      : `${item.info.expiryTime}`}
                  </h1>
                </div>
              </div>
            ))}
          </div>
        </div>

        <h2 className="text-center mt-5 leading-5">MENU</h2>

        {/* menu part */}

        <div className="w-full">
          <div className="w-full p-3 font-semibold text-xl bg-slate-200 text-center  mt-5 border rounded-2xl text-black/65 flex items-center justify-between cursor-pointer">
            <p className="text-center w-full">Search for dishes</p>
            <p className="">
              <i className="fa-solid fa-magnifying-glass"></i>
            </p>
          </div>

          {/* toppicks */}

          {topPicks && (
            <div className="my-8 w-full flex flex-col overflow-hidden">
              <div className=" flex justify-between items-center w-full">
                <div className="font-bold text-2xl ">
                  {topPicks.card.card.title}
                </div>
                <div className="gap-3 flex ">
                  <i
                    onClick={handlePrevTop}
                    className={
                      `fa-solid fa-arrow-left  p-2 rounded-full w-9 h-9 flex items-center justify-center cursor-pointer ` +
                      (Topvalue <= 0
                        ? "bg-gray-100 text-gray-300"
                        : "bg-gray-300")
                    }
                  ></i>
                  <i
                    onClick={handleNextTop}
                    className={
                      `fa-solid fa-arrow-right  p-2 rounded-full w-9 h-9 flex items-center justify-center cursor-pointer ` +
                      (Topvalue >= 200
                        ? "bg-gray-100 text-gray-300"
                        : "bg-gray-300")
                    }
                  ></i>
                </div>
              </div>

              <div className="mt-8 flex gap-3 w-full overflow-hidden ">
                {topPicks.card.card.carousel.map(
                  (
                    {
                      creativeId,
                      dish: {
                        info: { defaultPrice, price },
                      },
                    },
                    i
                  ) => (
                    <div
                      key={i}
                      style={{ transform: `translateX(-${Topvalue}%)` }}
                      className="min-w-72 relative h-full bg-white border rounded-2xl  flex items-center duration-500"
                    >
                      <img
                        src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_292,h_300/${creativeId}`}
                        alt=""
                      />

                      <p className="absolute bottom-9 text-white left-5">
                        ₹{defaultPrice / 100 || price / 100}
                      </p>
                      <button className="bg-white text-green-500 border px-14 py-2 rounded-2xl font-bold absolute bottom-[12px] right-6 hover:bg-slate-200 duration-300 drop-shadow">
                        ADD
                      </button>
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          <div  className="flex flex-col gap-3 mt-5">
            {menuData?.map(({ card: { card } }) => (
              <>
                <MenuCard card={card} resInfo={resInfo} />
              </>
            ))}
          </div>
        </div>
      </div>
        ): <MenuShimmer/>
      }
      
    </div>
  );
}

function MenuCard({ card, resInfo }) {
  let hello = false;
  if (card["@type"]) {
    hello = true;
  }

  const [isOpen, setIsOpen] = useState(hello);
  function toggleFun() {
    setIsOpen((prev) => !prev);
  }

  if (card.itemCards) {
    const { itemCards, title } = card;
    return (
      <>
        <div className="m-7">
          <div className="flex justify-between cursor-pointer">
            <h1 className={"font-bold text-" + (card["@type"] ? "xl" : "")}>
              {title} ({itemCards.length})
            </h1>

            <p>
              <i
                onClick={() => toggleFun()}
                className={
                  isOpen ? "fa-solid fa-arrow-up" : "fa-solid fa-arrow-down"
                }
              ></i>
            </p>
          </div>
          {isOpen && (
            <DetailMenu itemCards={itemCards} card={card} resInfo={resInfo} />
          )}
        </div>

        <hr className={"my-4 border-" + (card["@type"] ? "[10px]" : "[4px]")} />
      </>
    );
  } else {
    const { title, categories } = card;
    return (
      <div>
        <h1 className="font-bold text-xl">{title}</h1>
        {categories.map((data) => (
          <MenuCard card={data} resInfo={resInfo} />
        ))}
      </div>
    );
  }
}

function DetailMenu({ itemCards, card, resInfo }) {
  return (
    <div className="my-5">
      {itemCards.map(({ card: { info } }) => (
        <DetailMenuCard key={info.id} info={info} resInfo={resInfo} />
      ))}
    </div>
  );
}

function DetailMenuCard({ info, resInfo }, index) {
  const {
    name,
    defaultPrice,
    price,
    itemAttribute: { vegClassifier },
    ratings: {
      aggregatedRating: { rating, ratingCountV2 },
    },
    description,
    imageId,
  } = info;
  const [isMore, setIsMore] = useState(false);
  // const { cartData, setCartData } = useContext(CartContext);
  const cartData = useSelector((state) => state.cartSlice.cartData);
  const [isDiffRes, setIsDiffRes] = useState(false);
  const isLast = index === DetailMenuCard.length - 1;
  const getResInfoFromLocalStorage = useSelector(
    (state) => state.cartSlice.resInfo
  );
  const dispatch = useDispatch();
  function handleCart() {
    const isAdded = cartData.find((data) => data.id === info.id);

    // let getResInfoFromLocalStorage =
    //   JSON.parse(localStorage.getItem("resInfo")) || [];
    if (!isAdded) {
      if (
        getResInfoFromLocalStorage.name === resInfo.name ||
        getResInfoFromLocalStorage.length === 0
      ) {
        toast.success("food added to cart");
        dispatch(addToCart({ info, resInfo }));
      } else {
        // toast.error("differnt resturant item");
        setIsDiffRes((prev) => !prev);
      }
    } else {
      toast.error("already added");
    }
  }

  function handleIsDiffRes() {
    setIsDiffRes((prev) => !prev);
  }
  function handleClearCart() {
    dispatch(clearCart());
    toast.success("Cart is cleared");
    handleIsDiffRes();
  }
  return (
    <div className="relative w-full">
      <div
        key={name}
        className="flex justify-between items-center gap-6 my-6 w-full   "
      >
        <div className="w-[40%] md:w-[70%]">
          {vegClassifier === "VEG" ? (
            <img
              className="w-6 rounded-sm"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQh71sfIQVPk_TuhnuWB0Q1E6FlciHqRH-wRA&s"
              alt=""
            />
          ) : (
            <img
              className="w-7  rounded-sm"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjW1N2f0FYSE0u1eRUwIaV8WeXlshiIJZzBw&s"
              alt=""
            />
          )}
          <h1 className="font-bold text-xl">{name}</h1>
          <p className="font-semibold">
            {defaultPrice
              ? "₹" + defaultPrice / 100
              : "" || price
              ? "₹" + price / 100
              : ""}
          </p>

          {rating ? (
            <p>
              <span
                className={
                  (rating >= 3.0 ? "text-green-500" : "text-yellow-500") +
                  " font-semibold"
                }
              >
                <i className="fa-solid fa-star "></i>
                <span> {rating}</span>
              </span>

              <span>({ratingCountV2})</span>
            </p>
          ) : (
            " "
          )}
          <div>
            <p
              className={
                "line-clamp-2 mt-2" + (isMore ? " line-clamp-none " : "")
              }
            >
              {description}
            </p>
            <button
              onClick={() => setIsMore((prev) => !prev)}
              className="font-bold opacity-60"
            >
              {description ? (isMore ? "less" : "more") : " "}
            </button>
          </div>
        </div>
        <div className="w-[40%] md:w-[20%] relative">
          <img
            className="rounded-xl h-40 w-full object-cover"
            src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${imageId}`}
            alt=""
          />
          <div className="flex justify-center w-full">
            <button
              onClick={handleCart}
              className="bg-white text-green-500 border px-9 py-2 rounded-2xl font-bold absolute bottom-[-15px]  hover:bg-slate-200 duration-300 drop-shadow"
            >
              ADD
            </button>
          </div>
        </div>
      </div>
      {!isLast && <hr className="my-5" />}
      {isDiffRes && (
        <div className="max-w-[620px] md:w-[700px] flex flex-col gap-5 mx-auto md:left-[30%] left-1  min-h-[204px] shadow-xl fixed bottom-10 p-5 bg-white  z-40 ">
          <h1 className="font-semibold">Items already in Cart</h1>
          <p>
            Your cart contains items from different resturant. Would you like to
            reset your cart for adding items from this resturant ?
          </p>
          <div className="flex  w-full justify-between">
            <button
              onClick={handleIsDiffRes}
              className="border-2 px-4 py-2 w-[45%]  border-green-600 text-green-600"
            >
              NO
            </button>

            <button
              onClick={handleClearCart}
              className="border-2 px-4 py-2 w-[45%] border-green-600 text-white bg-green-600"
            >
              YES,START AFRESH
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ResturantMenu;
