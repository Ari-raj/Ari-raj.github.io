import type { Content, AppId, AppConfig } from './types';

// --- Icons ---
const folderIcon = "https://img.icons8.com/color/96/folder-invoices.png";
const certificateIcon = "https://img.icons8.com/color/96/certificate.png";
const skillsIcon = "https://img.icons8.com/color/96/development-skill.png";
const educationIcon = "https://img.icons8.com/color/96/student-male.png";
const terminalIcon = "https://img.icons8.com/fluency/96/console.png";
const settingsIcon = "https://img.icons8.com/color/96/settings.png";
const lockIcon = "https://img.icons8.com/color/96/lock.png";
const userIcon = "https://img.icons8.com/fluency/96/user-male-circle.png";
const gmailIcon = "https://img.icons8.com/color/96/gmail-new.png";
const linkedinIcon = "https://img.icons8.com/color/96/linkedin.png";
const githubIcon = "https://img.icons8.com/ios-filled/100/github.png";
const phoneIcon = "https://img.icons8.com/color/96/phone.png";

export const APP_CONFIG: Record<AppId, AppConfig> = {
  projects: { title: 'PROJECTS', iconUrl: folderIcon, defaultSize: { width: 650, height: 450 } },
  certificates: { title: 'CERTIFICATES', iconUrl: certificateIcon, defaultSize: { width: 650, height: 450 } },
  skills: { title: 'SKILLS', iconUrl: skillsIcon, defaultSize: { width: 600, height: 500 } },
  education: { title: 'EDUCATION', iconUrl: educationIcon, defaultSize: { width: 600, height: 400 } },
  terminal: { title: 'TERMINAL', iconUrl: terminalIcon, defaultSize: { width: 700, height: 500 } },
  about: { title: 'ABOUT ME', iconUrl: userIcon, defaultSize: { width: 600, height: 650 } },
  admin: { title: 'SETTINGS', iconUrl: settingsIcon, defaultSize: { width: 800, height: 600 } },
  login: { title: 'AUTHENTICATE', iconUrl: lockIcon, defaultSize: { width: 400, height: 300 } },
  viewer: { title: 'DOC_VIEWER', iconUrl: folderIcon, defaultSize: { width: 800, height: 600 } },
  gmail: { title: 'CONTACT ME', iconUrl: gmailIcon, defaultSize: { width: 450, height: 520 } },
  linkedin: { title: 'LINKEDIN', iconUrl: linkedinIcon, defaultSize: { width: 0, height: 0 }, isExternal: true, url: "https://www.linkedin.com/in/ariba-rajbhara-3023a7262/" },
  github: { title: 'GITHUB', iconUrl: githubIcon, defaultSize: { width: 0, height: 0 }, isExternal: true, url: "https://github.com/Ari-raj" },
  phone: { title: 'PHONE', iconUrl: phoneIcon, defaultSize: { width: 320, height: 180 } },
};

export const DOCK_APPS: AppId[] = ['about', 'terminal'];

export const INITIAL_CONTENT: Content = {
    projects: [
        { id: 'proj-1', title: 'Portfolio Activity: Conduct a security audit', description: 'A comprehensive security audit report identifying vulnerabilities and recommending remediation steps for a corporate network.', url: 'https://docs.google.com/document/d/1Fo7ifph97DTXjxWcQ2vfUBZstSF9nI0HCvuBWZOmYWg/preview' },
        { id: 'proj-2', title: 'Portfolio Activity: Use the NIST Cybersecurity Framework', description: 'An incident response plan developed using the NIST Cybersecurity Framework to handle a simulated data breach.', url: 'https://docs.google.com/document/d/1Z-qt43UCwauI0D7AAG_cD4x2pLYPVHhVF9Ewi5nw-WM/preview' },
        { id: 'proj-3', title: 'Portfolio Activity Exemplar: Use Linux commands', description: 'A technical guide demonstrating the use of core Linux commands to manage and secure file permissions effectively.', url: 'https://docs.google.com/document/d/1zmPgP-fcXw8u4OzyjYyu72RNISayywIlSxDAIrnZi40/preview' },
        { id: 'proj-4', title: 'Portfolio Activity: Apply filters to SQL queries', description: 'An analysis of applying security filters to SQL queries to prevent common injection attacks and unauthorized data access.', url: 'https://docs.google.com/document/d/1WD6nQgZ42c5cRt4PV9kZE2odQltpVXdgh_qH-JZIjFM/preview' },
        { id: 'proj-5', title: 'Portfolio Activity: Analyze a vulnerable system', description: 'A detailed analysis of a vulnerable system, identifying security flaws and proposing a multi-layered defense strategy.', url: 'https://docs.google.com/document/d/1x6eo4n-wg7KWgPgybZ461U02qgymhixhkWLRyYzRgNs/preview' },
        { id: 'proj-6', title: 'Portfolio Activity: Document an incident with a journal', description: 'A step-by-step documentation of a security incident from detection to resolution, following industry best practices.', url: 'https://docs.google.com/document/d/1E332c-R724Pdb9vAAZzRK2XLnVVtM78ssDt0peLrTjc/preview' },
        { id: 'proj-7', title: 'Portfolio Activity: Update a file through a Python algorithm', description: 'A Python script designed to automate the process of updating a file securely using cryptographic methods.', url: 'https://docs.google.com/document/d/1CPw9Mlv21PUSKj-qFUwhU44W2EvrWwgcDE32ZiDh7aE/preview' },
        { id: 'proj-8', title: 'Python Keylogger', description: 'A technical breakdown and ethical analysis of a keylogger script developed in Python for educational purposes.', url: 'https://docs.google.com/document/d/1p2yBfNZMsHYSDYxZcysJ9qrm-DsMU1K6zeSybfkY54M/preview' },
    ],
    certificates: [
        { id: 'cert-1', title: 'Google Cybersecurity Professional Certificate', description: 'A comprehensive professional certificate from Google, validating core skills in cybersecurity analysis, threat detection, and response.', url: 'https://drive.google.com/file/d/149MEW90sQ-4XDa03nZ0M5_rE0tM311nR/preview' },
        { id: 'cert-2', title: 'Foundations of Cybersecurity', description: 'Covers the foundational concepts of cybersecurity, including the CIA triad, security frameworks, and professional ethics.', url: 'https://drive.google.com/file/d/1EjL0WS3HJjveJt0pjYjkcRwCA_cLCpT5/preview' },
        { id: 'cert-3', title: 'Play It Safe: Manage Security Risks', description: 'Focuses on risk management, threat modeling, and security auditing processes to protect organizational assets.', url: 'https://drive.google.com/file/d/1h6M9fLV49eJYQpeFwP-s3P9CASYgzaGO/preview' },
        { id: 'cert-4', title: 'Connect and Protect: Networks and Network Security', description: 'Explores network architecture, communication protocols, and security measures like firewalls, VPNs, and IDS/IPS.', url: 'https://drive.google.com/file/d/1VvJR-m6CPmpiynCCTygkF-pVcHVJbTvR/preview' },
        { id: 'cert-5', title: 'Tools of the Trade: Linux and SQL', description: 'Provides hands-on experience with essential cybersecurity tools, including Linux command-line operations and SQL for data analysis.', url: 'https://docs.google.com/document/d/1u3OzcXl4jMbzM-H_A-4KoNxCSJ4eayF3/preview' },
        { id: 'cert-6', title: 'Assets, Threats, and Vulnerabilities', description: 'Details how to identify, classify, and protect organizational assets from various threats and vulnerabilities.', url: 'https://drive.google.com/file/d/1W_Fd37pF0inljUwZF6d1FRd6ToLOxvW6/preview' },
        { id: 'cert-7', title: 'Sound the Alarm: Detection and Response', description: 'Teaches incident detection using SIEM tools, packet analysis, and forensic techniques for effective incident response.', url: 'https://drive.google.com/file/d/1dG9VJsV6vkOCjBEPqSRtJtyhQf0YKMiV/preview' },
        { id: 'cert-8', title: 'Automate Cybersecurity Tasks with Python', description: 'Introduces Python scripting to automate security tasks, interact with APIs, and build simple security tools.', url: 'https://drive.google.com/file/d/102cpu9xRfKEEU4axMbCfXiDavkyGd4eG/preview' },
    ],
    skills: {
        "Programming": ["C", "C++", "Java", "Python", "C#", "Kotlin", "VB.NET", "SQL", "HTML", "CSS", "PHP"],
        "Tools & Frameworks": ["Flutter", "Android Studio", "Visual Studio", "VS Code", "XAMPP", "Figma"],
        "Cybersecurity": ["Network security basics (firewalls, TCP/IP, VPNs)", "Linux commands & permissions", "SQL for analyzing security data", "Risk management & threat detection", "Security controls & encryption", "Incident response fundamentals"],
        "Databases": ["SQL", "SQLite", "Microsoft Access"],
        "Platforms": ["Windows", "Linux", "Unix"],
        "Soft Skills": ["Leadership", "Communication", "Creative Thinking", "Project Management"],
    },
    education: [
      {
        id: "edu-1",
        degree: "Bachelor of Computer Applications (BCA)",
        institution: "SDJ International College, VNSGU",
        period: "2022-2025",
        details: ["Specialization: Mobile App Development", "GPA: 8.30, 8.30, 8.09, 7.87, 8.26, 9.43"]
      },
      {
        id: "edu-2",
        degree: "High School (Science – Maths)",
        institution: "Sarvajanik School of Science",
        period: "Graduated: 2022",
        details: []
      }
    ],
    about: {
        name: "Ariba Rajbhara",
        tagline: "Aspiring Cybersecurity Student",
        professionalStatement: "A highly motivated and detail-oriented cybersecurity professional with a strong foundation in computer applications and network principles. I recently completed the Google Cybersecurity Certificate, demonstrating my proficiency in security analysis, incident response, and threat detection. My experience in problem-solving and my commitment to continuous learning make me an ideal candidate for an entry-level Security Operations Center (SOC) Analyst or Cybersecurity Analyst role. I am eager to apply my skills to protect digital assets and contribute to a dynamic security team.",
        achievements: [
            "Letter of Appreciation for Technical Leadership",
            '"Creative Leader" Award for War of Worlds',
            "Recognized by College Principal for successful event execution"
        ],
        photoUrl: "https://drive.google.com/uc?export=view&id=1w-XU5BPU1klyvt9n0E5oQdQWTdgWHMUi" 
    },
    contact: {
        email: "rajbharaariba@kpccommerce.ac.in",
        phone: "+91 8141990019",
        linkedin: "https://www.linkedin.com/in/ariba-rajbhara-3023a7262/",
        github: "https://github.com/Ari-raj"
    }
};