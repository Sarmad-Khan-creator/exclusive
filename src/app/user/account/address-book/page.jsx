import { authOptions } from "@/app/api/auth/_authOptions";
import { findUser } from "@/lib/server-actions/user.action";
import { getServerSession } from "next-auth";

const AddressBook = async () => {
  const session = await getServerSession(authOptions);
  let user;
  if (session) {
    user = await findUser({ email: session?.user.email });
  }
  return (
    <div className="flex flex-col gap-5">
      <p>
        <span className="font-bold text-lg">Name: </span>
        {user.name}
      </p>
      <p>
        <span className="font-bold text-lg">Email: </span>
        {user.email}
      </p>
      <p>
        <span className="font-bold text-lg">Address: </span>
        {user.address}
      </p>
    </div>
  );
};

export default AddressBook;
