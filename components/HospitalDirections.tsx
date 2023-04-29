//@ts-nocheck
import EncodeDecode from '@/temp/encodedecode';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function HospitalDirections() {
  const router = useRouter();
const data = router.query;


  if (data.directions == undefined || data.start == undefined || data.end == undefined) {
    return <div>Error: Invalid Data</div>;
  }

   // Decode the directions and split them into an array of steps

   const steps = EncodeDecode.decodeDirections(data.directions).split(';');
   const start = EncodeDecode.decodeDirections(data.start);
    const end = EncodeDecode.decodeDirections(data.end);
    const generateDate = EncodeDecode.decodeDirections(data.generateDate);
    const forDate = EncodeDecode.decodeDirections(data.forDate);

 
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
      <h1 className="text-3xl font-bold mb-8">Directions from {start} to {end}</h1>
      <div className="grid grid-cols-1 gap-4">
        {parsedSteps.map((step, index) => (
          <div key={index} className="bg-white rounded-lg p-4 shadow-md">
            <span className="font-bold mb-2">{step.direction} </span>
            <span> {step.distance}ft</span>
            <p className="text-gray-500">{step.location}</p>           
           
          </div>
        ))}
        <p className='text-gray-500 text-center'>These directions were generated on {generateDate} for {forDate}.</p>
      </div>

    </div>
  );
}
