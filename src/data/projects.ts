export type ProjectAccess = 'public' | 'protected'

export interface Project {
  slug: string
  title: string
  access: ProjectAccess
}

export const projects: Project[] = [
  { slug: 'prototype-factory', title: 'Prototype Factory', access: 'public' },
  { slug: 'rampet', title: 'Rampet', access: 'public' },
  { slug: 'hope', title: 'Hope', access: 'public' },
  { slug: 'conexcom', title: 'Conexcom', access: 'public' },
]
