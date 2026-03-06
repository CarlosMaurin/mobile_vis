
export interface ServiceCardProps {
  number: string;
  category: string;
  title: string;
  description: string;
  direction: 'left' | 'right' | 'up';
}

export interface TeamMemberProps {
  name: string;
  role: string;
  image: string;
  bgImage: string;
  bio: string;
}

export interface B2CCardProps {
  type: 'B2C' | 'B2B';
  title: string;
  number: string;
  image: string;
}

export interface TestimonialProps {
  author: string;
  role: string;
  company: string;
  quote: string;
  description: string;
  avatar: string;
}
