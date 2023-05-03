import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
const crypto = require('crypto')


export default function PasswordResetForm() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [pageError, setPageError] = useState('');
  const router = useRouter();
  const { username , token } = router.query;

useEffect (() => {
    fetch(`/api/resetpassword/${token}?username=${username}`, {
      method: 'GET'}).then((response) => {
        if (response.status !== 200 ) {
          setPageError(response.status.toString() + ' Token is invalid or expired');
          throw new Error('Failed to fetch token from temp data');
        }
      return response.json()}).then((data) => {
        if (data.message != 'valididated') {
          setPageError('Token is invalid or expired');
          throw new Error('Failed to fetch token from temp data');
        } else {
          setError('');
          setLoading(false);
          setPageError('');
        }
      }).catch((error) => {setError(error);});
}, [username, token]);

if (pageError != null && pageError != '')  {
  return <div>Error: {pageError}</div>;
}
if (loading == true) {
  return <div>Loading...</div>;
}

  const handleSubmit = (event:any) => {
    event.preventDefault();
    // Perform validation
    if (!username || !newPassword || !confirmPassword) {
      setError('All fields are required');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    const salt:String = (crypto.randomBytes(20).toString('hex')).toUpperCase();
    const hashedpassword = (crypto.createHash('sha256').update(newPassword+salt).digest('hex')).toUpperCase();
    fetch('/api/resetpassword', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username:username, token:token, hashedpassword:hashedpassword, salt:salt }),
      }).then((response) => {
        if (response.status !== 200) {
          setError('Failed to reset password');
          throw new Error(response.status +' '+ response.statusText+ ' Failed to reset password');
        }
        return response.json();
      }).then((data) => {
        if (data.message != 'success') {
          setError('Failed to reset password');
          throw new Error('Failed to reset password');
        } else {
          setSuccessMessage('Password reset successful. Redirecting to login page...');
          setError('');
          setConfirmPassword('');
          setNewPassword('');
          // Redirect to login page after 2 seconds
          setTimeout(() => {
            router.push('/login');
          }, 3000);
        }
      }).catch((error) => {
        setError(error);
      });
  };

  return (
    <div className="max-w-lg w-full mx-auto mt-8">
  
      <form onSubmit={handleSubmit} className="bg-white p-6  rounded-lg shadow-md">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
            {error}
          </div>
        )}
        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded mb-4">
            {successMessage}
          </div>
        )}

              <h1 className="text-2xl font-bold mb-4 text-center">Reset Password</h1>
              <div className="flex items-center justify-center mb-2">
  <svg className="w-6 h-6 rounded-full bg-gray-300 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M19 21C19 17.134 15.866 14 12 14C8.13401 14 5 17.134 5 21M12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7C16 9.20914 14.2091 11 12 11Z"/>
  </svg>
  <span className="ml-2 text-gray-800 font-medium">{username}</span>
</div>
        <div className="mb-4">
          <label htmlFor="new-password" className="block font-medium mb-2">
            New Password
          </label>
          <input
            type="password"
            id="new-password"
            name="new-password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="border border-gray-300 p-2 w-full rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="confirm-password" className="block font-medium mb-2">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirm-password"
            name="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border border-gray-300 p-2 w-full rounded"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white rounded px-4 py-2">
          Reset Password
        </button>
      </form>
    </div>
  );
}
