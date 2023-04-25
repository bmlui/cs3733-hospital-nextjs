import Header from '../components/Header'
import PasswordResetForm from '../components/PasswordReset';

export default function Home() {

  return (
    <div>

    <div className=' flex flex-col items-center pt-20 min-h-screen bg-gray-100'>    
    <Header></Header>
     <PasswordResetForm />
    </div>
    </div>
  );
}