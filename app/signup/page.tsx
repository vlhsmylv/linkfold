import SignUp from "@/components/auth/SignUp";
import { authOptions, checkSession } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const SignUpPage = async () => {
  const session: any = await getServerSession(authOptions);
  const thereIsASession = checkSession(session);

  if (thereIsASession) redirect("/");

  return <SignUp />;
};

export default SignUpPage;
