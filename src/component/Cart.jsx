import React from "react";
import { useContext, useState } from "react";
import { CartContext } from "../context/contextApi";
import { Link, useNavigate } from "react-router-dom";
import { parse } from "postcss";
import { useSelector } from "react-redux";
import { clearCart, deleteItem } from "../utils/cartSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { toogleLogin } from "../utils/toogleSlice";

export function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { cartData, setCartData } = useContext(CartContext);
  let totalPrice = 0;

  const cartData = useSelector((state) => state.cartSlice.cartData);
  const resInfo = useSelector((state) => state.cartSlice.resInfo);
  const userData = useSelector((state) => state.authSlice.userData);


  for (let i = 0; i < cartData.length; i++) {
    totalPrice =
      totalPrice + cartData[i].price / 100 || cartData[i].defaultPrice / 100;
  }
  function handleClearCart() {
    // setCartData([]);
    // localStorage.clear();
    dispatch(clearCart());
    toast.success("Cart is cleared");
  }

  function handleCartRemove(index) {
    if (cartData.length > 1) {
      let newArr = [...cartData];

      newArr.splice(index, 1);
      localStorage.setItem("cartData", JSON.stringify(newArr));
      // setCartData(newArr);
      dispatch(deleteItem(newArr));
      toast.success("Item removed from cart");
    } else {
      handleClearCart();
    }
  }

  function handlePlaceOrder() {
    if (userData) {
      toast.success("Order placed successfully");
    } else {
      toast.error("Please login to place order");
      dispatch(toogleLogin());
      return;
    }
  }

  return (
    <div className="pt-24 w-full ">
      <div className="w-[95%] sm:w-[90%] md:w-[80%] lg:w-[70%]  mx-auto  flex flex-col">
        {cartData.length === 0 && (
          <div className="flex flex-col items-center cursor-default ">
            <img
              className="w-96 my-8"
              src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/2xempty_cart_yfxml0"
            />
            <h1 className="font-bold text-2xl cursor-text ">
              Your cart is empty
            </h1>
            <p className="my-1 cursor-text opacity-60">
              You can go to home page to view more restaurants
            </p>
            <Link to="/">
              <h1 className="text-white cursor-pointer my-3 text-xl font-semibold bg-orange-500 px-4 py-2 hover:shadow-md ">
                SEE RESTURANTS NEAR YOU
              </h1>
            </Link>
          </div>
        )}

        <Link to={`/resturant/${resInfo.id}`}>
          {cartData.length >= 1 && (
            <div className="flex gap-5 mt-8">
              <img
                className="rounded-xl w-40 aspect-square"
                src={
                  "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/" +
                  resInfo.cloudinaryImageId
                }
                alt=""
              />
              <div>
                <p className="text-5xl border-b-2 border-black pb-3">
                  {resInfo.name}
                </p>
                <p className="mt-3 text-xl">{resInfo.areaName}</p>
              </div>
            </div>
          )}
        </Link>

        <hr className="my-5 " />

        {cartData.map(
          (
            {
              name,
              imageId,
              price,
              defaultPrice,
              description,
              ratings: {
                aggregatedRating: { rating, ratingCountV2 },
              },
            },
            index
          ) => {
            // const [isMore, setIsMore] = useState(false);
            return (
              <div key={name} className="flex justify-between w-[90%] my-3 p-3">
                <div className="w-[30%]">
                  <img
                    className="rounded-xl h-28 md:h-40 w-28 md:w-40 object-cover"
                    src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${imageId}`}
                    alt=""
                  />
                  <button
                    onClick={() => handleCartRemove(index)}
                    className="bg-white w-26 md:w-32 text-red-500 border px-3 md:px-9 py-2 rounded-2xl font-bold my-2  hover:bg-slate-200 duration-300 drop-shadow"
                  >
                    REMOVE
                  </button>
                </div>
                <div className="w-[60%] md:w-[60%]">
                  <h1 className="font-bold">{name}</h1>
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
                          (rating >= 3.0
                            ? "text-green-500"
                            : "text-yellow-500") + " font-semibold"
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
                  <p className="line-clamp-2 md:line-clamp-4">{description}</p>
                </div>
              </div>
            );
          }
        )}

        {cartData.length > 0 && (
          <div className="flex flex-col w-full gap-4">
            <h1>Total:₹{totalPrice}</h1>
            <div className="flex justify-between mx-5 ">
              <button
                onClick={handlePlaceOrder}
                className="text-white cursor-pointer my-3 text-xl font-semibold bg-green-500 px-4 py-2 rounded-2xl hover:shadow-md hover:rounded-none"
              >
                Place order
              </button>
              <button
                onClick={handleClearCart}
                className="text-white cursor-pointer my-3 text-xl font-semibold rounded-2xl bg-red-500 px-4 py-2 hover:shadow-md hover:rounded-none"
              >
                clear cart
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
