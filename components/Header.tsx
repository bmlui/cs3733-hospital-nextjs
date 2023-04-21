import logo from '../public/bwh-logo.svg'
import Image from 'next/image'

export default function Header() {
    return ( 
        <div className="flex justify-center ">

            <Image alt="Brigham and Womens Logo" className="max-w-xs" src={logo}/>
            </div>
    )
}