import ContactForm from "@/components/ContactForm";
import Image from "next/image";
import React from "react";

const Contact = () => {
  return (
    <section className="mt-14 h-screen">
      <div className="text-gray-500 text-sm ml-24">
        Home / <span className="text-black">Contact</span>
      </div>

      <div className="flex mt-14 mx-24 gap-[150px]">
        <div className="flex flex-col gap-5 w-[250px] text-sm">
          <div className="flex gap-5 items-center">
            <Image src="/call.svg" alt="call" width={40} height={40} />
            <p className="font-semibold text-lg">Call to us</p>
          </div>

          <p>We are available 24/7, 7 days a week.</p>
          <p>Phone: +8801611112222</p>

          <hr className="border border-gray-500" />

          <div className="flex gap-5 items-center">
            <Image src="/call.svg" alt="call" width={40} height={40} />
            <p className="font-semibold text-lg">Write to us</p>
          </div>

          <p>Fill out our form and we will contact you within 24 hours.</p>
          <p>Emails: customer@exclusive.com</p>
          <p>Emails: support@exclusive.com</p>
        </div>

        <div>
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default Contact;
