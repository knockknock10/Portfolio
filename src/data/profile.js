export const profileInfo = {
  name: "Kr Sanjeev",
  title: "Engineering Scalable Backend Systems",
  subheading: "Full-Stack Developer • Backend Engineering • DevOps Enthusiast",
  supportingText: "Computer Science student building backend systems, cloud-integrated applications, and production-ready full-stack products.",
  email: "sanjeevkumars.s@srmap.edu.in",
  phone: "+91 9229523848",
  location: "Amaravati, Andhra Pradesh, India",
  resumeLink: "/Kr_Sanjeev_Resume.pdf"
};

export const socials = [
  {
    name: "GitHub",
    href: "https://github.com/knockknock10",
    iconName: "github"
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/-sanjeev-kr/",
    iconName: "linkedin"
  },
  {
    name: "LeetCode",
    href: "https://leetcode.com/u/CYeY2FRKVf/",
    iconName: "leetcode"
  }
];

export const journeyTimeline = [
  {
    year: "2018 - 2024",
    title: "Schooling in Kathmandu",
    institution: "DAV & Paribodh, Nepal",
    description: "Built strong mathematical and logical foundations, self-studying programming concepts and algorithms.",
    details: [
      "Core mathematical modeling",
      "Early software logic foundations"
    ]
  },
  {
    year: "2024 - Present",
    title: "SRM University AP",
    institution: "B.Tech Computer Science Engineering",
    description: "Focusing on data structures, operating systems, database management, and computing theory with an 8.42 CGPA.",
    details: [
      "Consistent academic performance",
      "Deep dive into system-level programming"
    ]
  },
  {
    year: "2024",
    title: "Full-Stack & Backend Systems",
    institution: "Personal Project Portfolio",
    description: "Built scalable REST APIs and full-stack web applications using Node.js, Express, MongoDB, and React.",
    details: [
      "Designed secure user auth systems",
      "Created CRUD and MVC platforms"
    ]
  },
  {
    year: "2025",
    title: "DevOps & Infrastructure",
    institution: "Containerization & Automation",
    description: "Mastered container environments using Docker, orchestrating local Kubernetes clusters and CI/CD pipelines.",
    details: [
      "Multi-stage optimized Docker builds",
      "Automated GitHub Actions workflows"
    ]
  },
  {
    year: "2025",
    title: "webpack Contribution",
    institution: "Webpack CLI (PR #20356)",
    description: "Contributed to webpack-cli, clarifying local development guidelines for millions of JS developers worldwide.",
    details: [
      "Clarified local dependencies warnings",
      "Followed strict production guidelines"
    ]
  }
];

export const skillsData = {
  Backend: [
    { name: "Node.js", logo: "/assets/logos/node.svg", level: "Advanced" },
    { name: "Express.js", logo: "/assets/logos/express.svg", level: "Advanced" },
    { name: "REST APIs", logo: "/assets/logos/node.svg", level: "Advanced" },
    { name: "JWT Auth", logo: "/assets/logos/javascript.svg", level: "Advanced" },
    { name: "Mongoose", logo: "/assets/logos/mongodb.svg", level: "Advanced" }
  ],
  Frontend: [
    { name: "React", logo: "/assets/logos/react.svg", level: "Intermediate" },
    { name: "JavaScript", logo: "/assets/logos/javascript.svg", level: "Advanced" },
    { name: "HTML5", logo: "/assets/logos/html5.svg", level: "Advanced" },
    { name: "CSS3", logo: "/assets/logos/css3.svg", level: "Advanced" },
    { name: "Tailwind CSS", logo: "/assets/logos/tailwindcss.svg", level: "Advanced" }
  ],
  Database: [
    { name: "MongoDB", logo: "/assets/logos/mongodb.svg", level: "Advanced" },
    { name: "SQL", logo: "/assets/logos/sqlite.svg", level: "Intermediate" }
  ],
  "DevOps & Cloud": [
    { name: "Docker", logo: "/assets/logos/docker.svg", level: "Intermediate" },
    { name: "Kubernetes", logo: "/assets/logos/kubernetes.svg", level: "Basic" },
    { name: "Linux", logo: "/assets/logos/linux.svg", level: "Intermediate" },
    { name: "GitHub Actions", logo: "/assets/logos/github.svg", level: "Intermediate" },
    { name: "AWS S3", logo: "/assets/logos/aws.svg", level: "Intermediate" },
    { name: "Cloudinary", logo: "/assets/logos/cloudinary.svg", level: "Intermediate" },
    { name: "Render", logo: "/assets/logos/vitejs.svg", level: "Intermediate" },
    { name: "Vercel", logo: "/assets/logos/vitejs.svg", level: "Intermediate" }
  ],
  Tools: [
    { name: "Git", logo: "/assets/logos/git.svg", level: "Advanced" },
    { name: "GitHub", logo: "/assets/logos/github.svg", level: "Advanced" },
    { name: "Postman", logo: "/assets/logos/postman.svg", level: "Advanced" },
    { name: "VS Code", logo: "/assets/logos/visualstudiocode.svg", level: "Advanced" },
    { name: "npm", logo: "/assets/logos/node.svg", level: "Advanced" }
  ]
};


export const projects = [
  {
    id: "commithub",
    title: "CommitHub — Developer Collaboration Platform",
    description: "GitHub-inspired full-stack platform supporting repository creation, commit tracking, collaboration, JWT authentication, protected routes, role-based repository visibility, and AWS S3 file storage.",
    intro: "A developer-focused collaboration platform modeled after GitHub architecture.",
    architecture: "React frontend communicating with Node.js/Express REST APIs. Leverages AWS S3 for secure, scalable repository artifact and asset storage. Employs Mongoose schemas for complex relation mappings (Users, Repos, Commits, Collaborators) in MongoDB.",
    details: [
      "Architected a scalable Node.js/Express backend with MongoDB and Mongoose schemas.",
      "Implemented secure JWT authentication, login/signup flows, and protected middleware routes.",
      "Integrated AWS S3 bucket storage for hosting user repositories, commits, and assets.",
      "Designed a responsive React.js interface modeled after GitHub's user experience."
    ],
    github: "https://github.com/knockknock10",
    live: "https://github.com/knockknock10",
    image: "/assets/projects/accessories.jpg",
    tags: ["React", "Node.js", "Express", "MongoDB", "AWS S3"]
  },
  {
    id: "wandera",
    title: "Wandera — Travel Listings Platform",
    description: "Travel listings platform where users can discover destinations, create listings, upload photos, and share experiences. Includes CRUD operations, MVC architecture, validation, error handling, Cloudinary image storage, Multer uploads, and deployment on Render.",
    intro: "Monolithic travel listing system designed with focus on clean MVC architecture and error boundary handling.",
    architecture: "Node.js and Express monolith rendering dynamic views. Integrates Multer middleware with Cloudinary API for high-availability image hosting. Follows MVC pattern for clear division of concerns.",
    details: [
      "Developed MVC architecture patterns for reliable and modular code management.",
      "Integrated Cloudinary API using Multer middleware for optimized image uploads and CDN hosting.",
      "Designed user authentication, review validation, and custom error handling middleware.",
      "Deployed the monolithic app on Render with automated build pipelines."
    ],
    github: "https://github.com/knockknock10",
    live: "https://github.com/knockknock10",
    image: "/assets/projects/auth-system.jpg",
    tags: ["Node.js", "Express", "MongoDB", "Cloudinary", "MVC"]
  },
  {
    id: "ecommerce-cicd",
    title: "E-Commerce Platform with CI/CD",
    description: "Production-ready containerized microservices application featuring a complete DevOps pipeline, including local Kubernetes orchestration, automated testing, and zero-downtime deployment strategies.",
    intro: "Cloud-native commerce platform designed for high availability and continuous delivery.",
    architecture: "Express microservices packaged via Docker, orchestrated locally via Kubernetes (Skaffold/Kustomize). Fully automated CI/CD pipeline built with GitHub Actions, pushing validated images to container registry.",
    details: [
      "Containerized application components with optimized multi-stage Docker builds to minimize image sizes.",
      "Configured Kubernetes manifests including Services, Deployments, and ConfigMaps for orchestration.",
      "Developed a complete GitHub Actions workflow executing automated linting, unit testing, and registry pushes.",
      "Established centralized logging and basic health-check monitoring for service reliability."
    ],
    github: "https://github.com/knockknock10",
    live: "https://github.com/knockknock10",
    image: "/assets/projects/accessories.jpg", // Using standard visual placeholder
    tags: ["Docker", "Kubernetes", "GitHub Actions", "Node.js", "CI/CD"]
  },
  {
    id: "novafest",
    title: "NOVAFEST — Project Showcase & Management Hub",
    description: "Platform designed to manage and display university and hackathon projects. Features role-based access control, project submission verification, voting systems, and detailed project detail pages.",
    intro: "Hackathon project management system supporting interactive evaluation and real-time showcase.",
    architecture: "React.js client integrated with an Express/MongoDB backend. Uses Tailwind CSS for grid layouts. Includes real-time project filtering and review flows.",
    details: [
      "Created a robust dashboard for organizers to manage project submissions and details.",
      "Implemented secure authentication and authorization enabling verified project reviews.",
      "Built dynamic search, filtering, and tag systems for fast project exploration.",
      "Optimized query performance for fetching complex relations (Teams, Projects, Judges)."
    ],
    github: "https://github.com/knockknock10",
    live: "https://github.com/knockknock10",
    image: "/assets/projects/auth-system.jpg", // Using standard visual placeholder
    tags: ["React", "Node.js", "Express", "MongoDB", "Tailwind"]
  }
];

export const openSourceInfo = {
  title: "Open Source & Contributions",
  highlight: {
    repo: "webpack/webpack-cli",
    title: "PR #20356 — Merged",
    url: "https://github.com/webpack/webpack-cli/pull/20356",
    subtext: "webpack is a popular module bundler for JavaScript with over 28 Million weekly downloads. Contributed to its command-line interface (CLI)."
  },
  impact: [
    "Improved webpack-cli documentation (CONTRIBUTING.md) by clarifying the handling of npm audit warnings for development-only dependencies.",
    "Ensured new developers and contributors do not get blocked by security scanner reports on non-production dependencies during local installation setup.",
    "Collaborated with project maintainers to adhere to strict contribution guidelines, including CLA verification and structured commit requirements."
  ]
};

export const experienceInfo = [
  {
    role: "Digital Marketing Intern",
    company: "IRHS (Institute of Research in Humanities & Science)",
    period: "May 2024 - July 2024",
    impact: [
      "Architected automated reporting scripts to track performance across multi-platform ad campaign analytics, reducing manual dashboard tracking time.",
      "Optimized lead funnel analytics to track conversion KPIs, providing data-driven recommendations that enhanced outreach efficiency.",
      "Collaborated with developers to align website landing page structures with analytics tag managers for precise user event tracking."
    ]
  },
  {
    role: "Infrastructure & Automation Projects",
    company: "Independent Learning / Academics",
    period: "Ongoing",
    impact: [
      "Designed and deployed customized GitHub Actions workflows to automate code quality verification, unit tests, and production release packaging.",
      "Built Dockerized development runtimes mirroring production environments to eliminate 'works on my machine' configuration drift.",
      "Researched Kubernetes ingress control, system telemetry, and load balancing configurations for high-availability backend microservices."
    ]
  }
];

export const testimonials = [
  {
    name: "Webpack Contributor Review",
    username: "@webpack/webpack-cli",
    body: "PR #20356 merged successfully. Great contribution — clarified npm audit warnings for local devDependencies. Helps new contributors onboard faster.",
    img: "/assets/logos/git.svg"
  },
  {
    name: "MERN Stack Evaluator",
    username: "@apnacollege",
    body: "Strong understanding of REST APIs, Express middleware chains, JWT flows, and MongoDB aggregation pipelines. Production-grade knowledge.",
    img: "/assets/logos/javascript.svg"
  },
  {
    name: "HackerRank Verification",
    username: "@hackerrank",
    body: "Intermediate SQL certification verified — complex JOIN queries, window functions, and query optimization all demonstrated competently.",
    img: "/assets/logos/sqlite.svg"
  },
  {
    name: "Docker & Containers",
    username: "@docker-community",
    body: "Multi-stage build optimization, volume mounting, and docker-compose orchestration applied cleanly in production-grade configurations.",
    img: "/assets/logos/docker.svg"
  },
  {
    name: "GitHub Academic Evaluator",
    username: "@github-education",
    body: "Active contributor with structured commit history, semantic branching, and fully automated GitHub Actions CI/CD pipelines.",
    img: "/assets/logos/github.svg"
  },
  {
    name: "SRM University AP",
    username: "@srmap-cse-faculty",
    body: "Exceptional academic performance in Data Structures, Operating Systems, and Database Management. CGPA 8.42 with consistent improvement each semester.",
    img: "/assets/logos/javascript.svg"
  },
  {
    name: "Node.js Architecture Review",
    username: "@nodejs-community",
    body: "Solid command of asynchronous patterns, event loop design, and middleware architecture in Express — applied across multiple production applications.",
    img: "/assets/logos/node.svg"
  },
  {
    name: "AWS S3 Integration",
    username: "@aws-community",
    body: "Correctly configured S3 bucket policies, IAM scoped permissions, and Node.js SDK integration for secure file storage across projects.",
    img: "/assets/logos/aws.svg"
  }
];
