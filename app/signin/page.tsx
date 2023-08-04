import SignIn from "@/components/auth/SignIn";
import { authOptions, checkSession } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const SignInPage = async () => {
  const session: any = await getServerSession(authOptions);
  const thereIsASession = checkSession(session);

  if (thereIsASession) redirect("/");

  return <SignIn />;
};

export default SignInPage;
