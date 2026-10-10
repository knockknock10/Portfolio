"use client"

import Image from "next/image"
import Link from "next/link"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { useCallback, useEffect, useMemo, useState } from "react"
import { Glass, Squircle } from "@/components/primitives"
import { readDurationToken, readMotionNumber, useSpringToken } from "@/components/primitives/motionTokens"
import { Lightbox } from "@/components/work/Lightbox"
import type { WorkImage, WorkProject } from "@/lib/work"

type WorkGalleryProps = {
  projects: WorkProject[]
}

export function WorkGallery({ projects }: WorkGalleryProps) {
  const reducedMotion = useReducedMotion()
  const spring = useSpringToken("gentle")
  const [hoverEnabled, setHoverEnabled] = useState(false)
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine)")
    const update = () => setHoverEnabled(media.matches)
    update()
    media.addEventListener("change", update)
    return () => media.removeEventListener("change", update)
  }, [])

  const allImages = useMemo(
    () => projects.flatMap((project) => project.galleryImages.slice(0, 1)),
    [projects],
  )
  const tags = useMemo(
    () => [...new Set(projects.flatMap((project) => project.tags ?? []))],
    [projects],
  )
  const visibleProjects = selectedTag
    ? projects.filter((project) => project.tags?.includes(selectedTag))
    : projects

  const transition = reducedMotion || !spring
    ? { duration: readDurationToken("--duration-none") }
    : { ...spring, visualDuration: readDurationToken("--duration-base") }

  const closeLightbox = useCallback(() => setLightboxIndex(null), [])
  const navigateLightbox = useCallback((index: number) => setLightboxIndex(index), [])

  const openImage = (image: WorkImage) => {
    const index = allImages.indexOf(image)
    if (index >= 0) setLightboxIndex(index)
  }

  const cardVariants = {
    rest: { y: 0 },
    hover: { y: readMotionNumber("--work-card-detail-shift") },
  }

  const surfaceVariants = {
    rest: { scale: 1 },
    hover: { scale: readMotionNumber("--work-card-hover-scale") },
  }

  if (projects.length === 0) return null

  return (
    <div className="work-gallery">
      {projects.length >= 6 ? (
        <div className="work-filters" aria-label="Filter projects by tag">
          <button
            type="button"
            className="work-filter"
            aria-pressed={selectedTag === null}
            onClick={() => setSelectedTag(null)}
          >
            All
          </button>
          {tags.map((tag) => (
            <button
              type="button"
              className="work-filter"
              aria-pressed={selectedTag === tag}
              key={tag}
              onClick={() => setSelectedTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      ) : null}

      <motion.div className="work-grid" layout transition={transition}>
        <AnimatePresence initial={false} mode="popLayout">
          {visibleProjects.map((project, projectIndex) => (
            <motion.article
              className="work-card"
              key={project.slug}
              layout
              initial={reducedMotion ? false : { opacity: 0, y: readMotionNumber("--work-card-enter-shift") }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: readMotionNumber("--work-card-exit-shift") }}
              variants={surfaceVariants}
              whileHover={hoverEnabled && !reducedMotion ? "hover" : undefined}
              transition={transition}
            >
              <Glass className="work-card-shell" elevation={1}>
                <Squircle className="work-card-media" aria-hidden={!project.galleryImages.length}>
                  {project.galleryImages.length > 0 ? (
                    <div className="work-card-images">
                      <button
                        type="button"
                        className="work-card-image-button"
                        aria-label={"Open image for " + project.title}
                        onClick={() => openImage(project.galleryImages[0])}
                      >
                        <Image
                          src={project.galleryImages[0].src}
                          alt={project.galleryImages[0].alt}
                          fill
                          sizes="(min-width: 80rem) 33vw, (min-width: 48rem) 50vw, 100vw"
                          priority={projectIndex < 2}
                          style={{ objectFit: "contain" }}
                        />
                      </button>
                    </div>
                  ) : (
                    <div className={"work-card-placeholder work-card-placeholder-" + project.slug} aria-hidden="true" />
                  )}
                </Squircle>

                <motion.div className="work-card-details" variants={cardVariants}>
                  <h2 className="work-card-title">
                    <Link href={"/work/" + project.slug}>{project.title}</Link>
                  </h2>
                  {project.description ? (
                    <p className="work-card-description">{project.description}</p>
                  ) : null}
                  {project.tags?.length ? (
                    <ul className="work-card-tags" aria-label="Project tags">
                      {project.tags.map((tag) => (
                        <li className="work-tag" key={tag}>{tag}</li>
                      ))}
                    </ul>
                  ) : null}
                </motion.div>
              </Glass>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>

      <Lightbox
        open={lightboxIndex !== null}
        images={allImages}
        index={lightboxIndex ?? 0}
        onClose={closeLightbox}
        onNavigate={navigateLightbox}
      />
    </div>
  )
}
