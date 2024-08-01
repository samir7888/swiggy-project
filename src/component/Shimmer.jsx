import React from "react";

function Shimmer() {
  return (
    <div className="h-full w-full">
      <div className="h-[340px] gap-5 w-full bg-slate-900 text-white flex flex-col justify-center items-center">
        <div className="relative flex items-start">
          <img
            src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/icecream_wwomsa"
            alt=""
            className="w-10 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 "
          />
          <span className="loader"></span>
        </div>
        <h1 className="text-2xl">Looking for great near you... </h1>
      </div>
      <div className="w-[70%] mx-auto py-6 flex flex-wrap gap-10">
        {Array(12)
          .fill("")
          .map((data) => (
            <div
              key={data}
              className="bg-slate-300 animate h-[182px] w-[295px] "
            ></div>
          ))}
      </div>
    </div>
  );
}

export default Shimmer;

export function MenuShimmer() {
  return (
    <div className="w-full md:w-[50%] mx-auto mt-10">
      <div className="w-full h-40 sm:h-80 rounded-xl  animate "></div>
        <div className="w-full flex mt-10 justify-between">
          <div className="w-[45%] h-10 rounded-xl animate "></div>
          <div className="w-[45%] h-10 rounded-xl  animate "></div>
        </div>
      

      <div className="w-full mt-20 flex flex-col gap-3">
      {Array(12)
          .fill("")
          .map((data,i) => (
            <div key={i} className="w-full h-40 flex  gap-3  justify-between ">
          <div className="w-[60%] flex flex-col gap-5 h-full">
            <div className="w-[100%] h-5 animate"></div>
            <div className="w-[60%] h-5 animate"></div>
            <div className="w-[40%] h-5 animate"></div>
          </div>
          <div className="w-[30%] rounded-xl animate h-full"></div>
        </div>
          ))}

        
      </div>
    </div>
  );
}
