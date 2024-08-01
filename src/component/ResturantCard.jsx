
import { Link } from 'react-router-dom'

function ResturantCard({item}) {
  // console.log(item)
  return (
    <Link to={`/resturant/${item.link.split("/")[4]}`}>
         <div  className='w-72 hover:scale-95 duration-300 relative'>
 
    
    <img className='min-w-72 object-cover border rounded-2xl  h-52 cursor-pointer' key={i} src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${item.info.cloudinaryImageId}`} />
    <div className='bg-gradient-to-t from-black to-transparent to-40% min-w-72 border rounded-2xl h-52 absolute top-0 left-0'></div>
    <p className='absolute bottom-40 left-3 text-xl text-white font-extrabold'>{item.info.
aggregatedDiscountInfoV3?.header +" " + item.info.
aggregatedDiscountInfoV3?.subHeader}</p>

<div className='p-3'>

    <h1 className='font-bold text-xl mt-2 truncate'>{item.info.name}</h1>
    <div className='flex items-center gap-1 font-semibold'>
    <i className="fa-solid fa-star p-1 bg-green-700 text-white border rounded-full w-9 h-9 text-center text-xl mt-1"></i>
    <p className=' text-xl mt-2'>{item.info.
avgRating}. </p>
<p className=' text-xl mt-2'> {item.info.sla.slaString}</p>

</div>

<div className='flex w-full items-center gap-2'>

<p className='truncate text-lg text-gray-500'>{item.info.cuisines.join(", ")}</p>


</div>
<p className='text-lg text-gray-500'>{item.info.areaName}</p>



</div>
    </div>
    </Link>
  )
}

export default ResturantCard