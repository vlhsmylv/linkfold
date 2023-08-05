import Socials from "@/components/tree/social/Socials";
import { User } from "@/types";

interface DefaultThemeProps {
  editor: boolean;
  user: User;
}

const Default = ({ editor, user }: DefaultThemeProps) => {
  return (
    <main className="flex flex-col gap-7 m-auto my-10 max-w-[500px]">
      <div className="flex flex-col gap-3 items-center justify-center">
        <img
          src={user.image}
          className="w-32 h-32 rounded-full border border-gray-500"
        />
        <div className="font-semibold text-xl text-center">{user.name}</div>
        <p>{user.bio}</p>
      </div>
      <Socials editor={editor} user={user} />
    </main>
  );
};

export default Default;
