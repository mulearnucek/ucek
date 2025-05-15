"use client";

import React from "react";
import logo from "@/public/img/logo.svg";
import Image from "next/image";
const Footer = () => {
  return (
    <>
      <footer className="bg-white border-t ">
        <div className="container justify-between mx-auto py-8 px-6 flex flex-col md:flex-row justify- items-center">
          <div className="flex items-center justify-between gap-3  md:items-start space-y-1  md:space-y-0 md:space-x-6">
            <Image
              width={85}
              height={85}
              src={logo.src}
              alt="University of Kerala Logo"
             className="h-[50px] w-[50px] md:h-[62px] md:w-[62px] prevent-select"
            />
            <div className="text-center md:text-left">
              <h1 className="text-lg font-bold">
                University College Of Engineering
              </h1>
              <p className="text-sm">Kariavattom, Thiruvananthapuram</p>
            </div>
          </div>
          <div className="flex">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1117.830297709082!2d76.88503985095359!3d8.564276538230194!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b05bee2c53009c5%3A0x6510861b288460a1!2sUniversity%20College%20of%20Engineering!5e0!3m2!1sen!2sin!4v1718091626117!5m2!1sen!2sin"
              width="600"
              height="200"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-[20rem] hidden md:flex h-[8rem] rounded-md map"
            ></iframe>
          </div>
        </div>
        <div className="bg-white border-t mt-4">
          <div className="text-[11px] md:text-sm container mx-auto p-5 flex flex-col md:flex-row justify-between items-center text-gray-600">
            <p className="text-center">
              &copy; 2024 University College Of Engineering. All rights
              reserved.
            </p>
            <div>
              <p className="text-center">
                Designed and Developed by{" "}
                <a href="https://mulearn.uck.ac.in">
                  <u>μLearn UCEK</u>
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
