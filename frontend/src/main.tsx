import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import HomePage from './pages/homePage/HomePage.tsx'
import PostPage from './pages/postPage/PostPage.tsx'
import AuthPage from './pages/authPage/AuthPage.tsx'
import SearchPage from './pages/searchPage/SearchPage.tsx'
import ProfilePage from './pages/profilePage/ProfilePage.tsx'
import CreatePage from './pages/createPage/CreatePage.tsx'
import MainLayout from './layouts/mainLayout/MainLayout.tsx'
import { Provider } from 'react-redux'
import { store } from './app/store.ts'
import ProtectedRoute from './components/protectedRoute/ProtectedRoute.tsx'

const baseurl = import.meta.env.VITE_BASE_PATH;

createRoot(document.getElementById('root')!).render(

  <StrictMode>
    <Provider store={store}>
      <BrowserRouter basename={baseurl}>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route element={<MainLayout />}>
              <Route path='/' element={<HomePage />} />
              <Route path='/create' element={<CreatePage />} />
              <Route path='/pin/:id' element={<PostPage />} />
              <Route path='/user/:username' element={<ProfilePage />} />
              <Route path="/search" element={<SearchPage />} />
            </Route>
          </Route>
          <Route path='/auth' element={<AuthPage />} />
          <Route path='*' element={<h1>Not found</h1>} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
