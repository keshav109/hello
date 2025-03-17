import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ClerkProvider } from '@clerk/clerk-react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SignInPage from './auth/index.tsx';
import Dashboard from './routes/Dashboard.tsx';
import Certificates from './routes/Certificates.tsx';
import Tables from './routes/Tables.tsx';
import KPI from './routes/KPI.tsx';
import Predictions from './routes/Predictions.tsx';
import Resources from './routes/Resources.tsx'

const PUBLISHABLE_KEY = import.meta.env.VITE_PUBLIC_CLERK_PUBLISHABLE_KEY

              // <Route path="/resources" element={<Resources />} />
              // <Route path="/settings" element={<Settings />} />


const router=createBrowserRouter([
  {
    element:<App/>,
    children:[
      {
        path:'/',
        element:<Dashboard/>
      },
      {
        path:'/certificates',
        element:<Certificates/>
      },
      {
        path:'/tables',
        element:<Tables/>
      },
      {
        path:'/kpi',
        element:<KPI/>
      },
      { path:'/Resources',
        element:<Resources/> }

    ]
  },
  {
    path:'/sign-up',
    element:<SignInPage/>
  }
])

createRoot(document.getElementById('root')!).render(

  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <RouterProvider router={router} />
    </ClerkProvider>
  </StrictMode>
);
