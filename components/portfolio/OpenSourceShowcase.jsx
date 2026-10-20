"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "./OpenSourceShowcase.module.css";
import { publicUrl } from "@/lib/public-url";

const githubProfile = "https://github.com/knockknock10";
const allPullRequests = "https://github.com/pulls?q=is%3Apr+author%3Aknockknock10";
const PAGE_SIZE = 20;

const organizationNames = {
  "kestra-io": "Kestra",
  apache: "Apache",
  "wanaku-ai": "Wanaku AI",
  aevor: "Aevor",
  podiom: "Podiom",
  opennsw: "OpenNSW",
  ansvisor: "Ansvisor",
  knockknock10: "My repositories",
};

const fallbackContributions = [
  { id: "kestra-databricks-290", owner: "kestra-io", repository: "plugin-databricks", title: "DBFS trigger support", number: 290, status: "Merged", url: "https://github.com/kestra-io/plugin-databricks/pull/290" },
  { id: "kestra-snyk-27", owner: "kestra-io", repository: "plugin-snyk", title: "Issue listing and polling", number: 27, status: "Open", url: "https://github.com/kestra-io/plugin-snyk/pull/27" },
  { id: "kestra-fabric-39", owner: "kestra-io", repository: "plugin-microsoft-fabric", title: "Power BI dataset refresh on Fabric", number: 39, status: "Open", url: "https://github.com/kestra-io/plugin-microsoft-fabric/pull/39" },
  { id: "camel-k-6866", owner: "apache", repository: "camel-k", title: "NetworkPolicy cleanup", number: 6866, status: "Merged", url: "https://github.com/apache/camel-k/pull/6866" },
  { id: "wanaku-245", owner: "wanaku-ai", repository: "wanaku-tests", title: "Policy lifecycle tests", number: 245, status: "Merged", url: "https://github.com/wanaku-ai/wanaku-tests/pull/245" },
  { id: "aevor-114", owner: "Aevor", repository: "platform", title: "AI limit package", number: 114, status: "Merged", url: "https://github.com/Aevor/platform/pull/114" },
  { id: "aevor-105", owner: "Aevor", repository: "platform", title: "Pull-request handlers", number: 105, status: "Merged", url: "https://github.com/Aevor/platform/pull/105" },
  { id: "podiom-335", owner: "Podiom", repository: "Podiom", title: "Native activity tests", number: 335, status: "Merged", url: "https://github.com/Podiom/Podiom/pull/335" },
  { id: "open-nsw-263", owner: "OpenNSW", repository: "core", title: "Integration test work", number: 263, status: "Open", url: "https://github.com/OpenNSW/core/pull/263" },
  { id: "open-nsw-265", owner: "OpenNSW", repository: "core", title: "Database test fix", number: 265, status: "Open", url: "https://github.com/OpenNSW/core/pull/265" },
  { id: "ansvisor-970", owner: "ansvisor", repository: "ansvisor", title: "Agent-active-brand", number: 970, status: "Merged", url: "https://github.com/ansvisor/ansvisor/pull/970" },
  { id: "terraform-308", owner: "kestra-io", repository: "terraform-provider-kestra", title: "Import resource listing", number: 308, status: "Merged", url: "https://github.com/kestra-io/terraform-provider-kestra/pull/308" },
];

function ownerLabel(owner) {
  return organizationNames[owner.toLowerCase()] ??
    owner.split(/[-_.]+/).filter(Boolean).map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ");
}

function ownerUrl(owner) {
  return `https://github.com/${encodeURIComponent(owner)}`;
}

function itemStatus(item) {
  if (item.status === "Merged" || item.mergedAt) return "Merged";
  if (item.state === "open" || item.status === "Open") return "Open";
  return "Closed";
}

function safePublicPullRequest(item) {
  if (
    !item ||
    typeof item.owner !== "string" ||
    !/^[A-Za-z0-9-]+$/.test(item.owner) ||
    typeof item.repository !== "string" ||
    !/^[A-Za-z0-9._-]+$/.test(item.repository) ||
    typeof item.title !== "string" ||
    !Number.isInteger(item.number) ||
    item.number < 1 ||
    typeof item.url !== "string"
  ) return null;

  let url;
  try {
    url = new URL(item.url);
  } catch {
    return null;
  }

  if (
    url.protocol !== "https:" ||
    url.hostname !== "github.com" ||
    url.pathname !== `/${item.owner}/${item.repository}/pull/${item.number}`
  ) return null;

  return {
    id: `${item.owner}/${item.repository}#${item.number}`,
    owner: item.owner,
    repository: item.repository,
    number: item.number,
    title: item.title.trim(),
    url: url.href,
    state: item.state === "open" ? "open" : "closed",
    mergedAt: typeof item.mergedAt === "string" ? item.mergedAt : null,
    createdAt: typeof item.createdAt === "string" ? item.createdAt : null,
    updatedAt: typeof item.updatedAt === "string" ? item.updatedAt : null,
    status: ["Merged", "Open", "Closed"].includes(item.status) ? item.status : undefined,
  };
}

function formatDate(value) {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(date);
}

function GitHubMark({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path fill="currentColor" d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.03c-3.1.67-3.76-1.31-3.76-1.31-.5-1.28-1.24-1.62-1.24-1.62-1.02-.7.08-.69.08-.69 1.13.08 1.72 1.16 1.72 1.16 1 1.72 2.62 1.22 3.26.94.1-.73.4-1.22.71-1.5-2.48-.28-5.09-1.24-5.09-5.52 0-1.22.44-2.22 1.16-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.05 1.15a10.6 10.6 0 0 1 5.55 0c2.11-1.44 3.05-1.15 3.05-1.15.61 1.54.23 2.68.11 2.96.72.78 1.16 1.78 1.16 3 0 4.29-2.62 5.24-5.11 5.51.4.35.76 1.03.76 2.08v3.08c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" />
    </svg>
  );
}

function OrganizationAvatar({ owner, name, large = false }) {
  const [failed, setFailed] = useState(false);

  return (
    <span className={large ? styles.organizationAvatarLarge : styles.organizationAvatar} aria-hidden="true">
      {!failed ? (
        <img src={`https://github.com/${encodeURIComponent(owner)}.png?size=96`} alt="" loading="lazy" onError={() => setFailed(true)} />
      ) : (
        <span>{name.charAt(0).toUpperCase()}</span>
      )}
    </span>
  );
}

function ContributionRow({ item }) {
  const status = itemStatus(item);
  const dateLabel = formatDate(item.updatedAt) ?? formatDate(item.createdAt);

  return (
    <li className={styles.contributionRow}>
      <a className={styles.contributionRowLink} href={item.url} target="_blank" rel="noreferrer">
        <span className={styles.contributionRowMain}>
          <span className={styles.contributionRepository}>{item.repository}<span>/</span> <span>#{item.number}</span></span>
          <strong>{item.title}</strong>
          <small>{dateLabel ? `Updated ${dateLabel}` : "Open pull request details on GitHub"}</small>
        </span>
        <span className={styles.contributionRowEnd}>
          <span className={styles.contributionStatus} data-status={status.toLowerCase()}>{status}</span>
          <span className={styles.contributionArrow} aria-hidden="true">↗</span>
        </span>
      </a>
    </li>
  );
}

export default function OpenSourceShowcase() {
  const [contributions, setContributions] = useState(fallbackContributions);
  const [selectedOwner, setSelectedOwner] = useState("kestra-io");
  const [organizationQuery, setOrganizationQuery] = useState("");
  const [pullRequestQuery, setPullRequestQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [loadState, setLoadState] = useState("loading");
  const [indexMeta, setIndexMeta] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    fetch(publicUrl("/api/public-pull-requests.json"), { signal: controller.signal })
      .then((response) => response.ok ? response.json() : Promise.reject(new Error("Public pull-request index is unavailable")))
      .then((payload) => {
        if (!payload?.available || !Array.isArray(payload.contributions)) {
          throw new Error("Public pull-request index was not generated");
        }

        const safeItems = payload.contributions.map(safePublicPullRequest).filter(Boolean);
        if (payload.contributions.length > 0 && safeItems.length === 0) {
          throw new Error("Public pull-request index did not pass validation");
        }

        if (safeItems.length === 0) {
          setLoadState("fallback");
          return;
        }

        const ownerCounts = new Map();
        safeItems.forEach((item) => ownerCounts.set(item.owner.toLowerCase(), (ownerCounts.get(item.owner.toLowerCase()) ?? 0) + 1));
        const preferredOwner = [...ownerCounts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? "kestra-io";

        setContributions(safeItems);
        setSelectedOwner((current) => safeItems.some((item) => item.owner.toLowerCase() === current.toLowerCase()) ? current : preferredOwner);
        setIndexMeta({
          generatedAt: typeof payload.generatedAt === "string" ? payload.generatedAt : null,
          reportedTotal: Number.isFinite(payload.reportedTotal) ? payload.reportedTotal : safeItems.length,
          indexedCount: Number.isFinite(payload.indexedCount) ? payload.indexedCount : safeItems.length,
          truncated: Boolean(payload.truncated),
          incompleteResults: Boolean(payload.incompleteResults),
        });
        setLoadState("live");
      })
      .catch((error) => {
        if (error.name !== "AbortError") setLoadState("fallback");
      });

    return () => controller.abort();
  }, []);

  const organizations = useMemo(() => {
    const grouped = new Map();

    contributions.forEach((item) => {
      const key = item.owner.toLowerCase();
      if (!grouped.has(key)) grouped.set(key, { owner: item.owner, items: [] });
      grouped.get(key).items.push(item);
    });

    return [...grouped.values()]
      .map((organization) => ({
        ...organization,
        name: ownerLabel(organization.owner),
        mergedCount: organization.items.filter((item) => itemStatus(item) === "Merged").length,
        openCount: organization.items.filter((item) => itemStatus(item) === "Open").length,
        closedCount: organization.items.filter((item) => itemStatus(item) === "Closed").length,
      }))
      .sort((a, b) => b.items.length - a.items.length || a.name.localeCompare(b.name));
  }, [contributions]);

  const filteredOrganizations = useMemo(() => {
    const query = organizationQuery.trim().toLowerCase();
    if (!query) return organizations;
    return organizations.filter((organization) =>
      organization.name.toLowerCase().includes(query) || organization.owner.toLowerCase().includes(query),
    );
  }, [organizations, organizationQuery]);

  const selectedOrganization = organizations.find((organization) => organization.owner.toLowerCase() === selectedOwner.toLowerCase()) ?? organizations[0] ?? null;

  const filteredPullRequests = useMemo(() => {
    if (!selectedOrganization) return [];
    const query = pullRequestQuery.trim().toLowerCase();

    return selectedOrganization.items
      .filter((item) => statusFilter === "All" || itemStatus(item) === statusFilter)
      .filter((item) => !query || item.title.toLowerCase().includes(query) || item.repository.toLowerCase().includes(query) || String(item.number).includes(query))
      .sort((a, b) => {
        const dateA = a.updatedAt ? Date.parse(a.updatedAt) : a.createdAt ? Date.parse(a.createdAt) : 0;
        const dateB = b.updatedAt ? Date.parse(b.updatedAt) : b.createdAt ? Date.parse(b.createdAt) : 0;
        return dateB - dateA || b.number - a.number;
      });
  }, [selectedOrganization, pullRequestQuery, statusFilter]);

  const visiblePullRequests = filteredPullRequests.slice(0, visibleCount);
  const indexedLabel = loadState === "loading"
    ? "Loading the public contribution index…"
    : loadState === "fallback"
      ? "Showing the curated contribution list; the full index could not be refreshed."
      : `${(indexMeta?.indexedCount ?? contributions.length).toLocaleString()} public pull requests indexed${indexMeta?.truncated ? ` (showing the first ${indexMeta.indexedCount.toLocaleString()} of ${indexMeta.reportedTotal.toLocaleString()})` : ""}${indexMeta?.incompleteResults ? " · GitHub reported an incomplete search result" : ""}.`;

  function selectOrganization(owner) {
    setSelectedOwner(owner);
    setPullRequestQuery("");
    setStatusFilter("All");
    setVisibleCount(PAGE_SIZE);
  }

  function updateStatusFilter(status) {
    setStatusFilter(status);
    setVisibleCount(PAGE_SIZE);
  }

  return (
    <section className={styles.openSourceSection} id="open-source" aria-labelledby="open-source-heading" tabIndex={-1}>
      <header className={styles.openSourceHeader}>
        <div>
          <p className={styles.openSourceEyebrow}>OPEN SOURCE <span /> CONTRIBUTION INDEX</p>
          <h2 id="open-source-heading">Contributions, <span>by organization.</span></h2>
          <p className={styles.openSourceLead}>Choose an organization to see the public pull requests I have opened there.</p>
        </div>
        <a className={styles.profileLink} href={githubProfile} target="_blank" rel="noreferrer">
          <GitHubMark /> GitHub profile <span aria-hidden="true">↗</span>
        </a>
      </header>

      <div className={styles.indexMetaLine} aria-live="polite">
        <span className={loadState === "live" ? styles.indexStatusLive : styles.indexStatus} aria-hidden="true" />
        <span>{indexedLabel}</span>
        <a href={allPullRequests} target="_blank" rel="noreferrer">View all on GitHub ↗</a>
      </div>

      <div className={styles.organizationExplorer}>
        <aside className={styles.organizationRail} aria-label="Filter contributions by organization">
          <div className={styles.organizationRailHeading}>
            <span>ORGANIZATIONS</span>
            <strong>{organizations.length.toLocaleString()}</strong>
          </div>
          <label className={styles.visuallyHidden} htmlFor="organization-search">Find an organization</label>
          <input
            id="organization-search"
            className={styles.organizationSearch}
            type="search"
            value={organizationQuery}
            onChange={(event) => setOrganizationQuery(event.target.value)}
            placeholder="Find an organization…"
          />

          <div className={styles.organizationList} role="list">
            {filteredOrganizations.map((organization) => {
              const isSelected = organization.owner.toLowerCase() === (selectedOrganization?.owner ?? "").toLowerCase();

              return (
                <button
                  key={organization.owner.toLowerCase()}
                  type="button"
                  aria-pressed={isSelected}
                  className={isSelected ? styles.organizationButtonActive : styles.organizationButton}
                  onClick={() => selectOrganization(organization.owner)}
                >
                  <OrganizationAvatar owner={organization.owner} name={organization.name} />
                  <span className={styles.organizationButtonText}>
                    <strong>{organization.name}</strong>
                    <small>@{organization.owner}</small>
                  </span>
                  <span className={styles.organizationCount}>{organization.items.length.toLocaleString()}</span>
                </button>
              );
            })}
            {filteredOrganizations.length === 0 ? <p className={styles.organizationEmpty}>No organization matches that search.</p> : null}
          </div>
        </aside>

        <section className={styles.organizationDetail} aria-labelledby="selected-organization-heading">
          {selectedOrganization ? (
            <>
              <header className={styles.organizationDetailHeader}>
                <OrganizationAvatar owner={selectedOrganization.owner} name={selectedOrganization.name} large />
                <div className={styles.organizationDetailIdentity}>
                  <span className={styles.detailEyebrow}>CONTRIBUTIONS TO</span>
                  <h3 id="selected-organization-heading">{selectedOrganization.name}</h3>
                  <a href={ownerUrl(selectedOrganization.owner)} target="_blank" rel="noreferrer">@{selectedOrganization.owner} <span aria-hidden="true">↗</span></a>
                </div>
                <div className={styles.organizationDetailMetrics} aria-label="Pull request summary">
                  <span><strong>{selectedOrganization.items.length.toLocaleString()}</strong><small>Total</small></span>
                  <span><strong>{selectedOrganization.mergedCount.toLocaleString()}</strong><small>Merged</small></span>
                  <span><strong>{selectedOrganization.openCount.toLocaleString()}</strong><small>Open</small></span>
                </div>
              </header>

              <div className={styles.pullRequestTools}>
                <div className={styles.statusFilters} role="group" aria-label="Filter pull requests by status">
                  {[
                    { label: "All", count: selectedOrganization.items.length },
                    { label: "Merged", count: selectedOrganization.mergedCount },
                    { label: "Open", count: selectedOrganization.openCount },
                    { label: "Closed", count: selectedOrganization.closedCount },
                  ].map((filter) => (
                    <button
                      key={filter.label}
                      type="button"
                      aria-pressed={statusFilter === filter.label}
                      className={statusFilter === filter.label ? styles.statusFilterActive : styles.statusFilter}
                      onClick={() => updateStatusFilter(filter.label)}
                    >
                      {filter.label}<span>{filter.count.toLocaleString()}</span>
                    </button>
                  ))}
                </div>
                <label className={styles.visuallyHidden} htmlFor="pull-request-search">Search this organization's pull requests</label>
                <input
                  id="pull-request-search"
                  className={styles.pullRequestSearch}
                  type="search"
                  value={pullRequestQuery}
                  onChange={(event) => {
                    setPullRequestQuery(event.target.value);
                    setVisibleCount(PAGE_SIZE);
                  }}
                  placeholder="Search this organization…"
                />
              </div>

              <div className={styles.pullRequestListRegion} aria-live="polite">
                {filteredPullRequests.length > 0 ? (
                  <ul className={styles.pullRequestList}>
                    {visiblePullRequests.map((item) => <ContributionRow key={item.id} item={item} />)}
                  </ul>
                ) : (
                  <div className={styles.noPullRequests}>
                    <strong>No pull requests found.</strong>
                    <span>Try another status or search term.</span>
                  </div>
                )}
              </div>

              <footer className={styles.pullRequestFooter}>
                <span>Showing {Math.min(visibleCount, filteredPullRequests.length).toLocaleString()} of {filteredPullRequests.length.toLocaleString()}</span>
                {visibleCount < filteredPullRequests.length ? (
                  <button type="button" className={styles.showMoreButton} onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}>
                    Show 20 more <span aria-hidden="true">↓</span>
                  </button>
                ) : (
                  <a href={`https://github.com/${selectedOrganization.owner}/?tab=repositories`} target="_blank" rel="noreferrer">Explore repositories ↗</a>
                )}
              </footer>
            </>
          ) : (
            <div className={styles.noPullRequests}>
              <strong>No contribution data available.</strong>
              <span>Visit the <a href={allPullRequests} target="_blank" rel="noreferrer">public pull-request list on GitHub</a>.</span>
            </div>
          )}
        </section>
      </div>

      <p className={styles.sourceNote}>
        Public pull requests authored by <a href={githubProfile} target="_blank" rel="noreferrer">@knockknock10</a>. The index is generated during site deployment; pull requests created after the last deployment will appear on the next build.
      </p>
    </section>
  );
}
