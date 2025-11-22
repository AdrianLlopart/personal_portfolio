export interface Project {
  title: string;
  description: string;
  date: string;
  tags: string[];
  link?: string;
  type: 'project' | 'paper' | 'video';
}

export const projects: Project[] = [
  {
    title: "Deep Researcher Agent",
    description: "An autonomous agent capable of conducting deep research on given topics, summarizing findings, and generating reports.",
    date: "2025-10-15",
    tags: ["AI", "Agents", "Python", "NLP"],
    type: "project",
    link: "https://github.com/AdrianLlopart/deep-researcher"
  },
  {
    title: "Voice to Text & Text to Voice Pipeline",
    description: "A robust pipeline for converting voice to text and vice versa, optimized for low latency and high accuracy.",
    date: "2025-09-01",
    tags: ["Audio", "Speech Processing", "Python"],
    type: "project"
  },
  {
    title: "Advanced Acoustic Simulation",
    description: "Research paper on simulating complex acoustic environments for testing audio processing algorithms.",
    date: "2025-06-20",
    tags: ["Research", "Audio", "Simulation"],
    type: "paper",
    link: "#"
  },
  {
    title: "Kino Management Platform",
    description: "Full-stack application for managing film production workflows, featuring real-time collaboration.",
    date: "2025-01-10",
    tags: ["Web Dev", "React", "Firebase", "Full Stack"],
    type: "project"
  },
  {
    title: "Demo: Real-time Object Detection",
    description: "Video demonstration of YOLOv8 integration in a custom video processing pipeline.",
    date: "2024-11-05",
    tags: ["Computer Vision", "Video", "Demo"],
    type: "video",
    link: "#"
  }
];

export const bio = "I am Adrian Llopart, a software engineer and researcher specializing in AI, Audio Processing, and Full Stack Development. I love building tools that solve complex problems.";
