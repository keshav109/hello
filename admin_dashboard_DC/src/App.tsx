import { BrowserRouter as Router, Navigate, Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import { useUser } from '@clerk/clerk-react';

export default function App() {


  const {isLoaded,isSignedIn}=useUser();

  if(!isSignedIn&&isLoaded)
  {
    return <Navigate to={'/sign-up'} />
  }

  return (
      <div className="flex h-screen bg-gray-100 fixed w-full">
        <Sidebar />
        <div className="w-full flex flex-col">
          <Navbar />
          <main className="p-8 overflow-auto">
            <Outlet/>
          </main>
        </div>
      </div>
  );
}