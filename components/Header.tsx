import logo from '../public/bwh-logo.svg'
import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
    return ( 
        <div className="flex justify-center ">

<Link href = "/" >
            <Image alt="Brigham and Womens Logo" className="max-w-xs" src={logo}/></Link>
            </div>
    )
}