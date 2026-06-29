import { JobDescription, Candidate } from './types';

export const mockJobs: JobDescription[] = [
  {
    id: "job-1",
    title: "Senior Full-Stack Engineer",
    department: "Engineering",
    location: "San Francisco, CA (Hybrid)",
    type: "Full-time",
    experienceLevel: "Senior (5-8+ years)",
    rawText: "We are looking for a Senior Full-Stack Engineer to join our core team. You will lead development on React/Vite frontends, Node.js API services, and cloud architecture. Key requirements: strong TypeScript skills, experience with modern CSS frameworks (Tailwind), databases (PostgreSQL/MongoDB), and scalable system design. Excellent communication skills and mentor mindset are crucial.",
    skillsRequired: ["React", "Node.js", "TypeScript", "Tailwind CSS", "PostgreSQL"],
    skillsPreferred: ["Docker", "AWS", "GraphQL", "Vite", "System Design"],
    domainExpertise: ["SaaS Architecture", "E-commerce APIs", "Security Controls"],
    softSkills: ["Team Mentorship", "Technical Leadership", "Collaborative Writing"],
    experienceRequirement: "5+ years of production experience",
    behavioralTraits: ["Ownership", "Adaptability", "User-centric Thinking"]
  },
  {
    id: "job-2",
    title: "Lead Product Manager",
    department: "Product Management",
    location: "New York, NY (Onsite)",
    type: "Full-time",
    experienceLevel: "Lead (6+ years)",
    rawText: "Join us as a Lead Product Manager to steer our enterprise recruitment intelligence engine. You will own the product lifecycle from initial research, user discovery, and engineering scoping to launch and analytics tracking. Experience with SaaS products, metric-driven growth, agile development, and strong executive interfacing is a absolute must.",
    skillsRequired: ["Product Roadmap", "User Research", "Agile/Scrum", "A/B Testing", "KPI Tracking"],
    skillsPreferred: ["Figma Basics", "SQL Analytics", "SaaS Billing Systems", "Jira Mastery"],
    domainExpertise: ["HR Tech", "Enterprise B2B SaaS", "Artificial Intelligence Applications"],
    softSkills: ["Stakeholder Management", "Executive Communication", "Data-informed Storytelling"],
    experienceRequirement: "6+ years in software product management",
    behavioralTraits: ["Strategic Vision", "Empathy", "Relentless Execution"]
  },
  {
    id: "job-3",
    title: "Lead ML / AI Engineer",
    department: "AI & Data Science",
    location: "Remote (US)",
    type: "Full-time",
    experienceLevel: "Senior/Lead (6+ years)",
    rawText: "We are building the future of recruiting. As our Lead ML Engineer, you will design and deploy semantic retrieval systems, fine-tune LLM pipelines (Gemini API, Sentence Transformers), optimize vector databases, and implement NLP evaluations. PhD in CS or related field, experience with PyTorch, LangChain, and production-grade AI applications required.",
    skillsRequired: ["Python", "PyTorch", "LLMs (Gemini/OpenAI)", "LangChain", "Vector Databases (Pinecone/FAISS)"],
    skillsPreferred: ["Sentence Transformers", "BGE Embeddings", "HuggingFace Hub", "Docker", "Kubernetes"],
    domainExpertise: ["Semantic Retrieval", "NLP Pipelines", "RAG Systems", "AI Security"],
    softSkills: ["Research Synthesis", "Cross-functional Collaboration", "Ethical AI Mindset"],
    experienceRequirement: "4+ years focused on NLP and LLM prompt/fine-tuning pipelines",
    behavioralTraits: ["Analytical Rigor", "Curiosity", "Resilience"]
  }
];

export const mockCandidates: Candidate[] = [
  {
    id: "cand-1",
    name: "Alex Chen",
    email: "alex.chen@innovate.dev",
    phone: "+1 (555) 432-8976",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    title: "Senior Full-Stack Engineer",
    experienceYears: 7.5,
    noticePeriod: "Immediate",
    location: "Oakland, CA",
    skills: ["React", "TypeScript", "Node.js", "Tailwind CSS", "PostgreSQL", "Docker", "AWS", "GraphQL", "Redis", "Next.js"],
    certifications: ["AWS Certified Solutions Architect", "Certified ScrumMaster"],
    education: [
      {
        institution: "University of California, Berkeley",
        degree: "B.S. in Computer Science",
        year: "2018"
      }
    ],
    careerHistory: [
      {
        id: "exp-1a",
        company: "Velocty Corp",
        role: "Senior Software Engineer",
        duration: "2022 - Present",
        years: 4,
        achievements: [
          " Spearheaded migration from a legacy monolithic app to a modular React/Node microservices stack.",
          " Optimized SQL queries on PostgreSQL cluster to handle 20k concurrent users, reducing lag by 45%.",
          " Mentored 4 junior developers and established automated CI/CD workflows on AWS using Github Actions."
        ]
      },
      {
        id: "exp-1b",
        company: "StripeWave Labs",
        role: "Software Engineer II",
        duration: "2019 - 2022",
        years: 3,
        achievements: [
          " Designed and implemented high-volume subscription webhooks with 99.99% uptime.",
          " Authored shared UI library styled with Tailwind CSS, accelerating frontend sprints by 30%."
        ]
      }
    ],
    projects: [
      {
        title: "SaaS Multi-tenant Portal",
        description: "Built an enterprise analytics framework with customizable bento charts and robust Postgres tenant-isolation filters.",
        technologies: ["React", "TypeScript", "Node.js", "PostgreSQL", "Tailwind"]
      }
    ],
    status: "Shortlisted",
    scoresByJob: {
      "job-1": {
        skillMatch: 95,
        experienceMatch: 90,
        careerGrowth: 92,
        education: 85,
        behavioralSignals: 88,
        projectRelevance: 90,
        culturalFit: 90,
        finalScore: 91.5
      },
      "job-2": {
        skillMatch: 35,
        experienceMatch: 40,
        careerGrowth: 50,
        education: 70,
        behavioralSignals: 60,
        projectRelevance: 30,
        culturalFit: 60,
        finalScore: 43.5
      },
      "job-3": {
        skillMatch: 60,
        experienceMatch: 55,
        careerGrowth: 75,
        education: 85,
        behavioralSignals: 70,
        projectRelevance: 50,
        culturalFit: 70,
        finalScore: 61.5
      }
    },
    aiExplanationsByJob: {
      "job-1": "Candidate ranked extremely high because of outstanding technical compatibility. Alex offers 7.5 years of experience directly mapping to the 5-year requirement, extensive mastery of TypeScript/React/Tailwind, and verified leadership leading PostgreSQL optimizations in previous roles. He shows healthy, steady progression from SE I up to Senior level.",
      "job-2": "Low alignment. Highly technical software background without product roadmap ownership, agile analytics strategy, or B2B SaaS growth metric tracking. Not suitable for the Lead PM mandate.",
      "job-3": "Moderate alignment. Alex possesses powerful software engineering practices and background in database optimization; however, he lacks direct experience with PyTorch, LLM pipeline tuning, RAG systems, and semantic embedding algorithms."
    },
    parsedResumeText: "ALEX CHEN\nEmail: alex.chen@innovate.dev | Phone: +1 (555) 432-8976 | Oakland, CA\n\nPROFESSIONAL SUMMARY\nHighly accomplished Senior Software Developer with 7.5+ years of expertise building modern, resilient web applications. Proven track record leading TypeScript/React migrations, managing PostgreSQL clusters, and designing secure, high-uptime SaaS architectures.\n\nEXPERIENCE\nVelocity Corp - Senior Software Engineer | 2022 - Present\n- Led microservices transition, optimized database schema reducing API response latencies by 45%.\n- Established developer mentorship programs.\nStripeWave Labs - Software Engineer II | 2019 - 2022\n- Engineered real-time webhooks, crafted styled UI modular components.\n\nEDUCATION\nUC Berkeley - BS in Computer Science, 2018"
  },
  {
    id: "cand-2",
    name: "Sarah Jenkins",
    email: "sarah.jenkins@productmind.io",
    phone: "+1 (555) 901-2345",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    title: "Enterprise Product Lead",
    experienceYears: 8.0,
    noticePeriod: "30 Days",
    location: "New York, NY",
    skills: ["Product Roadmap", "User Research", "Agile/Scrum", "A/B Testing", "KPI Tracking", "SQL Analytics", "Figma Basics", "SaaS Billing Systems", "Jira", "Mixpanel", "Amplitude"],
    certifications: ["Pragmatic Institute Certified (Level VI)", "PMI-ACP"],
    education: [
      {
        institution: "Cornell University",
        degree: "B.A. in Economics & Information Science",
        year: "2018"
      }
    ],
    careerHistory: [
      {
        id: "exp-2a",
        company: "ScaleTalent Tech",
        role: "Lead Product Manager",
        duration: "2021 - Present",
        years: 5,
        achievements: [
          " Owned SaaS ATS platform serving 300+ enterprise customers, growing ARR from $4M to $11M in 2 years.",
          " Initiated integration of AI-powered semantic search, improving candidate application-to-interview rates by 22%."
        ]
      },
      {
        id: "exp-2b",
        company: "AppDyno Inc",
        role: "Product Manager (Analytics)",
        duration: "2018 - 2021",
        years: 3,
        achievements: [
          " Ran A/B experiments and mapped user discovery funnels, boosting activation rates from 14% to 26%."
        ]
      }
    ],
    projects: [
      {
        title: "Intelligent ATS Portal",
        description: "Conceptualized and delivered a recruitment integration module with automatic screening algorithms.",
        technologies: ["Mockups", "User Research", "Mixpanel", "Jira"]
      }
    ],
    status: "Shortlisted",
    scoresByJob: {
      "job-1": {
        skillMatch: 20,
        experienceMatch: 30,
        careerGrowth: 60,
        education: 60,
        behavioralSignals: 70,
        projectRelevance: 20,
        culturalFit: 80,
        finalScore: 34.5
      },
      "job-2": {
        skillMatch: 96,
        experienceMatch: 95,
        careerGrowth: 90,
        education: 90,
        behavioralSignals: 95,
        projectRelevance: 95,
        culturalFit: 92,
        finalScore: 94.65
      },
      "job-3": {
        skillMatch: 45,
        experienceMatch: 40,
        careerGrowth: 65,
        education: 80,
        behavioralSignals: 75,
        projectRelevance: 40,
        culturalFit: 80,
        finalScore: 50.75
      }
    },
    aiExplanationsByJob: {
      "job-1": "Extremely weak code base alignment. No hands-on coding records with React, TypeScript, or database microservices on the server side.",
      "job-2": "Exceptional fit. Sarah ranked #1 due to massive overlap (96% skill match). She offers 8 years of solid platform management expertise, with 5 of those years leading scale ATS systems. She has successfully increased B2B SaaS ARR and led AI modules, reflecting the perfect blend of domain knowledge (HR Tech) and operational speed.",
      "job-3": "Incomplete alignment. While she understands high-level semantic search product scope, she cannot fulfill the core ML code model tuning, PyTorch model deployment or LangChain programming expectations."
    },
    parsedResumeText: "SARAH JENKINS\nEmail: sarah.jenkins@productmind.io | Phone: +1 (555) 901-2345 | NY\n\nPROFESSIONAL SUMMARY\nLead Product Manager specializing in high-growth enterprise SaaS and workforce automation. 8 years launching B2B software products, structuring user experiments, and managing complex development sprints.\n\nEXPERIENCE\nScaleTalent Tech - Lead PM | 2021 - Present\n- Led expansion of search algorithms, grew platform ARR by 175%.\nAppDyno Inc - PM Analytics | 2018 - 2021\n\nEDUCATION\nCornell University - BA in Economics, 2018"
  },
  {
    id: "cand-3",
    name: "Dr. Aris Thorne",
    email: "aris.thorne@deepmindset.ai",
    phone: "+1 (555) 890-5612",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
    title: "Lead Research Scientist",
    experienceYears: 9.0,
    noticePeriod: "Immediate",
    location: "Seattle, WA (Remote Friendly)",
    skills: ["Python", "PyTorch", "LLMs (Gemini/OpenAI)", "LangChain", "Vector Databases (Pinecone/FAISS)", "Sentence Transformers", "BGE Embeddings", "HuggingFace Hub", "Docker", "Kubernetes", "NLP Pipelines", "TensorFlow"],
    certifications: ["NVIDIA Certified Deep Learning Professional"],
    education: [
      {
        institution: "Stanford University",
        degree: "Ph.D. in Computer Science (NLP Focus)",
        year: "2017"
      }
    ],
    careerHistory: [
      {
        id: "exp-3a",
        company: "Synthetix AI",
        role: "Principal AI Scientist",
        duration: "2021 - Present",
        years: 5,
        achievements: [
          " Architected RAG (Retrieval Augmented Generation) pipeline parsing 100k+ multi-format research PDFs, boosting accuracy by 34%.",
          " Designed Custom Semantic Embeddings matching model using Sentence Transformers, resulting in 91% recall score."
        ]
      },
      {
        id: "exp-3b",
        company: "Cognitive Labs",
        role: "Applied NLP Researcher",
        duration: "2017 - 2021",
        years: 4,
        achievements: [
          " Engineered custom fine-tuning of Bert-based models for text processing and sequence labeling."
        ]
      }
    ],
    projects: [
      {
        title: "BGE Retrieval Optimizer",
        description: "Authored open-source benchmark suites for cross-encoder re-ranking algorithms.",
        technologies: ["Python", "PyTorch", "HuggingFace"]
      }
    ],
    status: "Shortlisted",
    scoresByJob: {
      "job-1": {
        skillMatch: 40,
        experienceMatch: 40,
        careerGrowth: 70,
        education: 90,
        behavioralSignals: 75,
        projectRelevance: 30,
        culturalFit: 85,
        finalScore: 51.25
      },
      "job-2": {
        skillMatch: 45,
        experienceMatch: 35,
        careerGrowth: 60,
        education: 90,
        behavioralSignals: 75,
        projectRelevance: 40,
        culturalFit: 80,
        finalScore: 50.5
      },
      "job-3": {
        skillMatch: 98,
        experienceMatch: 95,
        careerGrowth: 95,
        education: 98,
        behavioralSignals: 90,
        projectRelevance: 96,
        culturalFit: 94,
        finalScore: 95.8
      }
    },
    aiExplanationsByJob: {
      "job-1": "Highly technical AI foundation, but lacks structural software frontend development skills using React/Vite and has minimal record designing standard SaaS API middlewares.",
      "job-2": "Not matching. Elite academic and engineering background in ML, but has no focus on general product roadmaps, user growth funnels, PM tooling, or enterprise pricing structures.",
      "job-3": "Matches perfectly. Dr. Thorne has a Stanford PhD specialized in NLP, has years of experience authoring multi-vector retrievals and hybrid LLM orchestrations on LangChain. His background heavily encompasses Sentence Transformers and Pinecone optimization, aligning directly with your core AI stack requirements."
    },
    parsedResumeText: "DR. ARIS THORNE\nEmail: aris.thorne@deepmindset.ai | Phone: +1 (555) 890-5612 | Seattle, WA\n\nSUMMARY\nEsteemed Applied ML Scientist and Research Team Lead with 9 years of expertise. Pioneer in vector space modeling, RAG architectures with Gemini API, and deep neural network fine-tuning.\n\nEXPERIENCE\nSynthetix AI - Principal AI Scientist | 2021 - Present\n- Built BGE retrieval architectures and optimized transformers.\nCognitive Labs - NLP Researcher | 2017 - 2021\n\nEDUCATION\nStanford University - PhD in Computer Science (NLP), 2017"
  },
  {
    id: "cand-4",
    name: "Marcus Vance",
    email: "marcus.vance@engineers.net",
    phone: "+1 (555) 304-7123",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150",
    title: "Full Stack Engineer",
    experienceYears: 5.0,
    noticePeriod: "15 Days",
    location: "San Francisco, CA",
    skills: ["React", "TypeScript", "Node.js", "Express", "PostgreSQL", "Tailwind CSS", "Git", "Webpack"],
    certifications: ["Professional Scrum Developer"],
    education: [
      {
        institution: "San Jose State University",
        degree: "B.S. in Software Engineering",
        year: "2021"
      }
    ],
    careerHistory: [
      {
        id: "exp-4a",
        company: "NextGen Logic",
        role: "Software Developer III",
        duration: "2021 - Present",
        years: 5,
        achievements: [
          " Built and maintained responsive React interfaces styled with Tailwind, enhancing usability score by 20%.",
          " Programmed scalable Express API backend server modules interacting with high-load PostgreSQL."
        ]
      }
    ],
    projects: [
      {
        title: "Agile Task Board",
        description: "Created a visual drag-and-drop workspace supporting instant state syncing across board layouts.",
        technologies: ["React", "TypeScript", "Express", "PostgreSQL"]
      }
    ],
    status: "Applied",
    scoresByJob: {
      "job-1": {
        skillMatch: 85,
        experienceMatch: 80,
        careerGrowth: 80,
        education: 80,
        behavioralSignals: 82,
        projectRelevance: 85,
        culturalFit: 84,
        finalScore: 82.9
      },
      "job-2": {
        skillMatch: 30,
        experienceMatch: 25,
        careerGrowth: 40,
        education: 70,
        behavioralSignals: 55,
        projectRelevance: 30,
        culturalFit: 60,
        finalScore: 37.0
      },
      "job-3": {
        skillMatch: 30,
        experienceMatch: 20,
        careerGrowth: 40,
        education: 70,
        behavioralSignals: 50,
        projectRelevance: 20,
        culturalFit: 60,
        finalScore: 32.5
      }
    },
    aiExplanationsByJob: {
      "job-1": "Strong standard fit. Marcus has 5 years of solid experience that hits the required skill set threshold. He has hands-on production history with React, Tailwind, and Node.js. He is ranked as a strong runner-up, but lacks the wider system architecture design, Docker/AWS DevOps knowledge, and team-mentorship seniority that Alex Chen possess.",
      "job-2": "No substantial product alignment. Marcus's focus is writing frontend modules and general express controllers.",
      "job-3": "Weak match. Lacks PyTorch, LangChain, embeddings, and mathematical NLP fine-tuning expertise."
    },
    parsedResumeText: "MARCUS VANCE\nEmail: marcus.vance@engineers.net | Phone: +1 (555) 304-7123 | SF\n\nEXPERIENCE\nNextGen Logic - Software Developer III | 2021 - Present\n- Built clean React code structures, Tailwind modules... Express API structures connected to PostgreSQL..."
  },
  {
    id: "cand-5",
    name: "Priya Sharma",
    email: "priya.sharma@frontenddev.co",
    phone: "+1 (555) 471-2917",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150",
    title: "Junior-Mid Frontend Developer",
    experienceYears: 3.0,
    noticePeriod: "Immediate",
    location: "Remote (San Francisco Timezone)",
    skills: ["React", "TypeScript", "Tailwind CSS", "JavaScript", "HTML/CSS", "Vite", "Git", "Figma"],
    certifications: [],
    education: [
      {
        institution: "Arizona State University",
        degree: "B.S. in Computer Science",
        year: "2023"
      }
    ],
    careerHistory: [
      {
        id: "exp-5a",
        company: "Crafty Web Solutions",
        role: "Frontend Developer",
        duration: "2023 - Present",
        years: 3,
        achievements: [
          " Implemented pixel-perfect Figma layouts for marketing sites and application landing pages.",
          " Enhanced performance of complex client filter dashboards by 15% using memoized React hooks."
        ]
      }
    ],
    projects: [
      {
        title: "Personal Component Library",
        description: "Built modular accessible React components focusing on WCAG high-contrast guidelines.",
        technologies: ["React", "Tailwind", "Vite"]
      }
    ],
    status: "Applied",
    scoresByJob: {
      "job-1": {
        skillMatch: 65,
        experienceMatch: 50,
        careerGrowth: 70,
        education: 80,
        behavioralSignals: 75,
        projectRelevance: 60,
        culturalFit: 85,
        finalScore: 63.5
      },
      "job-2": {
        skillMatch: 20,
        experienceMatch: 15,
        careerGrowth: 40,
        education: 70,
        behavioralSignals: 50,
        projectRelevance: 20,
        culturalFit: 70,
        finalScore: 29.5
      },
      "job-3": {
        skillMatch: 15,
        experienceMatch: 10,
        careerGrowth: 30,
        education: 70,
        behavioralSignals: 40,
        projectRelevance: 15,
        culturalFit: 60,
        finalScore: 21.0
      }
    },
    aiExplanationsByJob: {
      "job-1": "Priya shows real potential but lacks senior-level exposure. She has 3 years of experience (mostly junior-mid level) and lacks reliable Node/Express masteries and system clustering. She lacks Docker and AWS architecture expertise. Perfect candidate to hire into a junior SWE role, but doesn't meet the Senior requirements yet.",
      "job-2": "No fit. Completely junior software engineer with no PM framework metrics experience.",
      "job-3": "No fit. She has zero artificial intelligence or data science background."
    },
    parsedResumeText: "PRIYA SHARMA\nEmail: priya.sharma@frontenddev.co | Phone: +1 (555) 471-2917\n\nPROFESSIONAL EXPERTISE\nFrontend Developer specialized in composing elegant user experiences with React, TypeScript, and semantic styled components.\n\nEXPERIENCE\nCrafty Web Solutions - React Developer | 2023 - Present"
  },
  {
    id: "cand-6",
    name: "Elena Rostova",
    email: "elena.rostova@designandflows.com",
    phone: "+1 (555) 892-2311",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150",
    title: "Product Coordinator",
    experienceYears: 4.0,
    noticePeriod: "Immediate",
    location: "Seattle, WA",
    skills: ["User Research", "Agile/Scrum", "Figma", "Jira", "Customer Success", "Usability Testing", "Wireframes"],
    certifications: ["Professional Scrum Product Owner I"],
    education: [
      {
        institution: "University of Washington",
        degree: "B.A. in Psychology & Human-Computer Interaction",
        year: "2022"
      }
    ],
    careerHistory: [
      {
        id: "exp-6a",
        company: "Flowstate App Studio",
        role: "Product Analyst & Designer",
        duration: "2022 - Present",
        years: 4,
        achievements: [
          " Coordinated daily standups, designed application interface flow wireframes, and conducted 30+ client feedback interviews."
        ]
      }
    ],
    projects: [
      {
        title: "B2B Feedback Widget",
        description: "Coordinated cross-functionally to launch in-app sentiment triggers.",
        technologies: ["Figma", "Jira", "User Interviews"]
      }
    ],
    status: "Rejected",
    scoresByJob: {
      "job-1": {
        skillMatch: 10,
        experienceMatch: 15,
        careerGrowth: 40,
        education: 60,
        behavioralSignals: 60,
        projectRelevance: 10,
        culturalFit: 70,
        finalScore: 21.0
      },
      "job-2": {
        skillMatch: 70,
        experienceMatch: 55,
        careerGrowth: 75,
        education: 85,
        behavioralSignals: 80,
        projectRelevance: 68,
        culturalFit: 85,
        finalScore: 68.3
      },
      "job-3": {
        skillMatch: 10,
        experienceMatch: 10,
        careerGrowth: 30,
        education: 70,
        behavioralSignals: 40,
        projectRelevance: 10,
        culturalFit: 60,
        finalScore: 19.5
      }
    },
    aiExplanationsByJob: {
      "job-1": "No backend software or React programming framework matching.",
      "job-2": "Moderate Candidate alignment. Elena owns good functional attributes in psychological UI design and agile sprint tracking. However, she lacks senior leadership managing commercial metrics (ARR), leading strategic B2B tech products or scaling massive SaaS systems itself, making her rank lower than Sarah Jenkins (Score 94.65). Highly suitable for an Associate PM position.",
      "job-3": "No fit. No NLP or deep learning modeling record."
    },
    parsedResumeText: "ELENA ROSTOVA\nEmail: elena.rostova@designandflows.com | Seattle, WA\n\nSUMMARY\nPsychology graduate with 4 years of solid coordination experience leading Agile teams and building UI flow structures in Figma.\n\nEXPERIENCE\nFlowstate App Studio - Product Analyst | 2022 - Present"
  }
];
