import { Preferences, User } from "@prisma/client";
import Default from "./Default";
import { ReactNode } from "react";
import Dark from "./Dark";

const ThemeProvider = ({ user, admin }: { user: User; admin?: boolean }) => {
  // TODO: TS ERROR
  const { theme }: { theme: string } = user.preferences;

  const styles = {
    DEFAULT: "bg-gray-100 ff-default",
    DARK: "bg-[#010101] ff-default text-gray-100"
  };

  const themes: { DEFAULT: ReactNode, DARK: ReactNode } = {
    DEFAULT: <Default user={user} admin={admin} />,
    DARK: <Dark user={user} admin={admin} />
  };

  // TODO: TS ERROR
  return (
    <div className={`m-0 p-0 max-h-[1980px] ${styles[theme]}`}>{themes[theme]}</div>
  );
};

export default ThemeProvider;
