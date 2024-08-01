import { Link, Outlet } from "react-router-dom";
import {  useState } from "react";
// import { CartContext, Coordinates, Visibilty } from "../context/contextApi";
import { useSelector } from "react-redux";
import { searchToogleBar, toogleLogin } from "../utils/toogleSlice";
import { useDispatch } from "react-redux";
import { setCoord } from "../utils/coordinatesSlice";
import SignInBtn from "./SignInBtn";

function Head() {
  const [searchResult, setSearchResult] = useState([]);

  //accesing data from redux
  const visible = useSelector((state) => state.toogleSlice.searchToogle);
  const loginVisible = useSelector((state) => state.toogleSlice.loginToogle);

  const dispatch = useDispatch();

  // const { cartData, setCartData } = useContext(CartContext);
  const cartData = useSelector((state) => state.cartSlice.cartData);
  const userData = useSelector((state) => state.authSlice.userData);
  // const { setCoord } = useContext(Coordinates);
  const [address, setAddress] = useState("");
  function handleVisibility() {
    dispatch(searchToogleBar());
  }
  function handleLogin() {
    dispatch(toogleLogin());
  }

  async function searchResultFun(val) {
    if (val == "") return;
    const res = await fetch(
      `https://www.swiggy.com/dapi/misc/place-autocomplete?input=${val}`
    );
    const data = await res.json();

    setSearchResult(data.data);
  }
  async function fetchLatAndLng(id) {
    if (id == "") return;
    handleVisibility();

    const res = await fetch(
      `https://www.swiggy.com/dapi/misc/address-recommend?place_id=${id}`
    );
    const data = await res.json();
    dispatch(setCoord(data));
    // setCoord({
    //   lat: data.data[0].geometry.location.lat,
    //   lng: data.data[0].geometry.location.lng,
    // });
    setAddress(data.data[0].formatted_address);
  }

  return (
    <>
      <div className="">
        <div
          onClick={handleVisibility}
          className={
            "w-full h-full bg-black/40 absolute  z-40  " +
            (visible ? "visible " : "invisible ")
          }
        ></div>

        <div
          className={
            "bg-white w-2/3 md:w-1/3 h-full absolute z-40 flex  justify-center duration-500 " +
            (visible ? "left-0 z-50" : "-left-[100%]")
          }
        >
          <div className="w-3/4">
            <p className="cursor-pointer p-4" onClick={handleVisibility}>
              X
            </p>
            <input
              onChange={(e) => searchResultFun(e.target.value)}
              className="border p-3 w-[100%] focus:outline-none focus:shadow-lg"
              type="text"
              placeholder="Search for area,street name.."
            />
            <div className="my-9 gap-7 flex flex-col">
              <ul className="">
                {searchResult.map(
                  (
                    {
                      structured_formatting: { main_text, secondary_text },
                      place_id,
                    },
                    index
                  ) => {
                    const isLast = index === searchResult.length - 1;
                    return (
                      <div key={index} className="w-full flex gap-2 ">
                        <div>
                          <i className="fa-solid fa-location-dot mt-2"></i>
                        </div>
                        <div className="w-full">
                          <li
                            onClick={() => fetchLatAndLng(place_id)}
                            className="font-semibold m-1"
                          >
                            {main_text}
                          </li>
                          <li className="p-1 text-[12px] text-black/45">
                            {secondary_text}
                          </li>
                          {!isLast && (
                            <hr className="w-full border-dotted my-6 border-black" />
                          )}
                        </div>
                      </div>
                    );
                  }
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="">
        <div
          onClick={handleLogin}
          className={
            "w-full h-full bg-black/40 absolute  z-50  " +
            (loginVisible ? "visible " : "invisible ")
          }
        ></div>

        <div
          className={
            "bg-white w-2/3 md:w-1/3 h-full fixed z-40 flex  justify-center duration-500 " +
            (loginVisible ? "right-0 z-50" : "-right-[100%]")
          }
        >
          <div className="w-full p-6">
            <h1 className="cursor-pointer p-2 text-2xl" onClick={handleLogin}>
              X
            </h1>
            <div className="flex justify-between my-1">
              <h1 className="text-2xl mt-3 font-semibold">Login</h1>

              <img
                className="w-28"
                src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/Image-login_btpq7r"
                alt=""
              ></img>
            </div>
            <SignInBtn />

            <p className="text-sm mt-2">
              By clicking on Login with GOOGLE, I accept the{" "}
              <span className="font-semibold">
                Terms & Conditions & Privacy Policy
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="relative">
        <div
          className={
            "w-full shadow-md h-24 flex justify-center items-center fixed " +
            (loginVisible || visible ? " z-40 " : " z-[1000] top-0 bg-white")
          }
        >
          <div className="w-full  md:w-[95%] flex items-center justify-between">
            <div className="flex items-center ">
              <Link to="/">
                <div className="w-20">
                  <img
                    className=" md:mr-8 cursor-pointer"
                    src="https://alllogo.info/wp-content/uploads/2022/06/unnamed-2-1.png"
                    alt=""
                  />
                </div>
              </Link>
              <div className="flex items-center" onClick={handleVisibility}>
                <p className="font-bold border-b-2 border-black hover:border-orange-500 hover:text-orange-500 cursor-pointer">
                  Other
                </p>
                <p className="line-clamp-1 max-w-[240px] text-center mx-1 opacity-75  text-sm ">
                  {address}
                </p>
                <i className="fa-solid text-orange-400  fa-caret-down ml-4 pr-2"></i>
              </div>
            </div>
            <div className="md:flex hidden w-full md:w-[40%] items-center justify-between font-semibold text-sm opacity-80">
              <Link to={"/search"}>
                <p className="hover:text-orange-500 cursor-pointer">
                  <i className="fa-solid fa-magnifying-glass mr-4"></i>
                  Search
                </p>
              </Link>

              <Link to={"/cart"}>
                <p className="hover:text-orange-500 cursor-pointer">
                  <i className="fa-solid fa-cart-shopping mr-4">
                    {cartData.length > 0 && (
                      <span className="ml-1 text-green-500 font-bold text-2xl">
                        {cartData.length}
                      </span>
                    )}
                  </i>
                  Cart
                </p>
              </Link>
              <div onClick={handleLogin}>
                <p className="hover:text-orange-500 cursor-pointer flex items-center gap-2">
                  {userData ? (
                    <>
                      <img
                        className="w-10 border rounded-full"
                        src={userData?.photo}
                        alt=""
                      ></img>
                      <p> {userData?.name}</p>
                    </>
                  ) : (
                    <>
                      <i className="fa-regular fa-user mr-4"></i>
                      Sign In
                    </>
                  )}
                </p>
              </div>
            </div>

            {/* icon responsive garako */}

            <div className="gap-2 sm:gap-6 w-2/4 flex items-center md:hidden justify-end">
              <i className="fa-solid fa-magnifying-glass mr-4"></i>

              <Link to={"/cart"}>
                <div className="flex flex-col-reverse items-center relative">
                  <i className="fa-solid fa-cart-shopping mr-1"></i>
                  {cartData.length > 0 && (
                    <span className="absolute bottom-3 text-green-500 font-bold mr-1 text-xl">
                      {cartData.length}
                    </span>
                  )}
                </div>
              </Link>

              <div onClick={handleLogin}>
                <p className="hover:text-orange-500 cursor-pointer flex items-center gap-2">
                  {userData ? (
                    <>
                      <img
                        className="w-10 border rounded-full"
                        src={userData?.photo}
                        alt=""
                      ></img>
                    </>
                  ) : (
                    <>
                      <i className="fa-regular fa-user mr-4"></i>
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
        <Outlet />
      </div>
    </>
  );
}

export default Head;
