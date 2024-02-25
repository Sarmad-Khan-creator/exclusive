import React from "react";
import { Input } from "../ui/input";
import {
  ArrowRight,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import qrCode from "../../../public/QRcode.svg";
import appStore from "../../../public/AppStore.svg";
import googlePlay from "../../../public/GooglePlay.svg";

const Footer = () => {
  return (
    <footer className="flex flex-col items-start justify-between px-24 py-5 h-[400px] bg-black text-white mt-10">
      <div className="w-full flex justify-between items-start mt-14">
        <div className="flex flex-col items-start gap-5">
          <h1 className="text-xl font-bold">Exclusive.</h1>
          <p className="text-md font-normal cursor-pointer">Subscribe</p>
          <p className="text-xs font-normal">Get 10% off your first order</p>
          <div className="flex gap-1 items-center bg-black border border-white rounded-sm">
            <Input
              type="email"
              placeholder="Enter your email"
              className="focus-visible:ring-0 focus-visible:ring-offset-0 bg-black border-none"
            />
            <ArrowRight className="mr-1" />
          </div>
        </div>

        <div className="flex flex-col gap-5 items-start">
          <h1 className="text-lg font-semibold">Support</h1>
          <p className="text-sm font-normal">
            111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.
          </p>
          <p className="text-sm font-normal">exclusive@gmail.com</p>
          <p className="text-sm font-normal">+88015-88888-9999</p>
        </div>

        <div className="flex flex-col items-start gap-5">
          <h1 className="text-lg font-semibold">Account</h1>
          <Link href="/user/account">
            <p className="text-sm font-normal">My Account</p>
          </Link>
          <Link href="/auth/signup">
            <p className="text-sm font-normal">Login / Register</p>
          </Link>
          <Link href="/user/cart">
            <p className="text-sm font-normal">Cart</p>
          </Link>
          <Link href="/">
            <p className="text-sm font-normal">Shop</p>
          </Link>
        </div>

        <div className="flex flex-col items-start gap-5">
          <h1 className="text-lg font-semibold">Quick Link</h1>
          <p className="text-sm font-normal">Privacy Policy</p>
          <p className="text-sm font-normal">Terms Of Use</p>
          <p className="text-sm font-normal">FAQ</p>
          <Link href="/contact">
            <p className="text-sm font-normal">Contact</p>
          </Link>
        </div>

        <div className="flex flex-col items-start gap-5">
          <h1 className="text-lg font-semibold">Download App</h1>
          <div className="grid grid-cols-2 grid-rows-3">
            <p className="text-xs col-span-2 text-gray-400">
              Save $3 with App New User Only
            </p>
            <Image src={qrCode} alt="qr code" className="row-span-2" />
            <Image src={googlePlay} alt="google paly store" />
            <Image src={appStore} alt="apple app store" />
          </div>

          <div className="w-full flex items-center justify-between">
            <Facebook />
            <Twitter />
            <Instagram />
            <Linkedin />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 w-full">
        <div className="border border-gray-500 rounded-full px-1.5 text-gray-500 text-sm">
          c
        </div>
        <p className="text-sm text-gray-500">
          Copyright Rimel 2022. All right reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
