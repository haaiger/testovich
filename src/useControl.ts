import { Reducer } from "react";
import { ITask, TaskActionType } from "./interface";

/** Редюсер для управления состоянием задач. */
export const tasksReducer: Reducer<ITask[], TaskActionType> = (
    state: ITask[],
    action: TaskActionType
) => {
    switch (action.type) {
        case "ADD_TASK":
            return [
                ...state,
                { id: Date.now(), text: action.payload, completed: false },
            ];
        case "TOGGLE_TASK":
            return state.map((task: ITask) =>
                task.id === action.payload
                    ? { ...task, completed: !task.completed }
                    : task
            );
        case "DELETE_TASK":
            return state.filter((task: ITask) => task.id !== action.payload);
        default:
            return state;
    }
};