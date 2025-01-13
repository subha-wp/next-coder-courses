export interface Question {
  id: number;
  text: string;
  options: string[];
  category: "frontend" | "backend" | "general";
}

export const questions: Question[] = [
  {
    id: 1,
    text: "Which aspect of web development interests you more?",
    options: [
      "Creating visually appealing user interfaces",
      "Working with data and server-side logic",
      "Both equally interest me",
      "I'm not sure yet",
    ],
    category: "general",
  },
  {
    id: 2,
    text: "Which of the following tasks sounds more appealing to you?",
    options: [
      "Designing layouts and user interactions",
      "Managing databases and server operations",
      "Writing algorithms and solving complex problems",
      "Building APIs and integrating services",
    ],
    category: "general",
  },
  {
    id: 3,
    text: "What's your favorite subject in school?",
    options: ["Art or Design", "Mathematics", "Computer Science", "Physics"],
    category: "general",
  },
  {
    id: 4,
    text: "Which programming language are you most interested in learning?",
    options: ["JavaScript", "Python", "Java", "C++"],
    category: "general",
  },
  {
    id: 5,
    text: "What type of projects would you enjoy working on?",
    options: [
      "Interactive websites and mobile apps",
      "Data analysis and machine learning",
      "E-commerce platforms",
      "Game development",
    ],
    category: "general",
  },
  {
    id: 6,
    text: "How comfortable are you with visual design principles?",
    options: [
      "Very comfortable",
      "Somewhat comfortable",
      "Not very comfortable",
      "I prefer logic over design",
    ],
    category: "frontend",
  },
  {
    id: 7,
    text: "Which of these tools have you heard of or used before?",
    options: ["Photoshop or Figma", "MySQL or PostgreSQL", "Both", "Neither"],
    category: "general",
  },
  {
    id: 8,
    text: "How do you feel about working with large amounts of data?",
    options: [
      "I find it overwhelming",
      "I enjoy analyzing and managing data",
      "I'm indifferent",
      "I prefer working with visual elements",
    ],
    category: "backend",
  },
  {
    id: 9,
    text: "Which of these concepts interests you more?",
    options: [
      "User Experience (UX) design",
      "Database optimization",
      "Both equally",
      "Neither",
    ],
    category: "general",
  },
  {
    id: 10,
    text: "How do you feel about mathematics and algorithms?",
    options: [
      "I enjoy them and find them easy",
      "They're challenging but interesting",
      "I prefer more creative tasks",
      "I try to avoid them",
    ],
    category: "backend",
  },
  {
    id: 11,
    text: "Which of these activities do you enjoy most?",
    options: [
      "Sketching and drawing",
      "Solving puzzles and riddles",
      "Writing stories",
      "Building things with Lego or similar toys",
    ],
    category: "general",
  },
  {
    id: 12,
    text: "How do you feel about learning new programming languages?",
    options: [
      "I'm excited to learn many languages",
      "I prefer to master one language deeply",
      "I'm interested in language-agnostic concepts",
      "I'm not sure about programming languages yet",
    ],
    category: "general",
  },
  {
    id: 13,
    text: "Which of these would you rather work on?",
    options: [
      "A website's color scheme and layout",
      "Optimizing a website's loading speed",
      "Implementing user authentication",
      "Setting up a content management system",
    ],
    category: "general",
  },
  {
    id: 14,
    text: "How do you feel about working with APIs?",
    options: [
      "I find them confusing",
      "I'm excited to integrate different services",
      "I'm more interested in creating APIs",
      "I don't know much about APIs yet",
    ],
    category: "backend",
  },
  {
    id: 15,
    text: "Which of these sounds more interesting to learn?",
    options: [
      "CSS animations and transitions",
      "Database indexing and query optimization",
      "Both sound equally interesting",
      "Neither sounds interesting to me",
    ],
    category: "general",
  },
  {
    id: 16,
    text: "How do you feel about debugging and problem-solving?",
    options: [
      "I enjoy visual debugging tools",
      "I like diving deep into code and logs",
      "Both approaches appeal to me",
      "I find debugging frustrating",
    ],
    category: "general",
  },
  {
    id: 17,
    text: "Which of these concepts sounds more appealing to learn?",
    options: [
      "Responsive web design",
      "Server scaling and load balancing",
      "Both sound interesting",
      "Neither sounds appealing",
    ],
    category: "general",
  },
  {
    id: 18,
    text: "How do you feel about working with version control systems like Git?",
    options: [
      "I'm comfortable with basic commands",
      "I enjoy managing complex branching strategies",
      "I haven't used Git but I'm willing to learn",
      "Version control sounds complicated to me",
    ],
    category: "general",
  },
  {
    id: 19,
    text: "Which of these tasks would you prefer to work on?",
    options: [
      "Creating a user-friendly form with validation",
      "Setting up a database schema",
      "Implementing a search functionality",
      "Configuring server security",
    ],
    category: "general",
  },
  {
    id: 20,
    text: "How do you feel about working in a team?",
    options: [
      "I enjoy collaborating with designers",
      "I prefer working independently on complex problems",
      "I like pair programming and code reviews",
      "I'm not sure how I feel about teamwork yet",
    ],
    category: "general",
  },
];
