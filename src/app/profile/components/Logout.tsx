"use client";
import React from "react";
import { useAppDispatch } from "@/redux/store";
import { logout } from "@/redux/authSlice";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import { UserDetailType } from "@/types/type";
import Cookies from "js-cookie";



function Logout({user}: {user: UserDetailType}) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  const handleLogout = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(logout());
    router.replace("/");
    router.refresh();
  };

  return (
    <>
      {isAuthenticated && user?.username === Cookies.get("bpmUsername") && (
        <div className="flex justify-center mt-4">
          <button
            onClick={handleLogout}
            className="bg-red-600 font-bold px-3 py-1 rounded-md text-white hover:bg-red-800 duration-200"
          >
            Logout
          </button>
        </div>
      )}
    </>
  );
}

export default Logout;
