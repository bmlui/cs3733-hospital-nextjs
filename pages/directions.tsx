import Link from 'next/link';
import HospitalDirections from '../components/HospitalDirections'

export default function Home() {
  const encodedDirections = "Go+straight+for+100+meters%3B+Turn+left%3B+Go+straight+for+another+50+meters";

  return (
    <div className=' flex flex-col items-center justify-center min-h-screen bg-gray-100'>
     <HospitalDirections />
    </div>
  );
}