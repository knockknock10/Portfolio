/**
 * Extended GraphQL queries for Phase 4 — organization discovery, PRs, issues, timeline.
 */

// Discover organizations from PRs authored by the user
export const ORG_DISCOVERY_QUERY = `
  query ($login: String!, $first: Int = 100) {
    user(login: $login) {
      pullRequests(first: $first, orderBy: {field: CREATED_AT, direction: DESC}) {
        nodes {
          repository {
            nameWithOwner
            owner {
              login
              avatarUrl
              __typename
              ... on Organization {
                name
                description
                url
              }
            }
          }
          number
          title
          state
          isDraft
          createdAt
          updatedAt
          mergedAt
          closedAt
          url
          author {
            login
          }
          labels(first: 10) {
            nodes {
              name
            }
          }
        }
      }
      issues(first: $first, orderBy: {field: CREATED_AT, direction: DESC}) {
        nodes {
          repository {
            nameWithOwner
            owner {
              login
              avatarUrl
              __typename
              ... on Organization {
                name
                description
                url
              }
            }
          }
          number
          title
          state
          createdAt
          updatedAt
          closedAt
          url
          author {
            login
          }
          assignees(first: 5) {
            nodes {
              login
            }
          }
          labels(first: 10) {
            nodes {
              name
            }
          }
        }
      }
      repositoriesContributedTo(first: 50, includeUserRepositories: false) {
        nodes {
          nameWithOwner
          owner {
            login
            avatarUrl
            __typename
            ... on Organization {
              name
              description
              url
            }
          }
        }
      }
    }
  }
`

// Detailed PR data for a specific organization
export const ORG_PRS_QUERY = `
  query ($login: String!, $first: Int = 50, $after: String) {
    user(login: $login) {
      pullRequests(first: $first, after: $after, orderBy: {field: CREATED_AT, direction: DESC}) {
        pageInfo { hasNextPage endCursor }
        nodes {
          repository {
            name
            nameWithOwner
            owner {
              login
              __typename
            }
          }
          number
          title
          state
          isDraft
          createdAt
          updatedAt
          mergedAt
          closedAt
          url
          author {
            login
          }
          labels(first: 10) { nodes { name } }
        }
      }
    }
  }
`

// Detailed issue data for a specific organization
export const ORG_ISSUES_QUERY = `
  query ($login: String!, $org: String!, $first: Int = 50, $after: String) {
    user(login: $login) {
      issues(first: $first, after: $after, orderBy: {field: CREATED_AT, direction: DESC}) {
        pageInfo { hasNextPage endCursor }
        nodes {
          repository {
            name
            nameWithOwner
            owner {
              login
              __typename
            }
          }
          number
          title
          state
          createdAt
          updatedAt
          closedAt
          url
          author {
            login
          }
          assignees(first: 5) { nodes { login } }
          labels(first: 10) { nodes { name } }
        }
      }
    }
  }
`

// Contribution timeline — recent PRs, issues across all orgs
export const CONTRIBUTION_TIMELINE_QUERY = `
  query ($login: String!, $first: Int = 30) {
    user(login: $login) {
      pullRequests(first: $first, orderBy: {field: CREATED_AT, direction: DESC}) {
        nodes {
          repository {
            nameWithOwner
            owner { login }
          }
          number
          title
          state
          isDraft
          createdAt
          mergedAt
          url
        }
      }
      issues(first: $first, orderBy: {field: CREATED_AT, direction: DESC}) {
        nodes {
          repository {
            nameWithOwner
            owner { login }
          }
          number
          title
          state
          createdAt
          url
          assignees(first: 5) { nodes { login } }
        }
      }
    }
  }
`

// Organization avatar/description lookup
export const ORG_DETAIL_QUERY = `
  query ($login: String!) {
    organization(login: $login) {
      login
      name
      description
      avatarUrl
      url
      repositories(first: 100, orderBy: {field: STARGAZERS, direction: DESC}, privacy: PUBLIC) {
        nodes {
          name
          nameWithOwner
          description
          primaryLanguage { name color }
          stargazerCount
          forkCount
          updatedAt
          url
        }
      }
    }
  }
`