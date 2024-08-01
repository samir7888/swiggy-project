import { signInWithPopup, signInWithRedirect, signOut } from "firebase/auth";
import React from "react";
import { auth, provider } from "../config/firebaseAuth";
import { useDispatch } from "react-redux";
import { addUserData, removeUserData } from "../utils/authSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toogleLogin } from "../utils/toogleSlice";

function SignInBtn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.authSlice.userData);
  async function handleAuth() {
    let data = await signInWithPopup(auth, provider);
    const userData = {
      name: data.user.displayName,
      photo: data.user.photoURL,
    };
    dispatch(addUserData(userData));
    dispatch(toogleLogin());
    navigate("/");
  }
  async function handleLogOut() {
    await signOut(auth);
    dispatch(removeUserData());
    dispatch(toogleLogin());
  }
  return (
    <div className="w-full ">
      <div>
        {!userData && (
          <button
            onClick={handleAuth}
            className="bg-orange-500 text-white font-semibold px-8 py-3 "
          >
            Login with GOOGLE
          </button>
        )}
        {userData && (
          <button
            onClick={handleLogOut}
            className="bg-orange-500 text-white font-semibold px-8 py-3 m-2"
          >
            Log out
          </button>
        )}
      </div>
    </div>
  );
}

export default SignInBtn;
