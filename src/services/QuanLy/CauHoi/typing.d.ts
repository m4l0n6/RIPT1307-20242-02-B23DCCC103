declare module Question {
  export interface Record {
    id: number;
    question_content: string;
    question_subject: string;
    question_level: string;
    question_knowledge: string;
    createdAt?: string;
    updatedAt?: string;
  }
}
