import Logo from "@/components/base/Logo";
import { authOptions, checkSession } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Page = async () => {
  const session: any = await getServerSession(authOptions);
  const thereIsASession = checkSession(session);

  if (!thereIsASession) redirect("/signin");

  redirect(`/${session.user.username}`);

  return <div className="h-screen flex justify-center items-center text-5xl"><Logo /></div>
};

export default Page;
