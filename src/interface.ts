/** Интерфейс для одной таски. */
export interface ITask {
    id: number;
    text: string;
    completed: boolean;
}

/** Действия для редюсера. */
export type TaskActionType =
    | { type: "ADD_TASK"; payload: string }
    | { type: "DELETE_TASK"; payload: number }
    | { type: "TOGGLE_TASK"; payload: number };