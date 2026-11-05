# Certificate files

Drop certificate scans or exported PDF certificates in this folder.

Supported formats: `.pdf`, `.png`, `.jpg`, `.jpeg`, `.webp`, `.gif`, `.avif`, and `.svg`.

Files in this folder are discovered automatically by the portfolio build and displayed in the Certifications gallery. Use clear filenames such as `aws-cloud-practitioner.pdf` or `hackerrank-java-basic.png`; the filename becomes the visible title until you add the issuer, date, credential ID, skills, and verification URL to `PORTFOLIO-DATA.md`.

Only add certificates that you actually earned. Do not put private documents or files containing information you do not want published here—everything in `public/` is publicly accessible.

## Adding certificates to the site

1. Put the image or PDF in this folder (for example `aws-cloud-practitioner.png`).
2. The Certificates section on the home page appears automatically as soon as there is at least one file.
3. To show the issuer, date, skills and a verify link, add an entry to `## SECTION 11 — CERTIFICATIONS` in `PORTFOLIO-DATA.md` as a JSON list between `~~~json` fences, using the fields `title`, `issuer`, `issueDate`, `credentialId`, `credentialUrl`, `skillsCovered` and `certificateImage` (for example `"certificateImage": "certificates/aws-cloud-practitioner.png"`).
