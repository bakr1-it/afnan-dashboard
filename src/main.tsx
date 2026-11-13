import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import { router } from './router.tsx'
import { AuthProvider } from './context/AuthContext.tsx'
import { AcademicLanguageData } from './context/AcademicLnaguage.tsx'
import { LanguageContextProvider } from './context/LanguageContext.tsx'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageContextProvider>
    <AuthProvider>
      <AcademicLanguageData>
      <RouterProvider router={router} />
      </AcademicLanguageData>

    </AuthProvider>
    </LanguageContextProvider>
  </StrictMode>
)