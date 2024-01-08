import type { Api, Base, Service } from "../types";

export class Comment {
  constructor(workspace: Service.Workspace) {
    this._apiToken = workspace.token;
    this._workspaceId = workspace.id;
  }

  private _apiToken: Service.Token;
  private _workspaceId: Base.Double;

  /**
   * @see https://clickup.com/api/clickupreference/operation/CreateTaskComment/
   */
  async create(
    taskId: string,
    stagedComment: Api.StagedTaskComment,
    options?: Omit<Api.TaskCommentCreateOptions, "team_id">
  ): Promise<{
    commentMeta: Api.NewTaskComment | null;
    error: Error | null;
  }> {
    const appliedOptions: Api.TaskCreateOptions = {
      ...(options?.custom_task_ids !== undefined && {
        custom_task_ids: options.custom_task_ids,
        team_id: this._workspaceId,
      }),
    };
    const query = new URLSearchParams(
      JSON.stringify(appliedOptions)
    ).toString();
    try {
      const response = await fetch(
        `https://api.clickup.com/api/v2/task/${taskId}/comment?${query}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: this._apiToken,
          },
          body: JSON.stringify(stagedComment),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const commentMeta: Api.NewTaskComment = await response.json();
      return { commentMeta, error: null };
    } catch (error) {
      return { commentMeta: null, error };
    }
  }
}
