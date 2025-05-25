import dynamic from 'next/dynamic';
import backend from "@/assets/backend.jpg";
import frontend from "@/assets/frontend.jpg";
import security from "@/assets/security.jpg";
import performance from "@/assets/performance.jpg";
import webImage from "@/assets/project.jpg";

const FaInstagram = dynamic(() => import('react-icons/fa').then(mod => mod.FaInstagram));
const FaLinkedinIn = dynamic(() => import('react-icons/fa').then(mod => mod.FaLinkedinIn));
const FaYoutube = dynamic(() => import('react-icons/fa').then(mod => mod.FaYoutube));
const FaGithub = dynamic(() => import('react-icons/fa').then(mod => mod.FaGithub));

export const menuItems: navLink[] = [
  { id: 1, label: 'Home', href: '#home' },
  { id: 2, label: 'About', href: '#about' },
  { id: 3, label: 'Services', href: '#services' },
  { id: 4, label: 'Blog', href: '#blogs' },
  { id: 5, label: 'Projects', href: '#projects' },
  { id: 6, label: 'Experience', href: '#experience' },
  { id: 7, label: 'Contact', href: '#contact' },
];




export const socialItems: GlassIconsItem[] = [
  { icon: FaLinkedinIn, color: '#915EFF', label: 'LinkedIn', href:'https://linkedin.com/in/amarinfo' },
  { icon: FaGithub, color: '#915EFF', label: 'GitHub', href:'https://github.com/amarsde2'  },
  { icon: FaInstagram, color: '#915EFF', label: 'Instagram', href:'https://www.instagram.com/er.amark/'  },
  { icon: FaYoutube, color: '#915EFF', label: 'YouTube', href:'https://www.youtube.com/@amar-ai-mindset-innovation'},
];


export const areasOfExpertise: AreaOfExpertise[] = [
  {
    id: 1,
    title: "Frontend Development",
    description: "Designing responsive, interactive, and user-friendly interfaces using modern web technologies.",
    image: frontend,
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Redux"]
  },
  {
    id: 2,
    title: "Backend Development",
    description: "Building robust, secure, and scalable server-side applications and APIs.",
    image: backend,
    skills: ["Django", "Node.js", "Express", "Laravel", "MySQL", "MongoDB", "Redis"]
  },
  {
    id: 3,
    title: "Application Security",
    description: "Implementing security best practices to protect applications from common vulnerabilities and attacks.",
    image: security,
    skills: ["Multi-Factor Authentication", "Authorization", "CSRF Protection", "Content Security Policy (CSP)"]
  },
  {
    id: 4,
    title: "Performance Optimization",
    description: "Improving system efficiency through scalable architecture, modular code, reusable components, and optimized queries.",
    image: performance,
    skills: ["Database Query Optimization", "Page Speed Optimization", "API Response Time Optimization"]
  }
];




export const services: Service[] = [
  {
    id: 1,
    title: "Web Development",
    description: "Creating modern, responsive, and high-performance web applications using the latest technologies.",
    icon: "💻",
    features: [
      "React & Next.js Development",
      "Responsive Design",
      "Performance Optimization",
      "SEO Best Practices",
      "Cross-browser Compatibility"
    ]
  },

  {
    id: 4,
    title: "Backend Development",
    description: "Developing robust and scalable server-side applications and APIs.",
    icon: "⚙️",
    features: [
      "Django & Python, Node.js & Express, Laravel",
      "Database Design",
      "API Development",
      "Cloud Services",
      "Security Implementation"
    ]
  },
  {
    id: 5,
    title: "DevOps & Cloud",
    description: "Implementing efficient deployment pipelines and cloud infrastructure solutions.",
    icon: "☁️",
    features: [
      "CI/CD Pipeline",
      "AWS",
      "Docker & Kubernetes",
      "Monitoring & Logging",
      "Infrastructure as Code"
    ]
  },
  {
    id: 6,
    title: "Technical Consulting",
    description: "Providing expert guidance on technology stack selection and implementation strategies.",
    icon: "💡",
    features: [
      "Architecture Design",
      "Technology Assessment",
      "Performance Review",
      "Security Audit",
      "Best Practices"
    ]
  }
];




export const projects: Project[] = [
  {
    title: "Ecommerce Platform",
    slug : "ecommerce-platform",
    description: "An e-commerce web app where users can sign up, shop products, add to cart, checkout securely, view order history, manage profiles, and leave reviews.",
    image: webImage,
    technologies: ["Node.js", "React.js", "GraphQL", "Express", "Tailwind CSS", "MongoDB", "Unit Testing"],
    liveLink: "https://ecommerce-demo.com",
    githubLink: "https://github.com/yourusername/ecommerce",
    category: "FullStack Web Application"
  },
  {
    title: "Messenger App",
    slug: "messenger-app",
    description: "A messaging app micro-clone enabling one-on-one and group chats, where users log in with Google for secure and seamless access.",
    image: webImage,
    technologies: ["Next.js", "React.js", "GraphQL", "Google Provider Auth", "Tailwind CSS", "Heroicons", "Pusher", "Upstash"],
    liveLink: "https://ecommerce-demo.com",
    githubLink: "https://github.com/yourusername/ecommerce",
    category: "FullStack Web Application"
  },

  {
    title: "Trello clone",
    slug : 'trello-clone',
    description: "A Trello-like task management app where users can organize tasks across lists and get AI-generated summaries whenever the board is updated.",
    image: webImage,
    technologies: ["Next.js", "Appwrite cloud", "Tailwind CSS", "React-Beautiful-DND", "Zustand", "OpenAI", "Heroicons"],
    liveLink: "https://taskmanager-demo.com",
    githubLink: "https://github.com/yourusername/taskmanager",
    category: "FullStack Web Application"
  },
  {
    title: "Tutorial Applcaition",
    slug : "learning-plaform",
    description: "An online education app offering video tutorials across various subjects, making learning flexible and accessible for users.",
    image:webImage,
    technologies: ["CodeIgniter", "MySQL", "LAMP Server", "JavaScript", "jQuery", "HTML5", "Bootstrap"],
    liveLink: "https://drive.google.com/file/d/1MYEjQIXxu3Ie1adFTqz3C_wkI5ubKth5/view",
    githubLink: "https://github.com/amarsde2/tutorial_website_in_codegniter/",
    category: "FullStack Web Application"
  },
];
export const testimonials: Testimonial[] = [
  {
    name: "Harimon Prajapati",
    role: "Digital Marketing Manager",
    company: "Synram",
    image: "/testimonials/sarah.jpg",
    quote: "Collaborating with Amar was a fantastic experience. His meticulous attention to detail, strong work ethic, and dedication to writing clean, high-quality code played a pivotal role in the success of our project. The final product not only met but truly exceeded our expectations.",
    rating: 5
  },
  {
    name: "Ravi Ojha",
    role: "Senior Software Enginner",
    company: "InnovateX",
    image: "/testimonials/michael.jpg",
    quote: "Amar's technical expertise and problem-solving abilities are truly exceptional. He consistently delivered clean, efficient code and was incredibly reliable whenever challenges arose. His proactive support and professionalism made a significant impact on our project's success.",
    rating: 5
  },
  {
    name: "Chandan Saral",
    role: "UX Designer",
    company: "DesignHub",
    image: "/testimonials/emily.jpg",
    quote: "Working with Amar was an exceptional experience. His deep understanding of both frontend and backend development ensured a smooth and seamless design implementation. A true full-stack developer, Amar brings versatility and precision to every aspect of the project.",
    rating: 5
  }
];


export const experiences: Experience[] = [
  {
    company: "TatvaSoft",
    role: "Senior Software Engineer",
    duration: "Sept 2022 - Present",
    location: "Remote",
    description: [
      "Leading the development of a learning and booking platform serving over 100,000 users",
      "Implemented security best practices to safeguard the application from common attacks",
      "Optimized performance of background jobs, database queries, and improved page load times",
      "Integrated features for syncing with third-party systems and external libraries",
    ],
    technologies: ["Node.js", "Laravel", "Vue.js", "React.js", "MongoDB", "Mysql", "Javascript", "Problem Solving", "Aws", "Redis"],
    logo: "/companies/techcorp.png",
  },
  {
    company: "SynRam TechnoLab",
    role: "Software Engineer",
    duration: "July 2021 - Sept 2022",
    location: "Gwalior, Madhya Pradesh, India",
    description: [
      "Led development of a ticket booking platform serving 100,000+ users",
      "Implemented CI/CD pipelines, reducing deployment time by 60%",
      "Mentored junior developers and conducted thorough code reviews",
      "Optimized database queries, improving application performance by 40%",
    ],
    technologies: ["Node.js", "Laravel", "Angular", "MySQL", "MongoDB", "Meteor.js", "Javascript","Bootstrap"],
    logo: "/companies/techcorp.png",
  },
  {
    company: "Rainet Technology Pvt. Ltd (Clickncash)",
    role: "PHP Developer Intern",
    duration: "May 2021 - Jun 2021",
    location: "New Delhi, India",
    description: [
      "Developed and maintained multiple client-facing web applications",
      "Collaborated with the team to implement features in an e-commerce platform",
      "Integrated third-party APIs and payment gateways",
      "Reduced bug reports by 30% through improved testing and QA practices",
    ],
    technologies: ["Laravel", "MySQL", "JavaScript", "HTML", "CSS", "Bootstrap"],
    logo: "/companies/innovatex.png",
  },
  {
    company: "Kanishkha IT Pvt. Ltd",
    role: "PHP Intern",
    duration: "May 2018 - Jul 2018",
    location: "Gwalior, Madhya Pradesh, India",
    description: [
      "Built responsive user interfaces for web applications",
      "Designed MySQL databases for dynamic data-driven functionality",
      "Developed REST APIs for internal and client-facing applications",
      "Followed best security practices for data protection and application integrity",
    ],
    technologies: ["PHP", "MySQL", "JavaScript", "TypeScript", "HTML", "CSS"],
    logo: "/companies/startupvision.png",
  },
];
