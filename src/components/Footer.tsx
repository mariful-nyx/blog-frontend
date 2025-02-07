import Link from "next/link";
import React from "react";
import { serviceItems } from "./ServiceItems";
import { MdArrowOutward } from "react-icons/md";

function Footer() {
  return (
    <div className="bg-black text-white border-t border-slate-400 mt-20">
      <div className="max-w-[1180px] mx-auto ">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 px-10 py-12">
          <div className="text-slate-500">
            <h2 className="text-blue-600">Maintainer</h2>
            <div className="text-nowrap mt-2 text-slate-100">MD Mariful Islam Saad</div>
            <Link href="mailto:marifulesgiu@gmail.com" className="hover:text-white duration-200 text-nowrap flex items-center gap-2">
              marifulesgiu@gmail.com <MdArrowOutward/>
            </Link>
            <Link href="tel:+880182324870" className="hover:text-white duration-200 text-nowrap flex items-center gap-2">
              +880182324870 (whatsapp) <MdArrowOutward/>
            </Link>
          </div>
          <div className="flex flex-col">
            <h2 className="text-blue-600">About</h2>
            <div className="mt-2 flex flex-col gap-1 text-slate-500">
              <Link 
                href={`/about`} 
                className="hover:text-white duration-200"
              >
                About
              </Link>
              <Link 
                href={`https://predien.vercel.app/contact#contact`} 
                target="_blank"
                className="hover:text-white duration-200 flex gap-2 items-center"
              >
                Contact <MdArrowOutward/>
              </Link>
              <Link href={`/terms`} className="hover:text-white duration-200">Terms</Link>
              <Link href={`/policy`} className="hover:text-white duration-200">Policy</Link>
            </div>
          </div>
          <div className="flex flex-col">
            <h2 className="text-blue-600">Service</h2>
            <div className="mt-2 flex flex-col gap-1 text-slate-500">
              {serviceItems.map((item, index)=>(
                <Link 
                  key={index}
                  href={`https://predien.vercel.app/services/${item.link}`} 
                  target="_blank" className="hover:text-white duration-200 flex gap-2 items-center text-nowrap"
                >
                  {item.name} <MdArrowOutward/>
                </Link>
              ))}
              
              
            </div>
          </div>
          <div className="flex flex-col">
            <h2 className="text-blue-600">Other</h2>
            <div className="mt-2 flex flex-col text-slate-500">
              <Link href={`https://predien.vercel.app/contact#contact`} target="_blank" className="hover:text-white duration-200">Information correct notice</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
