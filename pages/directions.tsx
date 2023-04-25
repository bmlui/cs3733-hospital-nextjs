import Link from 'next/link';
import Header from '../components/Header'
import HospitalDirections from '../components/HospitalDirections'

export default function Home() {

  return (
    <div>

    <div className=' flex flex-col items-center pt-20 min-h-screen bg-gray-100'>    
    <Header></Header>
     <HospitalDirections />
    </div>
    </div>
  );
}