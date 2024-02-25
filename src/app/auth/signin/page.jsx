import { authOptions } from "@/app/api/auth/_authOptions";
import SigninForm from "@/components/SigninForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const SignIn = async () => {
  const session = await getServerSession(authOptions);

  if (session) {
    return redirect("/");
  }
  return (
    <div>
      <SigninForm />
    </div>
  );
};

export default SignIn;
