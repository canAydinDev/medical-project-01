<<<<<<< HEAD
import { LuUser2 } from "react-icons/lu";
import { currentUser } from "@clerk/nextjs/server";
async function UserIcon() {
  const user = await currentUser();
  const profileImage = user?.imageUrl;
  if (profileImage)
    return (
      <img src={profileImage} className="w-6 h-6 rounded-full object-cover" />
    );
  return <LuUser2 className="w-6 h-6 bg-primary rounded-full text-white" />;
}
export default UserIcon;
=======
import React from 'react'

function UserIcon() {
  return (
    <div>UserIcon</div>
  )
}

export default UserIcon
>>>>>>> f403d16 (last)
