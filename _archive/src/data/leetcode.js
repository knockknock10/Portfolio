/**
 * LeetCode configuration — single source of truth for problem-solving identity and verified statistics.
 *
 * HOW TO CONFIGURE:
 * 1. Set your verified LeetCode username in the `username` field below.
 *    - Find it at https://leetcode.com/u/<your-username>/
 *    - The profile URL will be derived automatically: https://leetcode.com/u/<username>/
 * 2. If you have a verified statistics snapshot, fill in the `stats` object.
 *    - All stat fields are OPTIONAL — omit or set to `null` if unverified.
 *    - Do NOT guess or estimate values. Only use numbers you have personally verified.
 *    - The `verifiedAt` timestamp MUST reflect when YOU last verified these numbers.
 *      Use ISO 8601 format (e.g., '2026-10-09T00:00:00Z').
 *    - The `source` field should describe where the data came from
 *      (e.g., 'LeetCode profile page', 'LeetCode API', 'manual verification').
 * 3. If no verified snapshot exists yet, leave `stats` as `null` or omit fields.
 *    The UI will gracefully show only the profile link and a clear notice.
 *
 * VALIDATION RULES (enforced at display time):
 * - If `totalSolved` is provided, it MUST equal `easySolved + mediumSolved + hardSolved`.
 * - If the above check fails, the affected summary is suppressed and a dev-only warning is logged.
 * - `null`/missing values are never displayed as zeros.
 * - No fake/example values in production.
 */

export const leetcodeConfig = {
  username: 'knockknock10',
  displayName: null,
  avatarUrl: null,
  stats: null,
};

/**
 * Derive the profile URL from the configured username.
 * Returns `null` if username is not set.
 */
export function getLeetCodeProfileUrl(config) {
  if (!config) config = leetcodeConfig;
  if (!config.username) return null;
  return "https://leetcode.com/u/" + config.username + "/";
}

/**
 * Validate stats for internal consistency.
 * Returns { valid: boolean, issues: string[] }.
 * In development, issues are logged to console.
 */
export function validateStats(stats) {
  if (!stats) return { valid: true, issues: [] };

  var issues = [];

  var totalSolved = stats.totalSolved;
  var easySolved = stats.easySolved;
  var mediumSolved = stats.mediumSolved;
  var hardSolved = stats.hardSolved;

  if (
    totalSolved != null &&
    easySolved != null &&
    mediumSolved != null &&
    hardSolved != null
  ) {
    var sum = (easySolved ?? 0) + (mediumSolved ?? 0) + (hardSolved ?? 0);
    if (totalSolved !== sum) {
      issues.push(
        "Total solved (" +
        totalSolved +
        ") does not match sum of difficulties (" +
        sum +
        ": easy=" +
        easySolved +
        ", medium=" +
        mediumSolved +
        ", hard=" +
        hardSolved +
        ")"
      );
    }
  }

  // Non-negative checks
  var nonNegativeFields = [
    ["totalSolved", totalSolved],
    ["easySolved", easySolved],
    ["mediumSolved", mediumSolved],
    ["hardSolved", hardSolved],
    ["contestRating", stats.contestRating],
    ["globalRanking", stats.globalRanking],
    ["contestsAttended", stats.contestsAttended],
    ["currentStreak", stats.currentStreak],
    ["maxStreak", stats.maxStreak],
  ];

  for (var i = 0; i < nonNegativeFields.length; i++) {
    var field = nonNegativeFields[i][0];
    var value = nonNegativeFields[i][1];
    if (value != null && value < 0) {
      issues.push(field + " must be non-negative (got " + value + ")");
    }
  }

  return { valid: issues.length === 0, issues: issues };
}

/**
 * Format the verified timestamp for display.
 * Returns a human-readable string like "Stats last verified: 9 October 2026"
 * or `null` if no timestamp available.
 */
export function formatVerifiedAt(stats) {
  if (!stats || !stats.verifiedAt) return null;
  try {
    var date = new Date(stats.verifiedAt);
    if (isNaN(date.getTime())) return null;
    return (
      "Stats last verified: " +
      date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "UTC",
      })
    );
  } catch {
    return null;
  }
}