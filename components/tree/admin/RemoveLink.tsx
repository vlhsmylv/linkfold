"use client";

import { toastConfig } from "@/toast";
import axios, { AxiosRequestConfig } from "axios";
import { BsFillTrashFill } from "react-icons/bs";
import { toast } from "react-toastify";

const RemoveLink = ({ linkId, theme }: { linkId: string; theme: string }) => {
  const handleRemoveLink = async (e: any) => {
    e.preventDefault();

    if (!confirm("Do you want to remove this link?")) return;

    const { data: res }: any = await axios.post("/api/user/link/remove", {
      linkId: linkId,
    });

    if (res.status !== 200) return toast.error(res.message, toastConfig);

    toast.info(res.message, toastConfig);

    setTimeout(() => {
      window.location.reload();
    }, 3000);
  };

  const styles = {
    DEFAULT: "text-white border border-black bg-black ",
    DARK: "text-black bg-gray-100 border border-white",
  };

  return (
    <button
      title="Remove link"
      onClick={handleRemoveLink}
      className={`ease-in-out duration-300 hover:scale-110 flex gap-2 items-center rounded-full p-2 text-xl ${styles[theme]}`}
    >
      <BsFillTrashFill />
    </button>
  );
};

export default RemoveLink;
