export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnailUrl?: string;
  price: number;
  isFree: boolean;
  instructor: {
    name: string;
    email?: string;
  };
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  content: string;
  duration?: number;
  isFree: boolean;
  videos: Video[];
  materials: Material[];
}

export interface Video {
  id: string;
  title: string;
  url: string;
  duration?: number;
  order: number;
}

export interface Material {
  id: string;
  title: string;
  type: string;
  url: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}
