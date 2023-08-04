export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  socials?: {
    instagram: string;
    twitter: string;
    linkedin: string;
  };
  links?: Link[];
}

export interface Link {
  id: string;
  title: string;
  href: string;
  target: string;
}
