import Link from "next/link";
import { ReactNode } from "react";
import EditLink from "./admin/EditLink";
import RemoveLink from "./admin/RemoveLink";

export const UserImage = ({
  image,
  username,
  theme,
}: {
  image: string;
  username: string;
  theme: string;
}) => {
  const styles = {
    DEFAULT: "border border-gray-500",
    DARK: "border border-white",
    NEOBRUTALIST: "border-2 border-black",
  };

  return (
    <img
      src={image}
      alt={username}
      className={`w-[124px] h-[124px] rounded-full mb-2 ${styles[theme]}`}
    />
  );
};

export const UserIndicator = ({
  username,
  name,
}: {
  username?: string;
  name?: string;
}) => {
  return (
    <div className="text-2xl font-semibold">
      {username ? <>@{username}</> : name}
    </div>
  );
};

export const Bio = ({ bio }: { bio: string }) => {
  return <p>{bio}</p>;
};

export const SocialLink = ({
  title,
  icon,
  url,
  href,
  theme,
}: {
  title: string;
  icon: ReactNode;
  url: string;
  href: string;
  theme: string;
}) => {
  const styles = {
    DEFAULT: "text-black",
    DARK: " text-gray-100",
  };

  return (
    <Link
      href={`${url}/${href}`}
      target="_blank"
      title={title}
      className={`text-3xl ease-in-out duration-300 hover:scale-110 ${styles[theme]}`}
    >
      {icon}
    </Link>
  );
};

export const UserLink = ({
  id,
  title,
  icon,
  href,
  color,
  target,
  admin,
  theme,
}: {
  id: string;
  title: string;
  icon?: string;
  href: string;
  target?: string;
  color?: string;
  admin: boolean;
  theme: string;
}) => {
  const styles = {
    DEFAULT: "hover:scale-110 border border-black",
    DARK: "hover:scale-110 border border-gray-100",
    NEOBRUTALIST: "border-2 shadow shadow-black border-black"
  };

  return (
    <div className="px-5 flex flex-wrap lg:flex-nowrap justify-center gap-5 max-w-[700px] w-full items-center w-full">
      <Link
        style={theme === "NEOBRUTALIST" ? { 
          background: color
        } : {}}
        href={href}
        className={`flex max-w-[664px] w-full px-3 py-2 rounded-md ease-in-out duration-300 ${styles[theme]}`}
        target={target ? target : "_blank"}
      >
        <img
          src={
            icon
              ? icon
              : "https://t4.ftcdn.net/jpg/03/01/74/15/360_F_301741517_3bvFxpxY3I74BrSFJT86Cqzz6p8cEBJ7.jpg"
          }
          className={`w-12 h-12 rounded-md`}
        />
        <div className="relative -left-5 w-full flex justify-center items-center font-semibold text-xl">
          {title}
        </div>
      </Link>
      {admin ? (
        <div className="flex gap-2">
          <EditLink
            id={id}
            title={title}
            icon={icon}
            href={href}
            target={target}
            theme={theme === "NEOBRUTALIST" ? "DEFAULT" : theme}
          />
          <RemoveLink
            linkId={id}
            theme={theme === "NEOBRUTALIST" ? "DEFAULT" : theme}
          />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
