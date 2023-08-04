"use client";

import { toastConfig } from "@/toast";
import { User } from "@prisma/client";
import axios from "axios";
import { Dialog } from "primereact/dialog";
import { useState } from "react";
import { IoAdd } from "react-icons/io5";
import { toast } from "react-toastify";

const AddLink = ({ user, theme }: { user: User; theme: string }) => {
  const [show, setShow] = useState(false);

  const [icon, setIcon] = useState<any>(
    "https://t4.ftcdn.net/jpg/03/01/74/15/360_F_301741517_3bvFxpxY3I74BrSFJT86Cqzz6p8cEBJ7.jpg"
  );

  const toggleShow = () => {
    setShow(show ? false : true);
  };

  const processImage = async (img: Blob) => {
    const reader = new FileReader();

    reader.readAsDataURL(img);

    reader.addEventListener("load", () => {
      setIcon(reader.result);
    });
  };

  const handleAddLink = async (e: any) => {
    e.preventDefault();

    const { title, href, target } = e.target;

    const { data: res }: any = await axios.post("/api/user/link/add", {
      icon: icon,
      title: title.value,
      href: `https://${href.value}`,
      target: target.value,
    });

    if (res.status !== 200) return toast.error(res.message || "Error occured", toastConfig);

    toast.success(res.message, toastConfig);

    setTimeout(() => {
      window.location.reload();
    }, 3000);
  };

  const styles = {
    DEFAULT: "text-white border border-black bg-black ",
    DARK: "text-black bg-gray-100 border border-white",
    form: "flex flex-col justify-center gap-7",
    group: "flex flex-col gap-3",
    indicatorImage: "w-[124px] h-[124px] rounded-md border border-gray-600",
    imageContainer: "flex flex-col items-center gap-4",
    label: "text-lg",
    input:
      "w-full p-3 border border-black bg-transparent outline-none focus:border-2",
    showOnly:
      "text-white bg-black p-3 border border-black outline-none focus:border-2",
    buttonContainer: "flex gap-3 justify-end",
    button:
      "p-3 border border-black bg-black text-white ease-in-out duration-300 hover:hover:scale-110",
    buttonSec:
      "p-3 border border-black bg-transparent text-black ease-in-out duration-300 hover:hover:scale-110",
  };

  return (
    <>
      <button
        title="Add link"
        onClick={toggleShow}
        className={`ease-in-out duration-300 hover:scale-110 flex gap-2 items-center rounded-full p-2 text-xl ${styles[theme]}`}
      >
        <IoAdd /> <div className="text-base">Add Link</div>
      </button>

      <Dialog
        header="Add Link"
        visible={show}
        style={{ width: "40vw" }}
        onHide={toggleShow}
      >
        <form onSubmit={handleAddLink} className={styles.form}>
          <div className={styles.imageContainer}>
            <label htmlFor="image" className="cursor-pointer">
              <img
                src={icon}
                alt={"Link Icon"}
                className={styles.indicatorImage}
              />
            </label>
            <input
              accept=".jpg,.jpeg,.png"
              onChange={(e: any) => processImage(e.target.files[0])}
              className="hidden"
              type="file"
              name="image"
              id="image"
            />
          </div>
          <div className={styles.group}>
            <label htmlFor="title">Title</label>
            <input
              required
              className={styles.input}
              type="text"
              name="title"
              id="title"
              autoComplete="off"
              minLength={1}
              placeholder="Enter your link title..."
            />
          </div>
          <div className={styles.group}>
            <label htmlFor="href">URL</label>
            <div className={"flex"}>
              <div className={styles.showOnly}>https://</div>
              <input
                required
                className={styles.input}
                type="text"
                name="href"
                id="href"
                autoComplete="off"
                minLength={1}
                placeholder="Enter your link URL..."
              />
            </div>
          </div>
          <div className={styles.group}>
            <label htmlFor="target" className={styles.label}>
              Target
            </label>
            <select
              name="target"
              id="target"
              className={styles.input}
              defaultValue={"_blank"}
            >
              <option value="_blank">Open in new tab</option>
              <option value="_self">Open in current tab</option>
            </select>
          </div>
          <div className={styles.buttonContainer}>
            <button
              type="button"
              onClick={toggleShow}
              className={styles.buttonSec}
            >
              ❌ Cancel
            </button>
            <button type="submit" className={styles.button}>
              💾 Save
            </button>
          </div>
        </form>
      </Dialog>
    </>
  );
};

export default AddLink;
