import SignOut from "@/components/auth/SignOut";
import ThemeProvider from "@/components/tree/themes/ThemeProvider";
import { authOptions, checkSession } from "@/lib/auth";
import axios from "axios";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const UserPage = async ({ params }: { params: { username: string } }) => {
  const session: any = await getServerSession(authOptions);
  const thereIsASession = checkSession(session);

  // ****** Username from route *****
  const { username } = params;

  const { data: res } = await axios.get(
    `${process.env.API_URL}/user/${username}`
  );

  if (res.status !== 200) redirect("/");

  if (thereIsASession) {
    const { user: sessionUser } = session;

    if (sessionUser.username === username)
      return <ThemeProvider user={res.user} admin={true} />;
  }

  return <ThemeProvider user={res.user} />;
};

export default UserPage;
