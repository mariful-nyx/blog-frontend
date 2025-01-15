import { Settings } from "http2";
import { ReactNode } from "react";

export interface CarouselProps {
    items: ReactNode[];
    settings?: Settings;
    className?: string;
}

export interface PostProps {
    id: number;
    user: number;
    posted_by: string;
    thumbnail: string | null;
    title: string;
    description: string;
    tag: Tag[];
    category: Category[];
    likes_count: number;
    liked_users: number[];
    created_at: string; // or Date if you prefer to work with Date objects
    updated_at: string; // or Date if you prefer to work with Date objects
    meta_title: string;
    meta_description: string[];
    slug: string;
  }
  


  export interface Tag {
    id: number;
    name: string;
  };
  
  export  interface Category {
    id: number;
    name: string;
  };
  
  export interface RelatedArticle {
    id: number;
    user: number;
    posted_by: string;
    thumbnail: string | null;
    title: string;
    description: string;
    created_at: string;
    updated_at: string;
    slug: string;
  };
  
export interface PostType {
    id: number;
    user: number;
    posted_by: string;
    thumbnail: number;
    thumbnail_img: string;
    title: string;
    description: string;
    tag: Tag[];
    category: Category;
    likes_count: number;
    liked_users: number[]; // Assuming liked_users is an array of user IDs
    posted_at: string;
    updated_at: string;
    meta_title: string;
    meta_description: string[];
    slug: string;
    related_article: RelatedArticle[];
  };
  


  export interface SubSubCategories {
    id: number;
    name: string;
  }
  
  export interface SubCategories {
    id: number;
    name: string;
    subsubcategories?: SubSubCategories[];
  }
  
  export interface Categories {
    id: number;
    name: string;
    subcategories?: SubCategories[];
  }

  
  // Interface for individual post data
  export interface Post {
      id: number;
      user: number;
      posted_by: string;
      thumbnail: string;
      thumbnail_img: string;
      title: string;
      description: string;
      created_at: string;  // ISO Date string
      updated_at: string;  // ISO Date string
      slug: string;
  }
  
  // Interface for pagination metadata
  export interface Pagination {
      count: number;
      total_pages: number;
      current_page: number;
      next_page_url: string | null;
      next_page_number: number | null;
      prev_page_link: string | null;
      prev_page_number: number | null;
  }
  

  export interface PostListResponse {
    count: number;
    total_pages: number;
    current_page: number;
    next_page_url: string | null;
    next_page_number: number | null;
    prev_page_link: string | null;
    prev_page_number: number | null;
    results: Post[];
      
  }





  export interface Comment {
    id: number;
    post: number; // You can further define the post type if necessary
    user: number; // You can further define the user type if needed
    comment: string;
    username: string;
  }



  export interface UserDetailType {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    avater: string;
    password: string;
    is_staff: boolean;
    is_active: boolean;
    date_joined: string;
    last_login: string; 
    is_superuser: boolean;
    posts: Post[];
    comments: Comment[];
    role: string;
    status: string;
    profession: string;
    university: string;
  }
  




  export interface User {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    avater: string | null;
    date_joined: string;
    role: 'GENERAL' | 'MODERATOR' | 'ADMIN'; // You can expand the role options as needed
    status: string;
    profession: string;
    university: string;
    posts: number;
    comments: number;
  }
  
  export interface PaginatedUsers {
    count: number;
    total_pages: number;
    current_page: number;
    next_page_url: string;
    next_page_number: number;
    prev_page_link: string | null;
    prev_page_number: number | null;
    results: User[];
  }
  



  export interface LoginFormData {
    email: string;
    password: string;
  }



  export interface ApiErrorResponse {
    error: string;
  }

  export interface Refresh {
    refresh: string;
  }


  export interface UpdateProfileTypes {
   username:string;
   email: string;
   avater?: File;
   status?: string;
   profession?: string;
   university?: string;
  }




  export interface PostFormData {
    thumbnail: unknown,
    title: string,
    description: string,
    tag: string[],
    category: number,
    related_article: number[]
  }