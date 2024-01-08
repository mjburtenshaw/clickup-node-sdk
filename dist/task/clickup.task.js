"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
const clickup_constants_1 = require("../clickup.constants");
const clickup_task_comment_1 = require("./clickup.task.comment");
class Task {
    constructor(workspace) {
        this._apiToken = workspace.token;
        this._workspaceId = workspace.id;
        this.Comment = new clickup_task_comment_1.Comment(workspace);
    }
    _apiToken;
    _workspaceId;
    Comment;
    /**
     * @see https://clickup.com/api/clickupreference/operation/CreateTask/
     */
    async create(listId, stagedClickupTask, options) {
        const appliedOptions = {
            ...(options?.custom_task_ids !== undefined && {
                custom_task_ids: options.custom_task_ids,
                team_id: this._workspaceId,
            }),
        };
        const query = new URLSearchParams(JSON.stringify(appliedOptions)).toString();
        try {
            const res = await post(`https://api.clickup.com/api/v2/list/${listId}/task?${query}`, stagedClickupTask, {
                headers: {
                    Authorization: this._apiToken,
                },
            });
            const task = await res.data;
            return { task, error: null };
        }
        catch (error) {
            return { task: null, error };
        }
    }
    /**
     * @see https://clickup.com/api/clickupreference/operation/GetTask/
     */
    async get(taskId, options) {
        const appliedOptions = {
            ...(options?.include_markdown_description !== undefined && {
                include_markdown_description: options.include_markdown_description,
            }),
            ...(options?.include_subtasks !== undefined && {
                include_subtasks: options.include_subtasks,
            }),
            ...(options?.custom_task_ids !== undefined && {
                custom_task_ids: options.custom_task_ids,
                team_id: String(this._workspaceId),
            }),
        };
        const query = new URLSearchParams(appliedOptions).toString();
        try {
            const res = await get(`https://api.clickup.com/api/v2/task/${taskId}?${query}`, {
                headers: {
                    Authorization: this._apiToken,
                },
            });
            const task = res.data;
            return { task, error: null };
        }
        catch (error) {
            return { task: null, error };
        }
    }
    /**
     * @see https://clickup.com/api/clickupreference/operation/UpdateTask/
     */
    async update(taskId, taskUpdate, options) {
        try {
            const appliedOptions = {
                ...(options?.custom_task_ids !== undefined && {
                    custom_task_ids: options.custom_task_ids,
                    team_id: this._workspaceId,
                }),
            };
            const query = new URLSearchParams(JSON.stringify(appliedOptions)).toString();
            const res = await put(`https://api.clickup.com/api/v2/task/${taskId}?${query}`, taskUpdate, {
                headers: {
                    Authorization: this._apiToken,
                },
            });
            const task = await res.data;
            return { task, error: null };
        }
        catch (error) {
            return { task: null, error };
        }
    }
    /**
     * @see https://clickup.com/api/clickupreference/operation/StartatimeEntry/
     */
    async startTimer(taskId, options) {
        try {
            const appliedOptions = {
                ...(options?.custom_task_ids === "true" && {
                    custom_task_ids: options.custom_task_ids,
                    team_id: String(this._workspaceId),
                }),
            };
            const query = new URLSearchParams(appliedOptions).toString();
            const res = await post(`https://api.clickup.com/api/v2/team/${this._workspaceId}/time_entries/start?${query}`, JSON.stringify({
                tid: taskId,
            }), {
                headers: {
                    Authorization: this._apiToken,
                },
            });
            const startedTimer = await res.data.data;
            return { startedTimer, error: null };
        }
        catch (error) {
            return { startedTimer: null, error };
        }
    }
    /**
     * @see https://clickup.com/api/clickupreference/operation/StopatimeEntry/
     */
    async stopTimer() {
        try {
            const res = await post(`https://api.clickup.com/api/v2/team/${this._workspaceId}/time_entries/stop`, null, {
                headers: {
                    Authorization: this._apiToken,
                },
            });
            const stoppedTimer = await res.data;
            return { stoppedTimer, error: null };
        }
        catch (error) {
            return { stoppedTimer: null, error };
        }
    }
    /** There are two kinds of Task URLs:
     *
     * - One that uses a workspaceId/customId combo, e.g., https://app.clickup.com/t/some-workspace-id/some-custom-id
     * - One that uses a id/customId combo, e.g., https://app.clickup.com/t/some-task-id/some-custom-id
     */
    parseIds(taskUrl) {
        try {
            const [_, taskIds] = taskUrl.split(clickup_constants_1.clickup.task.urlIdentifier);
            const [idOrWorkspaceId, customId] = taskIds.split("/");
            const id = idOrWorkspaceId === String(this._workspaceId) ? null : idOrWorkspaceId;
            if (!id && !customId) {
                return {
                    id: null,
                    customId: null,
                    error: new Error("💣 couldn't parse an ID from Task URL"),
                };
            }
            return { id, customId: customId || null, error: null };
        }
        catch (error) {
            return { id: null, customId: null, error };
        }
    }
}
exports.Task = Task;
