import SignupForm from "@/components/SignupForm";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/_authOptions";

const SignUp = async () => {
  const session = await getServerSession(authOptions);

  if (session) {
    return redirect("/");
  }
  return (
    <div>
      <SignupForm />
    </div>
  );
};

export default SignUp;
