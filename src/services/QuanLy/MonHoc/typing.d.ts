declare module Course {
    export interface Record {
        id: number;
        code: string;
        name: string;
        credits: number;
        knowledgeBlocks: string[];
    }
}