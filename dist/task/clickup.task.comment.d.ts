import type { Api, Service } from "../types";
export declare class Comment {
    constructor(workspace: Service.Workspace);
    private _apiToken;
    private _workspaceId;
    /**
     * @see https://clickup.com/api/clickupreference/operation/CreateTaskComment/
     */
    create(taskId: string, stagedComment: Api.StagedTaskComment, options?: Omit<Api.TaskCommentCreateOptions, "team_id">): Promise<{
        commentMeta: Api.NewTaskComment | null;
        error: Error | null;
    }>;
}
