

import { useRouter } from 'next/router';

export default function HospitalDirections() {
  const router = useRouter();
  const { start, end, directions } = router.query;

  // Decode the directions and split them into an array of steps
  const decodedDirections = decodeURIComponent(String(directions ?? ''));
  const steps = decodedDirections.split(';');

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
            <span className="font-bold mb-2">+{step.distance}m </span>
            <span>{step.direction}</span>
            <p>{step.location}</p>           
           
          </div>
        ))}
      </div>
    </div>
  );
}
