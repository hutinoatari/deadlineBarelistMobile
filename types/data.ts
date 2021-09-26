export interface TaskData {
    id: string;
    name: string;
    deadline: number;
    isDone: boolean;
}

export interface EveryTaskData {
    id: string;
    name: string;
    addDay: number;
    grace: number;
}
