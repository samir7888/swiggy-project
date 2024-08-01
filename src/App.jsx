// import Body from "./component/Body";
// import Head from "./component/Head";

import { Route, Routes } from "react-router-dom";
// import ResturantMenu from "./component/ResturantMenu";

import { lazy, Suspense } from "react";
import { Cart } from "./component/Cart";
// const Cart = lazy(() => import("./component/Cart"));
const Body = lazy(() => import("./component/Body"));
const Head = lazy(() => import("./component/Head"));
const ResturantMenu = lazy(() => import("./component/ResturantMenu"));
const Search = lazy(() => import("./component/Search"));

import { useSelector } from "react-redux";
// import SignInPage from "./component/SignInPage";
function App() {
  // const [coord, setCoord] = useState({ lat: 19.0748, lng: 72.8856 });

  const visible = useSelector((state) => state.toogleSlice.searchToogle);
  const loginVisible = useSelector((state) => state.toogleSlice.loginToogle);

  return (
    <div
      className={
        visible || loginVisible ? "max-h-screen overflow-hidden " : " "
      }
    >
      <Suspense fallback="loading...">
        <Routes>
          <Route path="/" element={<Head />}>
            <Route path="/" element={<Body />} />
            <Route path="/search" element={<Search />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/resturant/:id" element={<ResturantMenu />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
