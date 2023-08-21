"use client";

import Promising from "@/components/base/Promising";
import { toastConfig } from "@/toast";
import { User } from "@prisma/client";
import axios from "axios";
import { Dialog } from "primereact/dialog";
import { useState } from "react";
import {
  AiOutlineEdit,
  AiOutlineInstagram,
  AiOutlineLinkedin,
  AiOutlineTwitter,
} from "react-icons/ai";
import { toast } from "react-toastify";

const EditSocials = ({ user, theme }: { user: User; theme: string }) => {
  const [show, setShow] = useState(false);
  const [promising, setPromising] = useState(false);

  const toggleShow = () => {
    setShow(show ? false : true);
  };

  const handleEditSocials = async (e: any) => {
    e.preventDefault();

    const { instagram, twitter, linkedin } = e.target;

    setShow(false);
    setPromising(true);

    const { data: res }: any = await axios.post(
      "/api/user/update/social-links",
      {
        instagram: instagram.value,
        twitter: twitter.value,
        linkedin: linkedin.value,
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
    icon: "text-white p-3 text-2xl bg-black border-y border-l border-black",
    iconGroup: "flex",
    label: "text-lg",
    input:
      "w-full p-3 border border-black bg-transparent outline-none focus:border-2",
    showOnly:
      "bg-gray-200 p-3 border border-black bg-transparent outline-none focus:border-2",
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
        title="Edit social links"
        onClick={toggleShow}
        className={`ease-in-out duration-300 hover:scale-110 flex gap-2 items-center rounded-full p-2 text-xl ${styles[theme]}`}
      >
        <AiOutlineEdit /> <div className="text-base">Socials</div>
      </button>

      <Dialog
        header="Social Links"
        visible={show}
        style={{ maxWidth: "600px" }}
        className="mx-5 lg:w-full"
        onHide={toggleShow}
      >
        <form onSubmit={handleEditSocials} className={styles.form}>
          <div className={styles.group}>
            <label htmlFor="instagram" className={styles.label}>
              Instagram
            </label>
            <div className={styles.iconGroup}>
              <div className={styles.icon}>
                <AiOutlineInstagram />
              </div>
              <input
                autoComplete="off"
                name="instagram"
                id="instagram"
                defaultValue={user.socials?.instagram}
                className={styles.input}
                placeholder="Enter your instagram username..."
              />
            </div>
          </div>
          <div className={styles.group}>
            <label htmlFor="twitter" className={styles.label}>
              Twitter
            </label>
            <div className={styles.iconGroup}>
              <div className={styles.icon}>
                <AiOutlineTwitter />
              </div>
              <input
                autoComplete="off"
                name="twitter"
                id="twitter"
                defaultValue={user.socials?.twitter}
                className={styles.input}
                placeholder="Enter your twitter username..."
              />
            </div>
          </div>
          <div className={styles.group}>
            <label htmlFor="linkedin" className={styles.label}>
              Linkedin
            </label>
            <div className={styles.iconGroup}>
              <div className={styles.icon}>
                <AiOutlineLinkedin />
              </div>
              <input
                autoComplete="off"
                name="linkedin"
                id="linkedin"
                defaultValue={user.socials?.linkedin}
                className={styles.input}
                placeholder="Enter your instagram linkedin..."
              />
            </div>
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

export default EditSocials;
