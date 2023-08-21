"use client";

import { useEffect, useState } from "react";
import Logo from "../base/Logo";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import { toastConfig } from "@/toast";
import Link from "next/link";
import Promising from "../base/Promising";

const SignIn = () => {
  const [promising, setPromising] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);

    const error = urlParams.get("error");

    if (!(error?.length !== 0 && error !== null)) return;

    if (error === "CredentialsSignin") {
      toast.error("Username or Password is incorrect", toastConfig);
    }
  }, []);

  const handleSignIn = async (e: any) => {
    e.preventDefault();
    const { username, password } = e.target;

    const loginObj = {
      username: username.value,
      password: password.value,
    };

    try {
      setPromising(true);

      await signIn("credentials", {
        username: loginObj.username,
        password: loginObj.password,
        redirect: true,
        callbackUrl: "/",
      });
    } catch (err: any) {
      return toast.error(err.message, toastConfig);
    }
  };

  const styles = {
    form: "m-auto mx-5 lg:w-full max-w-[500px] flex flex-col justify-center gap-7 my-10 border border-black px-5 py-7",
    group: "flex flex-col gap-3",
    label: "text-lg",
    input: "p-3 border border-black bg-transparent outline-none focus:border-2",
    buttonContainer: "flex justify-center",
    button:
      "p-3 border border-black bg-black text-white ease-in-out duration-300 hover:bg-white hover:text-black",
  };

  return (
    <>
      {promising ? <Promising /> : <></>}
      <div className="flex justify-center">
        <form onSubmit={handleSignIn} className={styles.form}>
          <div className="flex text-2xl justify-center">👋 Welcome back!</div>
          <div className={styles.group}>
            <label htmlFor="username" className={styles.label}>
              Username
            </label>
            <input
              required
              className={styles.input}
              type="text"
              name="username"
              id="username"
              autoComplete="off"
              placeholder="Enter your username..."
            />
          </div>
          <div className={styles.group}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <input
              required
              className={styles.input}
              type="password"
              name="password"
              id="password"
              autoComplete="off"
              placeholder="Enter your password..."
            />
          </div>
          <div className={styles.buttonContainer}>
            <button type="submit" className={styles.button}>
              ☕️ Sign In!
            </button>
          </div>
          <div className="text-center">
            New here?{" "}
            <Link href="/signup" className="underline">
              Start now!
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignIn;
