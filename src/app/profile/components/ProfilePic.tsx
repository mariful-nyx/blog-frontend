"use client";
import useApi from "@/api/api";
import { UserDetailType } from "@/types/type";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

function ProfilePic({user}: {user:UserDetailType}) {
  const api = useApi();
  const { slug } = useParams();
  const router = useRouter()

  const onChangeProfilePic = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      api.createImage({image: e.target.files[0], image_alt_text: e.target.name}).then((response)=>{
        api.updateProfile(slug as string, {
          email: user?.email as string,
          username: user?.username as string,
          avater: response.data.id,
        })
        .then(() => {
          router.refresh()
          toast.success('Successfully updated profile picture.')
          
        }).catch(()=>toast.error('Error updating profile photo!!!'))
      }).catch(()=>console.log('Error update image failed.'))
      
    }
  };

  return (
    <div>
   
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
