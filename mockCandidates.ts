import { Candidate, JobDescription } from '../types';

export const mockCandidates: Candidate[] = [
  {
    id: 'cand-001',
    name: 'Alex Rivera',
    email: 'alex.rivera@cloudreach.io',
    phone: '+1 (555) 482-1928',
    title: 'Lead Backend Cloud Architect',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    summary: 'Distinguished Backend Engineer and Solutions Architect with 8+ years of expertise in designing, building, and optimizing modern distributed microservices and containerized environments. Proven track record of scaling transactional systems at high volumes.',
    experienceYears: 9,
    education: {
      degree: 'M.S. in Computer Science',
      school: 'Stanford University',
      year: '2017',
    },
    keySkills: ['Go', 'Python', 'Kubernetes', 'Docker', 'AWS', 'gRPC', 'PostgreSQL', 'Distributed Systems'],
    allSkills: ['Go', 'Python', 'Kubernetes', 'Docker', 'AWS', 'gRPC', 'PostgreSQL', 'Redis', 'Kafka', 'Terraform', 'CI/CD', 'Git', 'Linux', 'Microservices', 'GraphQL', 'Protocol Buffers', 'System Architecture', 'Shell Scripting', 'REST APIs'],
    projects: [
      {
        name: 'Athena Core Scaling Orchestrator',
        description: 'Led the migration of a legacy monolithic service provider into a Go-based gRPC microservices framework. Scaled the API layer from handling 5,000 requests/sec to over 48,000 requests/sec with average latencies under 28ms.',
        tech: ['Go', 'gRPC', 'Kubernetes', 'Redis', 'Protocol Buffers'],
      },
      {
        name: 'Nimbus Cloud Compliance Watchdog',
        description: 'Designed a real-time, event-driven auditing tool tracking IAM configurations and instantly revoking unauthorized policy escalations across 4,000+ nested AWS accounts using serverless queues.',
        tech: ['Python', 'AWS Lambda', 'SQS', 'DynamoDB', 'Terraform'],
      },
    ],
    experienceList: [
      {
        role: 'Tech Lead / Principal Backend Architect',
        company: 'Netflix',
        period: '2021 - Present',
        description: 'Architected and supervised cloud deployment strategies. Mentored a team of 8 backend engineers. Overhauled internal streaming telemetry pipelines resulting in a 42% decrease in container resource consumption.',
        promotions: ['Promoted from Senior Software Engineer to Tech Lead in Oct 2023'],
      },
      {
        role: 'Senior Software Engineer',
        company: 'Wealthfront',
        period: '2019 - 2021',
        description: 'Engineered high-throughput stock transaction ledgers. Integrated distributed database replication structures utilizing highly consistent ACID models.',
      },
      {
        role: 'Software Engineer',
        company: 'AppDynamics',
        period: '2017 - 2019',
        description: 'Built performance monitoring agents in Python and C++. Analyzed system bottlenecks and designed customizable logging daemons.',
      },
    ],
    certifications: [
      'GCP Certified Professional Cloud Architect',
      'AWS Certified Solutions Architect – Professional',
      'Certified Kubernetes Administrator (CKA)',
    ],
    careerMilestones: [
      {
        year: '2017',
        role: 'Software Engineer',
        company: 'AppDynamics',
        type: 'milestone',
        description: 'Kicked off professional development career specializing in backend systems performance optimization.',
      },
      {
        year: '2019',
        role: 'Senior Software Engineer',
        company: 'Wealthfront',
        type: 'job_change',
        description: 'Joined Wealthfront to tackle distributed ledger consistency challenges and high-throughput transactional architectures.',
      },
      {
        year: '2021',
        role: 'Senior Software Engineer',
        company: 'Netflix',
        type: 'job_change',
        description: 'Joined the core streaming infrastructure engineering team at Netflix.',
      },
      {
        year: '2023',
        role: 'Lead Architect',
        company: 'Netflix',
        type: 'promotion',
        description: 'Promoted to Lead Architect due to outstanding contributions to container autoscaling and internal gRPC frame reductions.',
      },
    ],
    behavioral: {
      openSourceContributions: 89, // commits / reviews
      projectFrequency: 94,
      accuracyRate: 98,
      leadershipIndicators: [
        'Headed micro-migration taskforce of 12 key cross-functional engineers.',
        'Authored foundational coding standards documentation adopted across Wealthfront.',
        'Active open source contributor to standard CNCF container runtime repositories.',
      ],
    },
  },
  {
    id: 'cand-002',
    name: 'Sarah Lin',
    email: 'sarah.lin@ml-fusion.dev',
    phone: '+1 (555) 753-1849',
    title: 'Senior Deep Learning & DevOps Engineer',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
    summary: 'Machine learning scientist specializing in high-performance model parallelization, distributed GPU clusters, and optimization of large language models. Combines deep scientific theory with raw full-stack deployment capability.',
    experienceYears: 6,
    education: {
      degree: 'B.S. in Mathematics & Computer Science',
      school: 'MIT',
      year: '2020',
    },
    keySkills: ['PyTorch', 'Python', 'TensorFlow', 'Docker', 'CUDA', 'FastAPI', 'MLOps', 'Transformers'],
    allSkills: ['PyTorch', 'Python', 'TensorFlow', 'CUDA', 'FastAPI', 'MLOps', 'Transformers', 'HuggingFace', 'NumPy', 'Pandas', 'AWS', 'TypeScript', 'D3.js', 'React', 'Docker', 'Kubernetes', 'KubeFlow', 'GIT', 'SQL'],
    projects: [
      {
        name: 'Triton Distributed Inference Engine',
        description: 'Created a customized PyTorch compiler optimizing model quantization for neural translation systems. Enhanced pipeline inference speed by 3.5x under heavily parallelized tensor workloads.',
        tech: ['PyTorch', 'CUDA', 'Docker', 'FastAPI'],
      },
      {
        name: 'Lexicon Translation Visualization Dashboard',
        description: 'Engineered an interactive dashboard for engineers to analyze intermediate neural weights during inference, utilizing real-time rendering layers for dimensional space reductions.',
        tech: ['React', 'TypeScript', 'D3.js', 'HuggingFace'],
      },
    ],
    experienceList: [
      {
        role: 'Senior ML Engineer (LLM Platforms)',
        company: 'Stripe',
        period: '2022 - Present',
        description: 'Optimized internal customer support auto-routing LLM pipelines. Built custom CUDA kernels for hardware acceleration. Reduced cost-per-token by 29% across five key product flows.',
        promotions: ['Accelerated promotion path in 2023 for leading LLM billing optimization'],
      },
      {
        role: 'Machine Learning Engineer',
        company: 'Hugging Face',
        period: '2020 - 2022',
        description: 'Co-authored model quantization pipelines for open-source transformer libraries. Maintained critical repository nodes, handling issues and reviews with thousands of global community users.',
      },
    ],
    certifications: [
      'NVIDIA Deep Learning Institute Graduate',
      'Google Professional Machine Learning Engineer',
    ],
    careerMilestones: [
      {
        year: '2020',
        role: 'Machine Learning Engineer',
        company: 'Hugging Face',
        type: 'milestone',
        description: 'Joined Hugging Face immediately after graduation, driving open-source compression and quantization techniques.',
      },
      {
        year: '2022',
        role: 'Senior ML Engineer',
        company: 'Stripe',
        type: 'job_change',
        description: 'Transitioned to Stripe to scale production-facing payment fraud detection deep learning mechanisms.',
      },
    ],
    behavioral: {
      openSourceContributions: 412,
      projectFrequency: 97,
      accuracyRate: 95,
      leadershipIndicators: [
        'Core maintainer of highly utilized transformer quantization libraries.',
        'Speaker at PyTorch World Conference 2023 on LLM optimization strategies.',
      ],
    },
  },
  {
    id: 'cand-003',
    name: 'Marcus Vance',
    email: 'marcus.v@devopsops.net',
    phone: '+1 (555) 991-2081',
    title: 'Cloud DevOps & Security Specialist',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    summary: 'Cloud infrastructure leader specialized in building bulletproof CI/CD automations, multi-cloud strategies, and platform observability frameworks. Hardcore Linux kernel optimization advocate.',
    experienceYears: 7,
    education: {
      degree: 'B.S. in Network Engineering',
      school: 'Georgia Tech',
      year: '2019',
    },
    keySkills: ['Terraform', 'Kubernetes', 'AWS', 'Docker', 'Ansible', 'Linux', 'Prometheus', 'CI/CD'],
    allSkills: ['Terraform', 'Kubernetes', 'AWS', 'Docker', 'Ansible', 'Linux', 'Prometheus', 'CI/CD', 'GitLab CI', 'Jenkins', 'Bash', 'YAML', 'Python', 'Go', 'GCP', 'Argocd', 'Elastisearch', 'Networking', 'Cybersecurity'],
    projects: [
      {
        name: 'Zero-Downtime Global Multi-Cloud Router',
        description: 'Engineered automatic failover infrastructure mapping AWS and GCP nodes in real-time. Deployed Terraform configuration templates that instantiate and replicate 15 regional systems in under 9 minutes.',
        tech: ['Terraform', 'Kubernetes', 'AWS', 'GCP', 'Ansible'],
      },
      {
        name: 'Argus Metrics Collector Stack',
        description: 'Unified distributed logging clusters generating billions of rows daily. Implemented custom Prometheus metric aggregators mapping container memory cycles.',
        tech: ['Prometheus', 'Kubernetes', 'YAML', 'Go'],
      },
    ],
    experienceList: [
      {
        role: 'Lead Platform Reliability Architect',
        company: 'Hasura',
        period: '2022 - Present',
        description: 'Overhauled security architectures securing public APIs. Standardized SOC2 compliance automated reports, reducing yearly audit times by 4 months.',
      },
      {
        role: 'Senior DevOps Architect',
        company: 'Datadog',
        period: '2019 - 2022',
        description: 'Built custom cloud collection daemons for Linux enterprise kernels. Authored deployment scaling recipes utilized by over 10,000 corporate observability instances.',
      },
    ],
    certifications: [
      'HashiCorp Certified Terraform Associate',
      'AWS Certified DevOps Engineer – Professional',
      'Google Certified Professional Data Engineer',
    ],
    careerMilestones: [
      {
        year: '2019',
        role: 'Senior DevOps Architect',
        company: 'Datadog',
        type: 'milestone',
        description: 'Started infrastructure scaling career at Datadog, dealing with container metrics collectors at hyper-scale.',
      },
      {
        year: '2022',
        role: 'Lead Platform Reliability Architect',
        company: 'Hasura',
        type: 'job_change',
        description: 'Joined Hasura to oversee multi-region deployments, security posture audit automations, and gitops standards.',
      },
    ],
    behavioral: {
      openSourceContributions: 140,
      projectFrequency: 82,
      accuracyRate: 91,
      leadershipIndicators: [
        'Incident Response Lead handling major multi-region platform network outages.',
        'Mentored 6 junior cloud operators on security automation practices.',
      ],
    },
  },
  {
    id: 'cand-004',
    name: 'Elena Rostova',
    email: 'elena.rostova@pixelpulse.org',
    phone: '+1 (555) 234-9012',
    title: 'Senior Frontend & UX Architect',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
    summary: 'Frontend engineer with the design sensibility of a Principal Product Designer and the technical capabilities of a Senior Web Developer. Over 5 years crafting interactive web canvases, layouts, and responsive interfaces.',
    experienceYears: 5,
    education: {
      degree: 'B.F.A in Communication Design',
      school: 'Carnegie Mellon University',
      year: '2021',
    },
    keySkills: ['React', 'TypeScript', 'Next.js', 'Tailwind', 'Framer Motion', 'Webpack', 'CSS3', 'WebGL'],
    allSkills: ['React', 'TypeScript', 'Next.js', 'Tailwind', 'Framer Motion', 'Webpack', 'CSS3', 'WebGL', 'Figma', 'Jest', 'Git', 'Vite', 'GraphQL', 'SASS', 'ESLint', 'Three.js', 'Redux', 'UX Research', 'Responsive Design'],
    projects: [
      {
        name: 'Vercel Analytics Interactive Sandbox',
        description: 'Created the drag-and-drop report customization workspace for dashboard users. Handled complex layout grids, local file caching, and Fluid SVG performance rendering modules.',
        tech: ['React', 'TypeScript', 'Framer Motion', 'Tailwind'],
      },
      {
        name: 'Orbit.js Spatial Web Canvas',
        description: 'Framer system enabling 3D orbit visualization inside general-purpose browser spaces. Utilized custom WebGL shader parameters to overlay design frameworks.',
        tech: ['Three.js', 'WebGL', 'TypeScript', 'CSS3'],
      },
    ],
    experienceList: [
      {
        role: 'UI/UX Engineering Architect',
        company: 'Vercel',
        period: '2022 - Present',
        description: 'Crafted design system implementations for several prominent Vercel dashboard views. Mentored teams on UI accessibility standards, increasing lighthouse ratings to 100 on primary domains.',
      },
      {
        role: 'Frontend Engineer',
        company: 'Figma',
        period: '2021 - 2022',
        description: 'Implemented layer filtering sidebars and canvas control parameters. Collaborated with cross-functional design leads on core typography systems.',
      },
    ],
    certifications: [
      'Interactive Design Excellence Award 2023',
      'W3C Certified Web Accessibility Specialist',
    ],
    careerMilestones: [
      {
        year: '2021',
        role: 'Frontend Engineer',
        company: 'Figma',
        type: 'milestone',
        description: 'Joined Figma frontend core group directly after graduating, establishing modular component patterns.',
      },
      {
        year: '2022',
        role: 'UI/UX Engineering Architect',
        company: 'Vercel',
        type: 'job_change',
        description: 'Transitioned to Vercel to champion layout accessibility and high-performance SVG graph tools.',
      },
    ],
    behavioral: {
      openSourceContributions: 72,
      projectFrequency: 99,
      accuracyRate: 97,
      leadershipIndicators: [
        'Headed the design-to-engineering translation pipeline system layout team at Vercel.',
        'Active advocate for web modularity and responsive interaction patterns.',
      ],
    },
  },
  {
    id: 'cand-005',
    name: 'Divya Nair',
    email: 'divya.nair@dataops.co',
    phone: '+1 (555) 702-8641',
    title: 'Lead Data Infrastructure Engineer',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    summary: '8 years designing massive cloud computing data pipelines, stream computation systems, and data-lake schemas. Highly proficient in Spark scaling and automated dbt model synchronization.',
    experienceYears: 8,
    education: {
      degree: 'B.S. in Information Systems',
      school: 'University of Maryland',
      year: '2018',
    },
    keySkills: ['Spark', 'Python', 'Snowflake', 'Airflow', 'dbt', 'Scala', 'SQL', 'PostgreSQL'],
    allSkills: ['Spark', 'Python', 'Snowflake', 'Airflow', 'dbt', 'Scala', 'SQL', 'PostgreSQL', 'Docker', 'AWS S3', 'Glue', 'Kafka', 'Athena', 'Redshift', 'Hadoop', 'Git', 'Linux', 'Java', 'Analytics'],
    projects: [
      {
        name: 'Synthesizer Big Data pipeline',
        description: 'Designed an asynchronous Apache Spark streaming stack on AWS integrating data streams of 400M analytics coordinates hourly. Reduced latency from ingestion to Snowflake storage from 18 minutes to 4 seconds.',
        tech: ['Spark', 'Scala', 'AWS S3', 'Kafka'],
      },
      {
        name: 'dbt Automated Synchronization Mesh',
        description: 'Engineered an custom Airflow scheduling blueprint that triggers targeted table mutations based on downstream column metadata and statistical changes.',
        tech: ['Airflow', 'dbt', 'Python', 'PostgreSQL'],
      },
    ],
    experienceList: [
      {
        role: 'Lead Data Systems Architect',
        company: 'Confluent',
        period: '2021 - Present',
        description: 'Oversaw stream-processing telemetry guidelines. Consulted with enterprise clients migrating off legacy on-premise clusters onto decoupled Kafka-native meshes.',
      },
      {
        role: 'Senior Data Engineer',
        company: 'PagerDuty',
        period: '2018 - 2021',
        description: 'Built alerting data schema repositories. Structured highly indexable search layouts speed-scaling event tracking engines by 8x.',
      },
    ],
    certifications: [
      'Snowflake Certified Data Specialist',
      'Apache Spark Certified System Developer (Databricks)',
    ],
    careerMilestones: [
      {
        year: '2018',
        role: 'Data Engineer',
        company: 'PagerDuty',
        type: 'milestone',
        description: 'Began data infrastructure career, optimizing Postgres schemas and indexing alerts.',
      },
      {
        year: '2021',
        role: 'Lead Data Architect',
        company: 'Confluent',
        type: 'job_change',
        description: 'Joined Confluent as data platforms lead, focusing on Kafka orchestration and decoupling architectures.',
      },
    ],
    behavioral: {
      openSourceContributions: 54,
      projectFrequency: 86,
      accuracyRate: 90,
      leadershipIndicators: [
        'Spearheaded Data Migration of 14PB legacy warehouse data.',
        'Organized and hosted Apache Spark user workshops in the MD area.',
      ],
    },
  },
];

export const mockJobs: JobDescription[] = [
  {
    id: 'job-001',
    title: 'Lead Platform Infrastructure & Backend Architect',
    department: 'Core Cloud Operations',
    experienceRequired: 8,
    requiredSkills: ['Go', 'Kubernetes', 'Docker', 'AWS', 'gRPC', 'Distributed Systems'],
    preferredSkills: ['Python', 'PostgreSQL', 'Terraform', 'CI/CD'],
    descriptionText: 'We are seeking a cloud solutions and backend lead to oversee the migration and scaling of containerized microservices. You will coordinate autoscaling configurations, build highly reliable transaction models, and lead standard core distributed protocols optimization tasks.',
  },
  {
    id: 'job-002',
    title: 'Senior MLOps & High-Performance Computing Engineer',
    department: 'Artificial Intelligence Platform',
    experienceRequired: 6,
    requiredSkills: ['PyTorch', 'Python', 'MLOps', 'CUDA', 'FastAPI'],
    preferredSkills: ['TensorFlow', 'Docker', 'Kubernetes', 'TypeScript', 'D3.js'],
    descriptionText: 'Join our model infrastructure team to build hyper-scaled translation, routing, and quantization compiler loops. You will build and optimize custom CUDA kernels, parallelize neural network calculations, and design visualization interfaces tracking real-time deep tensor weights.',
  },
  {
    id: 'job-003',
    title: 'Lead Cloud Security & Site Reliability Director',
    department: 'Infrastructure Security & SRE',
    experienceRequired: 7,
    requiredSkills: ['Terraform', 'Kubernetes', 'AWS', 'CI/CD', 'Prometheus'],
    preferredSkills: ['Ansible', 'Linux', 'Go', 'GCP', 'Bash'],
    descriptionText: 'Seeking a seasoned SRE lead to guarantee zero-downtime operations. Responsible for Terraform script automation across multi-cloud clusters, orchestrating SOC2 auditing workflows, and setting up centralized Prometheus/Grafana infrastructure tracking containers and telemetry data.',
  },
  {
    id: 'job-004',
    title: 'Principal Developer Workspace UX Engineer',
    department: 'App Architecture & Dashboards',
    experienceRequired: 5,
    requiredSkills: ['React', 'TypeScript', 'Next.js', 'Tailwind', 'Framer Motion'],
    preferredSkills: ['CSS3', 'WebGL', 'Three.js', 'Jest', 'GraphQL'],
    descriptionText: 'We are looking for a frontend design-to-code master with top-tier aesthetic and engineering skills. You will construct highly interactive workspace layouts, custom visual charts, fluid canvas components, and guarantee perfect accessibility standards on core user platforms.',
  },
];
