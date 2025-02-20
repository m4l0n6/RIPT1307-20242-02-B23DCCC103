declare module Process {
    export interface Record {
        id: number;
        name: string;
        content: string;
        note: string;
        progress: boolean; 
        time: number;
    }
}