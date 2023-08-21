"use client";
import { useEffect } from "react";

const Promising = () => {
  useEffect(() => {
    if (document) {
      document.querySelector("#promising-modal").style.top = "0px";
    }
  }, []);

  return (
    <div
      id="promising-modal"
      className="z-30 fixed bg-black opacity-[.6] flex w-screen h-screen justify-center items-center"
    >
      <img src="https://svgshare.com/i/wiW.svg" alt="Loading..." />
    </div>
  );
};

export default Promising;
