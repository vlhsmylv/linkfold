"use client";

import { toastConfig } from "@/toast";
import { signOut } from "next-auth/react";
import { BsFillDoorOpenFill } from "react-icons/bs";
import { toast } from "react-toastify";

const SignOut = ({ theme }: { theme: string }) => {
  const styles = {
    DEFAULT: "text-white border border-black bg-black",
    DARK: "text-black border border-white bg-white",
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (err: any) {
      return toast.error(err.message, toastConfig);
    }
  };

  return (
    <button
      title="Sign out"
      onClick={handleSignOut}
      className={`ease-in-out duration-300 hover:scale-110 flex gap-2 items-center rounded-full px-3 py-2 text-xl ${styles[theme]}`}
    >
      <BsFillDoorOpenFill /> <div className="text-base">Sign out</div>
    </button>
  );
};

export default SignOut;
