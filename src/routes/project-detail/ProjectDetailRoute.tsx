import { useParams } from 'react-router-dom'

export function ProjectDetailRoute() {
  const { slug } = useParams<{ slug: string }>()

  return (
    <article aria-labelledby="project-title">
      <h1 id="project-title">Project: {slug}</h1>
    </article>
  )
}
