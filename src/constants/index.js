export const myProjects = [
  {
    id: 1,
    title: "CommitHub — Developer Collaboration Platform",
    description:
      "GitHub-inspired full-stack platform supporting repository creation, commit tracking, collaboration, JWT authentication, protected routes, role-based repository visibility, and AWS S3 file storage.",
    subDescription: [
      "Architected a scalable Node.js/Express backend with MongoDB and Mongoose schemas.",
      "Implemented secure JWT authentication, login/signup flows, and protected middleware routes.",
      "Integrated AWS S3 bucket storage for hosting user repositories, commits, and assets.",
      "Designed a responsive React.js interface modeled after GitHub's user experience."
    ],
    href: "https://github.com/knockknock10",
    logo: "/assets/logos/node.svg",
    image: "/assets/projects/accessories.jpg", // Using existing placeholder image
    tags: [
      { id: 1, name: "Node.js", path: "/assets/logos/node.svg" },
      { id: 2, name: "Express", path: "/assets/logos/express.svg" },
      { id: 3, name: "React", path: "/assets/logos/react.svg" },
      { id: 4, name: "MongoDB", path: "/assets/logos/mongodb.svg" },
      { id: 5, name: "AWS S3", path: "/assets/logos/aws.svg" }
    ]
  },
  {
    id: 2,
    title: "Wandera — Travel Listings Platform",
    description:
      "Travel listings platform where users can discover destinations, create listings, upload photos, and share experiences. Includes CRUD operations, MVC architecture, validation, error handling, Cloudinary image storage, Multer uploads, and deployment on Render.",
    subDescription: [
      "Developed MVC architecture patterns for reliable and modular code management.",
      "Integrated Cloudinary API using Multer middleware for optimized image uploads and CDN hosting.",
      "Designed user authentication, review validation, and custom error handling middleware.",
      "Deployed the monolithic app on Render with automated build pipelines."
    ],
    href: "https://github.com/knockknock10",
    logo: "/assets/logos/node.svg",
    image: "/assets/projects/auth-system.jpg", // Using existing placeholder image
    tags: [
      { id: 1, name: "Node.js", path: "/assets/logos/node.svg" },
      { id: 2, name: "Express", path: "/assets/logos/express.svg" },
      { id: 3, name: "MongoDB", path: "/assets/logos/mongodb.svg" },
      { id: 4, name: "Cloudinary", path: "/assets/logos/cloudinary.svg" }
    ]
  }
];

export const mySocials = [
  {
    name: "GitHub",
    href: "https://github.com/knockknock10",
    icon: "/assets/logos/github.svg"
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/-sanjeev-kr/",
    icon: "/assets/logos/javascript.svg" // Using JavaScript SVG as a temporary icon placeholder or custom styled later
  },
  {
    name: "LeetCode",
    href: "https://leetcode.com/u/CYeY2FRKVf/",
    icon: "/assets/logos/leetcode.svg"
  }
];

export const experiences = [
  {
    title: "B.Tech CSE",
    job: "SRM University AP",
    date: "2024-2028",
    contents: [
      "Acquiring fundamental computer science principles: Data Structures, Algorithms, Databases, and Systems Architecture.",
      "Maintained academic excellence with a cumulative CGPA: 8.42 (SGPA: 8.73).",
      "Actively building full-stack applications and exploring cloud-native systems, containerization, and orchestration."
    ]
  },
  {
    title: "Open Source Contributor",
    job: "Webpack JS Organization",
    date: "2025",
    contents: [
      "Contributed to Webpack CLI (PR #20356 - Merged).",
      "Improved CONTRIBUTING.md by clarifying npm audit warnings for development-only dependencies.",
      "Improved onboarding clarity for contributors and developers getting started with webpack repository setup."
    ]
  },
  {
    title: "Certifications",
    job: "Continuous Learning",
    date: "Ongoing",
    contents: [
      "✅ Alpha DSA with Java — Apna College",
      "✅ MERN Stack Development — Apna College",
      "✅ SQL Intermediate — HackerRank",
      "✅ CS50 Python — Harvard University"
    ]
  }
];

export const reviews = [
  {
    name: "Webpack Contributor Review",
    username: "@webpack",
    body: "PR 20356 merged successfully. Great job documenting local setup and audit handling for new contributors.",
    img: "/assets/logos/git.svg"
  },
  {
    name: "MERN Stack Evaluator",
    username: "@apnacollege",
    body: "Demonstrated strong understanding of REST APIs, Express middleware, and MongoDB database modeling.",
    img: "/assets/logos/javascript.svg"
  },
  {
    name: "HackerRank Verification",
    username: "@hackerrank",
    body: "Verified intermediate SQL skills, demonstrating capability in complex queries, joins, and database queries.",
    img: "/assets/logos/sqlite.svg"
  }
];

export const profileInfo = {
  name: "Kr Sanjeev",
  role: "Full-Stack Developer | Backend & DevOps Enthusiast | CSE Student",
  summary:
    "Computer Science Engineering student with strong hands-on experience building production-grade full-stack applications using Node.js, Express.js, MongoDB, and React.js. Experienced with REST APIs, JWT authentication, AWS S3, Cloudinary, and actively expanding into Docker, Kubernetes, Linux, and cloud-native infrastructure.",
  email: "sanjeevkumars.s@srmap.edu.in",
  phone: "+91 9229523848",
  location: "Amaravati, Andhra Pradesh, India",
  resumeLink: "#" // Set to local or mock PDF link
};
