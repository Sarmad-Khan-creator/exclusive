import { authOptions } from "@/app/api/auth/_authOptions";
import { findUser } from "@/lib/server-actions/user.action";
import { getServerSession } from "next-auth";
import EditProfileForm from "../_components/EditProfileForm";
import UpdatePasswordForm from "../_components/UpdatePasswordForm";

const Profile = async () => {
  const session = await getServerSession(authOptions);
  const user = await findUser({ email: session?.user.email });

  return (
    <section className="flex flex-col gap-7">
      <h2 className="text-red-400 font-bold text-lg">Edit your Profile</h2>
      <EditProfileForm user={user} />
      <UpdatePasswordForm user={user} />
    </section>
  );
};

export default Profile;
