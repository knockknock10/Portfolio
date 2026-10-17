"use client";

import styles from "./GitHubAchievementShelf.module.css";

const achievements = [
  {
    title: "Pull Shark",
    description: "Merged pull requests",
    image: "https://github.githubassets.com/assets/pull-shark-silver-0643f87ac9fd.png",
    initials: "PS",
    count: "×3",
  },
  {
    title: "Galaxy Brain",
    description: "Accepted discussion answers",
    image: "https://github.githubassets.com/assets/galaxy-brain-default-847262c21056.png",
    initials: "GB",
  },
  {
    title: "Quickdraw",
    description: "Fast issue or pull-request close",
    image: "https://github.githubassets.com/assets/quickdraw-default-39c6aec8ff89.png",
    initials: "QD",
  },
  {
    title: "Pair Extraordinaire",
    description: "Co-authored merged pull request",
    image: "https://github.githubassets.com/assets/pair-extraordinaire-default-579438a20e01.png",
    initials: "PE",
  },
  {
    title: "YOLO",
    description: "Merged pull request without review",
    image: "https://github.githubassets.com/assets/yolo-default-be0bbff04951.png",
    initials: "YO",
  },
];

export default function GitHubAchievementShelf() {
  return (
    <section className={styles.shelf} aria-labelledby="github-achievements-heading">
      <div className={styles.shelfHeader}>
        <div>
          <p className={styles.eyebrow}>PROFILE MILESTONES</p>
          <h3 id="github-achievements-heading">GitHub achievements</h3>
        </div>
        <a href="https://github.com/knockknock10?tab=achievements" target="_blank" rel="noreferrer">
          View profile <span aria-hidden="true">↗</span>
        </a>
      </div>
      <div className={styles.badgeRow}>
        {achievements.map((achievement) => (
          <a
            key={achievement.title}
            className={styles.badgeCard}
            href="https://github.com/knockknock10?tab=achievements"
            target="_blank"
            rel="noreferrer"
            title={achievement.title + " — " + achievement.description}
            aria-label={achievement.title + (achievement.count ? " " + achievement.count : "") + " GitHub achievement"}
          >
            <span className={styles.badgeArt}>
              <span className={styles.badgeFallback} aria-hidden="true">{achievement.initials}</span>
              <img
                src={achievement.image}
                alt=""
                loading="lazy"
                onError={(event) => { event.currentTarget.style.display = "none"; }}
              />
              {achievement.count ? <span className={styles.badgeCount}>{achievement.count}</span> : null}
            </span>
            <strong>{achievement.title}</strong>
          </a>
        ))}
      </div>
    </section>
  );
}
