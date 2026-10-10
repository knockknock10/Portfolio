"use client"

import Image from "next/image"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { Glass } from "@/components/primitives"
import {
  readDurationToken,
  readMotionNumber,
  useSpringToken,
} from "@/components/primitives/motionTokens"
import type { WorkItem } from "@/lib/work"
import styles from "./WorkExperience.module.css"

type WorkGalleryProps = { items: WorkItem[] }
type ItemTypeFilter = "all" | "repo" | "project"

function available<T>(value: T | "MISSING" | null | undefined): value is T {
  return value !== "MISSING" && value !== null && value !== undefined && value !== ""
}

function itemMeta(item: WorkItem): string[] {
  if (item.type === "repo") {
    const values: string[] = []
    if (available(item.repo.stargazers_count)) values.push(`${item.repo.stargazers_count} stars`)
    if (available(item.repo.forks_count)) values.push(`${item.repo.forks_count} forks`)
    if (available(item.repo.language)) values.push(item.repo.language)
    return values
  }
  const values: string[] = []
  if (available(item.project.year)) values.push(String(item.project.year))
  if (available(item.project.role)) values.push(item.project.role)
  return values
}

function cardAside(item: WorkItem): string | null {
  if (item.type === "repo") return available(item.repo.language) ? item.repo.language : null
  return available(item.project.medium) ? item.project.medium : null
}

export function WorkGallery({ items }: WorkGalleryProps) {
  const reducedMotion = useReducedMotion()
  const spring = useSpringToken("gentle")
  const [hoverEnabled, setHoverEnabled] = useState(false)
  const [typeFilter, setTypeFilter] = useState<ItemTypeFilter>("all")
  const [languageFilter, setLanguageFilter] = useState("all")
  const [tagFilter, setTagFilter] = useState("all")

  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine)")
    const update = () => setHoverEnabled(media.matches)
    update()
    media.addEventListener("change", update)
    return () => media.removeEventListener("change", update)
  }, [])

  const repoLanguages = useMemo(
    () =>
      [
        ...new Set(
          items.flatMap((item) =>
            item.type === "repo" && available(item.repo.language) ? [item.repo.language] : [],
          ),
        ),
      ].sort((a, b) => a.localeCompare(b)),
    [items],
  )
  const projectTags = useMemo(
    () =>
      [...new Set(items.flatMap((item) => (item.type === "project" ? item.tags : [])))].sort(
        (a, b) => a.localeCompare(b),
      ),
    [items],
  )

  const visibleItems = useMemo(
    () =>
      items.filter((item) => {
        if (typeFilter !== "all" && item.type !== typeFilter) return false
        if (typeFilter === "repo" && languageFilter !== "all") {
          if (item.type !== "repo" || item.repo.language !== languageFilter) return false
        }
        if (typeFilter === "project" && tagFilter !== "all") {
          if (item.type !== "project" || !item.tags.includes(tagFilter)) return false
        }
        return true
      }),
    [items, typeFilter, languageFilter, tagFilter],
  )

  const transition =
    reducedMotion || !spring
      ? { duration: readDurationToken("--duration-none") }
      : { ...spring, visualDuration: readDurationToken("--duration-base") }
  const cardVariants = {
    rest: { y: 0 },
    hover: { y: readMotionNumber("--work-card-detail-shift") },
  }
  const surfaceVariants = {
    rest: { scale: 1 },
    hover: { scale: readMotionNumber("--work-card-hover-scale") },
  }

  return (
    <section className="work-gallery" aria-label="Projects and repositories">
      {items.length >= 6 ? (
        <div className={styles.filterRow}>
          <div className="work-filters" role="group" aria-label="Filter work by type">
            {(
              [
                ["all", "All"],
                ["repo", "Repos"],
                ["project", "Projects"],
              ] as const
            ).map(([value, label]) => (
              <button
                type="button"
                className="work-filter"
                aria-pressed={typeFilter === value}
                key={value}
                onClick={() => {
                  setTypeFilter(value)
                  setLanguageFilter("all")
                  setTagFilter("all")
                }}
              >
                {label}
              </button>
            ))}
          </div>
          {typeFilter === "repo" && repoLanguages.length ? (
            <label className={styles.filterSelectGroup}>
              <span className={styles.filterLabel}>Language</span>
              <select
                className={styles.filterSelect}
                value={languageFilter}
                onChange={(event) => setLanguageFilter(event.target.value)}
              >
                <option value="all">All languages</option>
                {repoLanguages.map((language) => (
                  <option value={language} key={language}>
                    {language}
                  </option>
                ))}
              </select>
            </label>
          ) : null}
          {typeFilter === "project" && projectTags.length ? (
            <label className={styles.filterSelectGroup}>
              <span className={styles.filterLabel}>Tag</span>
              <select
                className={styles.filterSelect}
                value={tagFilter}
                onChange={(event) => setTagFilter(event.target.value)}
              >
                <option value="all">All tags</option>
                {projectTags.map((tag) => (
                  <option value={tag} key={tag}>
                    {tag}
                  </option>
                ))}
              </select>
            </label>
          ) : null}
        </div>
      ) : null}

      <motion.div className="work-grid" layout transition={transition}>
        <AnimatePresence initial={false} mode="popLayout">
          {visibleItems.map((item) => (
            <motion.article
              className="work-card"
              key={`${item.type}-${item.slug}`}
              layout
              initial={
                reducedMotion
                  ? false
                  : { opacity: 0, y: readMotionNumber("--work-card-enter-shift") }
              }
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={
                reducedMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: readMotionNumber("--work-card-exit-shift") }
              }
              variants={surfaceVariants}
              whileHover={hoverEnabled && !reducedMotion ? "hover" : undefined}
              transition={transition}
            >
              <Glass className="work-card-shell" elevation={1}>
                <Link
                  href={`/work/${item.slug}`}
                  className={styles.cardLink}
                  aria-label={`View ${item.title}`}
                >
                  <div className={styles.cardArt}>
                    {item.coverSrc ? (
                      <Image
                        className={styles.cardArtImage}
                        src={item.coverSrc}
                        alt={`${item.title} cover`}
                        fill
                        sizes="(min-width: 80rem) 33vw, (min-width: 48rem) 50vw, 100vw"
                      />
                    ) : null}
                    <span className={styles.cardArtTitle}>{item.title}</span>
                    {cardAside(item) ? (
                      <span className={styles.cardArtAside}>{cardAside(item)}</span>
                    ) : null}
                  </div>
                  <motion.div className={styles.cardDetails} variants={cardVariants}>
                    <h2 className="work-card-title">{item.title}</h2>
                    {item.description ? (
                      <p className="work-card-description">{item.description}</p>
                    ) : null}
                    <div
                      className={styles.cardMeta}
                      aria-label={`${item.type === "repo" ? "Repository" : "Project"} details`}
                    >
                      <span>{item.type === "repo" ? "Repository" : "Project"}</span>
                      {itemMeta(item).map((value) => (
                        <span key={value}>{value}</span>
                      ))}
                    </div>
                    {item.tags.length ? (
                      <ul
                        className={styles.cardTags}
                        aria-label={
                          item.type === "repo" ? "Repository topics and language" : "Project tags"
                        }
                      >
                        {item.tags.map((tag) => (
                          <li className="work-tag" key={tag}>
                            {tag}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </motion.div>
                </Link>
              </Glass>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
      {!visibleItems.length ? <p role="status">No matching work items.</p> : null}
      <p className="sr-only" aria-live="polite">
        Showing {visibleItems.length} of {items.length} work items.
      </p>
    </section>
  )
}
