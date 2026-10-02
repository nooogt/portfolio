import { createBrowserRouter } from 'react-router-dom'
import { AboutRoute } from '../routes/about/AboutRoute'
import { ContactRoute } from '../routes/contact/ContactRoute'
import { HomeRoute } from '../routes/home/HomeRoute'
import { NotFoundRoute } from '../routes/not-found/NotFoundRoute'
import { ProjectDetailRoute } from '../routes/project-detail/ProjectDetailRoute'
import { SiteLayout } from './layouts/SiteLayout'
import { PortfolioLayout } from './layouts/PortfolioLayout'

const devRoutes = import.meta.env.DEV
  ? [
      {
        path: '/dev/ui-primitives',
        lazy: async () => {
          const { UiPrimitivesRoute } = await import(
            '../routes/dev/UiPrimitivesRoute'
          )

          return { Component: UiPrimitivesRoute }
        },
      },
    ]
  : []

export const router = createBrowserRouter([
  {
    element: <SiteLayout />,
    children: [
      {
        path: '/',
        element: <PortfolioLayout />,
        children: [
          { index: true, element: <HomeRoute /> },
          { path: 'about', element: <AboutRoute /> },
        ],
      },
      { path: '/projects/:slug', element: <ProjectDetailRoute /> },
      { path: '/contact', element: <ContactRoute /> },
      ...devRoutes,
      { path: '*', element: <NotFoundRoute /> },
    ],
  },
])
