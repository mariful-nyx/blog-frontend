import React from "react";

type ButtonType = "delete" | "yellow" | "green" | "black";

interface ButtonProps {
  buttonName: string;
  buttonType: ButtonType;
}

function Button({ buttonName, buttonType = "black" }: ButtonProps) {
  return (
    <>
      {buttonType==='delete' && (
      <button className="dark:bg-white bg-black py-1 px-6 text-white dark:text-black rounded-md font-bold dark:hover:bg-gray-300 transition-all duration-150 hover:bg-gray-700">
        {buttonName}
      </button>
      )}

      {buttonType==='yellow' && (
        <button className="dark:bg-yellow-400 bg-yellow-600 py-1 px-6 text-white dark:text-black rounded-md font-bold dark:hover:bg-gray-300 transition-all duration-150 hover:bg-gray-700">
        {buttonName}
      </button>
      )}

      {buttonType==='green' && (
        <button className="dark:bg-white bg-black py-1 px-6 text-white dark:text-black rounded-md font-bold dark:hover:bg-gray-300 transition-all duration-150 hover:bg-gray-700">
        {buttonName}
      </button>
      )}

      {buttonType==='black' && (
        <button className="dark:bg-white bg-black py-1 px-6 text-white dark:text-black rounded-md font-bold dark:hover:bg-gray-300 transition-all duration-150 hover:bg-gray-700">
        {buttonName}
      </button>
      )}
    </>
  );
}

export default Button;
