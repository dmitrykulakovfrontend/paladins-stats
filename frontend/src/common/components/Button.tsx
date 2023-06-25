import Link from 'next/link'
import type { Icon } from '~/types/components';



type ButtonProps =  {
  icon?: Icon
  href: string
} & React.ComponentPropsWithoutRef<"a">;


export default function Button({children, className, ...props}: ButtonProps) {
  return (
    <Link  {...props} className={`bg-sky-300 py-1 px-2 text-2xl text-white transition-all hover:scale-105 ${className || ''}`} >
        {children}
    </Link>
  )
}