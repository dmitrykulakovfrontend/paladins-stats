import React from 'react'
import type { Icon } from '~/types/components';



type TextInputProps = {
  Icon?: Icon
} & React.ComponentPropsWithoutRef<"input">

export default function TextInput({ Icon,className, ...props}: TextInputProps ) {
return (
    <div className='relative'>
        <input
      className={`w-full h-full text-white rounded-md bg-black font-inter text-sm outline-none focus-visible:ring-2  focus-visible:ring-sky-300 ${className || ''}`}
        {...props}
        >

        </input>
            {Icon ? <Icon
            className="absolute right-8 top-1/2 -translate-y-1/2 lg:right-2"
            width={20}
            color="white" /> : ""}

    </div>
  );
}