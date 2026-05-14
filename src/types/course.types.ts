export interface Instructor {
  id: number;
  name: {
    first: string;
    last: string;
    title: string;
  };
  email: string;
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
}

export interface Course {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  instructor?: Instructor; // We'll link instructors to courses artificially
}

export interface CourseResponse {
  data: {
    data: Course[];
    total: number;
    page: number;
    limit: number;
  };
}

export interface InstructorResponse {
  data: {
    data: Instructor[];
  };
}