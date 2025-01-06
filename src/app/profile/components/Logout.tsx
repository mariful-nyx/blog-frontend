"use client";
import React from "react";
import { useAppDispatch } from "@/redux/store";
import { logout } from "@/redux/authSlice";
import { useRouter } from "next/navigation";

function Logout() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(logout());
    router.replace("/");
    router.refresh();
  };

  return (
    <div className="flex justify-center mt-4">
      <button
        onClick={handleLogout}
        className="bg-red-600 font-bold px-3 py-1 rounded-md text-white hover:bg-red-800 duration-200"
      >
        Logout
      </button>
    </div>
  );
}

export default Logout;
