import Link from "next/link";
import React from "react";
import { serviceItems } from "./ServiceItems";

function Footer() {
  return (
    <div className="bg-black text-white">
      <div className="max-w-[1180px] mx-auto mt-20 ">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 px-10 py-12">
          <div className="text-slate-500">
            This is a product base blog site where you get detail description of
            a product that help you to buy correct product.
          </div>
          <div className="flex flex-col">
            <h2 className="text-blue-600">About</h2>
            <div className="mt-2 flex flex-col gap-1 text-slate-500">
              <Link 
                href={`https://saadinsider.vercel.app/`} 
                className="hover:text-white duration-200"
              >
                About
              </Link>
              <Link href={``} className="hover:text-white duration-200">Contact</Link>
              <Link href={``} className="hover:text-white duration-200">Terms</Link>
              <Link href={``} className="hover:text-white duration-200">Policy</Link>
            </div>
          </div>
          <div className="flex flex-col">
            <h2 className="text-blue-600">Service</h2>
            <div className="mt-2 flex flex-col gap-1 text-slate-500">
              {serviceItems.map((item, index)=>(
                <Link 
                  key={index}
                  href={`https://predien.vercel.app/services/${item.link}`} 
                  target="_blank" className="hover:text-white duration-200"
                >
                  {item.name}
                </Link>
              ))}
              
              
            </div>
          </div>
          <div className="flex flex-col">
            <h2 className="text-blue-600">Other</h2>
            <div className="mt-2 flex flex-col text-slate-500">
              <Link href={``} className="hover:text-white duration-200">Information correct notice</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
