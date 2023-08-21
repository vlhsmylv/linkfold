"use client";

import { useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { Dialog } from "primereact/dialog";
import { User } from "@prisma/client";
import axios from "axios";
import { toast } from "react-toastify";
import { toastConfig } from "@/toast";
import Promising from "@/components/base/Promising";

const EditIndicators = ({ user, theme }: { user: User; theme: string }) => {
  const [show, setShow] = useState(false);
  const [promising, setPromising] = useState(false);

  const [image, setImage] = useState<any>(user.image);

  const toggleShow = () => {
    setShow(show ? false : true);
  };

  const processImage = async (img: Blob) => {
    const reader = new FileReader();

    reader.readAsDataURL(img);

    reader.addEventListener("load", () => {
      setImage(reader.result);
    });
  };

  const handleEditIndicators = async (e: any) => {
    e.preventDefault();

    const { name, bio } = e.target;

    setShow(false);
    setPromising(true);

    const { data: res }: any = await axios.post(
      "/api/user/update/personal-information",
      {
        image: image,
        name: name.value,
        bio: bio.value,
      }
    );

    if (res.status !== 200) return toast.error(res.message, toastConfig);

    setPromising(false);

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
    indicatorImage: "w-[124px] h-[124px] rounded-full border border-gray-600",
    imageContainer: "flex flex-col items-center gap-4",
    label: "text-lg",
    input: "p-3 border border-black bg-transparent outline-none focus:border-2",
    showOnly: "bg-gray-200 p-3 border border-black outline-none focus:border-2",
    buttonContainer: "flex gap-3 justify-end",
    button:
      "p-3 border border-black bg-black text-white ease-in-out duration-300 hover:hover:scale-110",
    buttonSec:
      "p-3 border border-black bg-transparent text-black ease-in-out duration-300 hover:hover:scale-110",
  };

  return (
    <>
      {promising ? <Promising /> : <></>}

      <button
        title="Edit personal information"
        onClick={toggleShow}
        className={`ease-in-out duration-300 hover:scale-110 flex gap-2 rounded-full px-3 py-2 text-xl ${styles[theme]}`}
      >
        <AiOutlineEdit /> <div className="text-base">Personal I.</div>
      </button>

      <Dialog
        header="Edit Personal Information"
        visible={show}
        style={{ maxWidth: "600px" }}
        className="mx-5 lg:w-full"
        onHide={toggleShow}
      >
        <form onSubmit={handleEditIndicators} className={styles.form}>
          <div className={styles.imageContainer}>
            <label htmlFor="image" className="cursor-pointer">
              <img
                src={image}
                alt={user.username}
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
            <label htmlFor="name" className={styles.label}>
              Name
            </label>
            <input
              required
              className={styles.input}
              type="text"
              name="name"
              id="name"
              autoComplete="off"
              defaultValue={user.name}
              minLength={1}
              placeholder="Enter your name..."
            />
          </div>
          <div className={styles.group}>
            <label className={styles.label}>Username</label>
            <div className={styles.showOnly}>@{user.username}</div>
          </div>
          <div className={styles.group}>
            <label className={styles.label}>Email</label>
            <div className={styles.showOnly}>{user.email}</div>
          </div>
          <div className={styles.group}>
            <label htmlFor="bio" className={styles.label}>
              Bio
            </label>
            <textarea
              rows={3}
              required
              className={styles.input}
              name="bio"
              id="bio"
              autoComplete="off"
              defaultValue={user.bio}
              minLength={1}
              maxLength={150}
              placeholder="Enter your bio..."
            />
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

export default EditIndicators;
