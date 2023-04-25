//@ts-nocheck
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function HospitalDirections() {

  const [data, setData] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    
    console.log(id);
     fetch('/api/directions/'+id, {
      method: 'GET' 
  }).then((response) => {
  if (response.status !== 200) {
    throw new Error('Failed to fetch');
  }
  return response.json()}).then((data) => {
    setData(data);
  }).catch((error) => {setData(null);});
  
}, [id])

  if (!data || data == null || data == undefined || data == '' || data == 'undefined' || id == undefined || id == '' || id == 'undefined') {
    return <div>Loading...</div>;
  }
   // Decode the directions and split them into an array of steps
   const steps = data.directions.split(';');
 
   // Parse each step to extract the distance and location to turn at
   const parsedSteps = steps.map((step) => {
     var fields = step.split('~');
     const distance = fields[0];
     const direction = fields[1];
     const location = fields[2];
     return { distance, direction, location };
   });
 


  // Display the parsed steps in cards
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Directions from {data.start} to {data.end}</h1>
      <div className="grid grid-cols-1 gap-4">
        {parsedSteps.map((step, index) => (
          <div key={index} className="bg-white rounded-lg p-4 shadow-md">
            <span className="font-bold mb-2">{step.direction} </span>
            <span> {step.distance}m</span>
            <p className="text-gray-500">{step.location}</p>           
           
          </div>
        ))}
      </div>
    </div>
  );
}
