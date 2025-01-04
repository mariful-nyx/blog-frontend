"use client";

import useApi from "@/api/api";
import { GetUserDetail } from "@/api/data";
import { UserDetailType } from "@/types/type";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BsCamera } from "react-icons/bs";
import { FaRegUserCircle } from "react-icons/fa";
import { toast } from "react-toastify";

function ProfilePic() {
  const api = useApi();
  const { slug } = useParams();
  const [user, setUser] = useState<UserDetailType>();

  const getUserDetail = () => {
    api
      .getUserDetail(slug as string)
      .then((response) => {
        setUser(response.data);
      })
      .catch(() => null);
  };

  useEffect(() => {
    if (slug) {
      getUserDetail();
    }
  }, [slug]);

  const onChangeProfilePic = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      api
        .updateProfilePhoto(slug as string, {
          email: user?.email as string,
          username: user?.username as string,
          avater: e.target.files[0] as File,
        })
        .then(() => {
          GetUserDetail(slug as string)
          toast.success('Successfully updated profile picture.')
          
        }).catch(()=>toast.error('Error updating profile photo!!!'))
    }
  };

  return (
    <div>
      <label htmlFor="profile-pic" className="relative group">
        {user?.avater ? (
          <img
            src={user?.avater}
            alt={user?.avater.split("/").at(-1) || ""}
            className="h-[200px] w-[200px] object-cover rounded-full group-hover:mix-blend-darken"
          />
        ) : (
          <FaRegUserCircle className="h-[200px] w-[200px] aspect-square rounded-full object-cover mb-3 text-slate-700 dark:text-slate-500 group-hover:" />
        )}
        <div className=" duration-200 group-hover:block hidden absolute top-0 h-[200px] w-[200px] aspect-square rounded-full backdrop-blur-lg bg-gray-500"></div>
        <BsCamera className=" duration-200 transition-all absolute top-12 right-12 w-[100px] h-[100px] group-hover:block hidden text-white" />
      </label>
      <input
        id="profile-pic"
        type="file"
        onChange={onChangeProfilePic}
        className=" hidden"
      />
    </div>
  );
}

export default ProfilePic;
