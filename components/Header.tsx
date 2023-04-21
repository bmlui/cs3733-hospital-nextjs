import logo from '../public/hale-logo-bwh.png'
import Image from 'next/image'

export default function Header() {
    return ( 
        <div className="flex justify-center ">

            <Image alt="Brigham and Womens Logo" className="max-w-xs" src={logo}/>
            </div>
    )
}