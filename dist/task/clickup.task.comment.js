"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
class Comment {
    constructor(workspace) {
        this._apiToken = workspace.token;
        this._workspaceId = workspace.id;
    }
    _apiToken;
    _workspaceId;
    /**
     * @see https://clickup.com/api/clickupreference/operation/CreateTaskComment/
     */
    async create(taskId, stagedComment, options) {
        const appliedOptions = {
            ...(options?.custom_task_ids !== undefined && {
                custom_task_ids: options.custom_task_ids,
                team_id: this._workspaceId,
            }),
        };
        const query = new URLSearchParams(JSON.stringify(appliedOptions)).toString();
        try {
            const res = await post(`https://api.clickup.com/api/v2/task/${taskId}/comment?${query}`, stagedComment, {
                headers: {
                    Authorization: this._apiToken,
                },
            });
            const commentMeta = res.data;
            return { commentMeta, error: null };
        }
        catch (error) {
            return { commentMeta: null, error };
        }
    }
}
exports.Comment = Comment;
