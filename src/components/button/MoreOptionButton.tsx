

import Link from 'next/link';
import React from 'react'
import { BsArrowRight } from 'react-icons/bs';

interface MoreOptionButtonProps {
    buttonName: string;
    href: string;
}

function MoreOptionButton({buttonName, href}: MoreOptionButtonProps) {
  return (
    <Link
        href={href}
        className='flex gap-2 text-gray-600 bg-slate-100 px-6 py-1 rounded-md justify-center items-center group hover:bg-slate-200'
    >
        <span className='font-semibold text-nowrap'>{buttonName}</span>
        <BsArrowRight className="inline-block transform group-hover:translate-x-2 transition-transform duration-200"/>
    </Link>
  )
}

export default MoreOptionButton