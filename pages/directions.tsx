import Link from 'next/link';
import Header from '../components/Header'
import HospitalDirections from '../components/HospitalDirections'

export default function Home() {
  const encodedDirections = "Go+straight+for+100+meters%3B+Turn+left%3B+Go+straight+for+another+50+meters";

  return (
    <div>

    <div className=' flex flex-col items-center pt-20 min-h-screen bg-gray-100'>    
    <Header></Header>
     <HospitalDirections />
    </div>
    </div>
  );
}