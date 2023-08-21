"use client";

import { toastConfig } from "@/toast";
import axios from "axios";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";
import Promising from "../base/Promising";

const SignUp = () => {
  const [promising, setPromising] = useState(false);

  const handleSignUp = async (e: any) => {
    e.preventDefault();
    const { name, username, email, password } = e.target;

    const registerObj = {
      name: name.value,
      username: username.value,
      email: email.value,
      password: password.value,
    };

    try {
      setPromising(true);

      const {
        data: createUser,
      }: {
        data: { status: number; message: string };
      } = await axios.post("/api/user/create", registerObj);

      if (createUser.status !== 200)
        toast.error(createUser.message, toastConfig);

      return await signIn("credentials", {
        username: registerObj.username,
        password: registerObj.password,
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
        <form onSubmit={handleSignUp} className={styles.form}>
          <div className="flex justify-center text-2xl">🎉 Welcome!</div>
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
              placeholder="Enter your name..."
            />
          </div>
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
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input
              required
              className={styles.input}
              type="email"
              name="email"
              id="email"
              autoComplete="off"
              placeholder="Enter your email..."
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
              🚀 Sign up!
            </button>
          </div>
          <div className="text-center">
            Have an account?{" "}
            <Link href="/signin" className="underline">
              Continue.
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignUp;
