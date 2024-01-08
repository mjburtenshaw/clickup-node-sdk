import { Comment } from "./clickup.task.comment";
import type { Api, Base, Service } from "../types";
export declare class Task {
    constructor(workspace: Service.Workspace);
    private _apiToken;
    private _workspaceId;
    Comment: Comment;
    /**
     * @see https://clickup.com/api/clickupreference/operation/CreateTask/
     */
    create(listId: Base.Double, stagedClickupTask: Api.StagedTask, options?: Omit<Api.TaskCreateOptions, "team_id">): Promise<{
        task: Api.NewTask | null;
        error: Error | null;
    }>;
    /**
     * @see https://clickup.com/api/clickupreference/operation/GetTask/
     */
    get(taskId: string, options?: Omit<Api.TaskReadOptions, "team_id">): Promise<{
        task: Api.RetrievedTask | null;
        error: Error | null;
    }>;
    /**
     * @see https://clickup.com/api/clickupreference/operation/UpdateTask/
     */
    update(taskId: string, taskUpdate: Api.TaskUpdate, options?: Omit<Api.TaskUpdateOptions, "team_id">): Promise<{
        task: Api.UpdatedTask | null;
        error: Error | null;
    }>;
    /**
     * @see https://clickup.com/api/clickupreference/operation/StartatimeEntry/
     */
    startTimer(taskId: string, options?: Omit<Api.TaskStartTimerOptions, "team_id">): Promise<{
        startedTimer: Api.StartedTimer | null;
        error: Error | null;
    }>;
    /**
     * @see https://clickup.com/api/clickupreference/operation/StopatimeEntry/
     */
    stopTimer(): Promise<{
        stoppedTimer: Api.StoppedTimer | null;
        error: Error | null;
    }>;
    /** There are two kinds of Task URLs:
     *
     * - One that uses a workspaceId/customId combo, e.g., https://app.clickup.com/t/some-workspace-id/some-custom-id
     * - One that uses a id/customId combo, e.g., https://app.clickup.com/t/some-task-id/some-custom-id
     */
    parseIds(taskUrl: Base.Url): {
        id: string | null;
        customId: string | null;
        error: Error | null;
    };
}
