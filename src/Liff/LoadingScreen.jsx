import React, { useEffect } from 'react';

function LoadingScreen() {
    useEffect(() => {
    const path = window.location.pathname; // "/home" or "/explanation"

    setTimeout(() => {
        if(path === '/explanation') {
        navigate('/explanation');
        } else {
        navigate('/home');
        }
    }, 2000);
    }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="text-gray-700 text-lg font-medium">Loading...</p>
    </div>
  );
}

export default LoadingScreen;
