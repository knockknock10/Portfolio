import { aevor } from './aevor.js'
import { commithub } from './commithub.js'
import { sembindAudio } from './sembind-audio.js'

export const projects = [aevor, commithub, sembindAudio]

export const getProject = (id) => projects.find((project) => project.id === id)

export const getAdjacentProjects = (id) => {
  const index = projects.findIndex((project) => project.id === id)
  if (index === -1) return { previous: null, next: null }
  return {
    previous: index > 0 ? projects[index - 1] : projects[projects.length - 1],
    next: index < projects.length - 1 ? projects[index + 1] : projects[0],
  }
}
