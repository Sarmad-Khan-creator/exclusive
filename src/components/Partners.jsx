import Image from "next/image";
import React from "react";
import twitter from "../../public/twitter.svg";
import instagram from "../../public/instagram.svg";
import linkedin from "../../public/linkedin.svg";

const Partners = ({ image, title, designation }) => {
  return (
    <div>
      <Image src={image} alt="partner" height={430} width={370} />
      <h2 className="font-semibold mt-3 text-xl">{title}</h2>
      <p className="text-xs">{designation}</p>
      <div className="flex gap-2 items-center mt-4">
        <Image src={twitter} alt="twitter" />
        <Image src={instagram} alt="instagram" />
        <Image src={linkedin} alt="linkedin" />
      </div>
    </div>
  );
};

export default Partners;
