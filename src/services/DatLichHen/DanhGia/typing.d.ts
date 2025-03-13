export interface Employee {
  id: number;
  name: string;
  service: string;
  reviews: Review[];
}

export interface Review {
  rating: number;
  comment: string;
  response?: string;
  date?: string;
}

export interface ResponseState {
  [key: number]: string;
}