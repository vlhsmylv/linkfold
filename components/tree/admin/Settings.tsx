"use client";

import { toastConfig } from "@/toast";
import { User } from "@prisma/client";
import axios from "axios";
import { Dialog } from "primereact/dialog";
import { useRef, useState } from "react";
import { CiSettings } from "react-icons/ci";
import { toast } from "react-toastify";

const Settings = ({ user, theme }: { user: User; theme: string }) => {
  const [show, setShow] = useState(false);

  const toggleShow = () => {
    setShow(show ? false : true);
  };

  const handleUpdateSettings = async (e: any) => {
    e.preventDefault();

    const { theme, showNameAs } = e.target;

    const { data: res }: any = await axios.post(
      "/api/user/update/preferences",
      {
        theme: theme.value,
        showNameAs: showNameAs.value,
      }
    );

    if (res.status !== 200) return toast.error(res.message, toastConfig);

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
      <button
        title="Settings"
        onClick={toggleShow}
        className={`ease-in-out duration-300 hover:scale-110 flex gap-2 items-center rounded-full px-[10px] py-2 text-xl ${styles[theme]}`}
      >
        <CiSettings /> <div className="text-base">Settings</div>
      </button>

      <Dialog
        header="Settings"
        visible={show}
        style={{ width: "40vw" }}
        onHide={toggleShow}
      >
        <form onSubmit={handleUpdateSettings} className={styles.form}>
          <div className={styles.group}>
            <label htmlFor="theme" className={styles.label}>
              Theme
            </label>
            <select
              name="theme"
              id="theme"
              defaultValue={user.preferences.theme}
              className={styles.input}
            >
              <option value="DEFAULT">Default</option>
              <option value="DARK">Dark</option>
              <option value="NEOBRUTALIST">Neobrutalist</option>
            </select>
          </div>
          <div className={styles.group}>
            <label htmlFor="showNameAs" className={styles.label}>
              Headline
            </label>
            <select
              name="showNameAs"
              id="showNameAs"
              defaultValue={user.preferences.showNameAs}
              className={styles.input}
            >
              <option value="USERNAME">Show my username in headline</option>
              <option value="NAME">Show my name in headline</option>
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

export default Settings;
