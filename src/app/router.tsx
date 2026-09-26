import { createBrowserRouter } from 'react-router-dom'
import { AboutRoute } from '../routes/about/AboutRoute'
import { ContactRoute } from '../routes/contact/ContactRoute'
import { HomeRoute } from '../routes/home/HomeRoute'
import { NotFoundRoute } from '../routes/not-found/NotFoundRoute'
import { ProjectDetailRoute } from '../routes/project-detail/ProjectDetailRoute'
import { SiteLayout } from './layouts/SiteLayout'

export const router = createBrowserRouter([
  {
    element: <SiteLayout />,
    children: [
      { path: '/', element: <HomeRoute /> },
      { path: '/projects/:slug', element: <ProjectDetailRoute /> },
      { path: '/about', element: <AboutRoute /> },
      { path: '/contact', element: <ContactRoute /> },
      { path: '*', element: <NotFoundRoute /> },
    ],
  },
])
