"use client";

import { Button } from "@/component-lib/button";
import { Input } from "@/component-lib/input";
import Image from "next/image";
import React, { useState } from "react";
import { useQueryParam } from "../hooks/useQueryParam";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Modal } from "@/component-lib/modal";
import NavbarWrapper from "@/components/ui/Navbar";
import { Login } from "./components/Login";
import { useToast } from "@/component-lib/toast/useToast";

export default function page() {
  const [showLogin, setShowLogin] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);

  useQueryParam("login", (value) => {
    setShowLogin(value === "true");
  });

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const isLandingPage = pathname === "/dashboard/landing";
  const { toast } = useToast();

  const updateUrl = (showLogin: boolean) => {
    const params = new URLSearchParams(searchParams);
    params.set("login", `${showLogin}`);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const navigateAuth = () => {
    router.push("/dashboard/landing?authCheck=true");
  };

  const showMore = () => {
    if (!showOtpModal) {
      toast({
        title: "Error",
        description: "Please Login First!",
        type: "error",
        duration: 3000,
      });
    }
  };

  return (
    <React.Fragment>
      {!isLandingPage && (
        <NavbarWrapper
          showLogin={(showLogin: boolean) => {
            updateUrl(showLogin);
          }}
        />
      )}
      <div className="bg-white h-[90vh] px-4 md:px-10 text-black grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          className={`${
            !showLogin ? "flex" : "hidden md:flex"
          } flex-col justify-center items-start space-y-2`}
        >
          <p className="text-sm">You Can See The Navbar Component Above</p>
          <h1 className="font-bold text-6xl">Build With Confident</h1>
          <p className="text-xl font-bold">Forget About Components</p>
          <p>
            An aesthetically crafted component library that blends modern design
            with functional elegance. Built for consistency, usability, and
            seamless integration across your applications.
          </p>
          <Button onClick={showMore}>Learn More</Button>
        </div>

        <div className="flex items-center justify-center">
          {!showLogin ? (
            <Image
              src={"/hero_image.webp"}
              width={1200}
              height={1200}
              alt="hero_image"
            />
          ) : (
            <Login showOtpModal={() => setShowOtpModal(true)} />
          )}
        </div>

        <Modal
          showModal={showOtpModal}
          setShowModal={setShowOtpModal}
          modalTitle="Sample Modal"
          showCloseButton={true}
          dismissible={false}
          showTitle={false}
        >
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="text-2xl font-bold">Please Enter Your OTP</div>
            <Input OTPField={true} />
            <Button type="button" onClick={navigateAuth}>
              Submit
            </Button>
            <p className="text-xs text-center">
              Input Component Can also be used as an OTP Feild <br /> This is
              rendered inside the Modal Component
            </p>
          </div>
        </Modal>
      </div>
    </React.Fragment>
  );
}
