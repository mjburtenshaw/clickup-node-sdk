import { clickup } from "../clickup.constants";
import { Comment } from "./clickup.task.comment";
import type { Api, Base, Service } from "../types";

export class Task {
  constructor(workspace: Service.Workspace) {
    this._apiToken = workspace.token;
    this._workspaceId = workspace.id;
    this.Comment = new Comment(workspace);
  }

  private _apiToken: Service.Token;
  private _workspaceId: Base.Double;
  public Comment: Comment;

  // Create Task
  async create(
    listId: Base.Double,
    stagedClickupTask: Api.StagedTask,
    options?: Omit<Api.TaskCreateOptions, "team_id">
  ): Promise<{ task: Api.NewTask | null; error: Error | null }> {
    // Build the query parameters
    const appliedOptions: Api.TaskCreateOptions = {
      ...(options?.custom_task_ids !== undefined && {
        custom_task_ids: options.custom_task_ids,
        team_id: this._workspaceId,
      }),
    };
    const query = new URLSearchParams(
      JSON.stringify(appliedOptions)
    ).toString();

    // Try to execute the POST request
    try {
      const response = await fetch(
        `https://api.clickup.com/api/v2/list/${listId}/task?${query}`,
        {
          method: "POST", // Specify the method as POST
          headers: {
            "Content-Type": "application/json", // Set Content-Type as application/json
            Authorization: this._apiToken, // Set Authorization header
          },
          body: JSON.stringify(stagedClickupTask), // Convert stagedClickupTask to JSON string
        }
      );

      // Check if the response is OK
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Parse the JSON response
      const task: Api.NewTask = await response.json();
      return { task, error: null };
    } catch (error) {
      return { task: null, error };
    }
  }

  // Get Task
  async get(
    taskId: string,
    options?: Omit<Api.TaskReadOptions, "team_id">
  ): Promise<{ task: Api.RetrievedTask | null; error: Error | null }> {
    // Build the query parameters
    const appliedOptions: Api.TaskReadOptions = {
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

    // Try to execute the GET request
    try {
      const response = await fetch(
        `https://api.clickup.com/api/v2/task/${taskId}?${query}`,
        {
          headers: {
            Authorization: this._apiToken, // Set Authorization header
          },
        }
      );

      // Check if the response is OK
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Parse the JSON response
      const task: Api.RetrievedTask = await response.json();
      return { task, error: null };
    } catch (error) {
      return { task: null, error };
    }
  }

  // Update Task
  async update(
    taskId: string,
    taskUpdate: Api.TaskUpdate,
    options?: Omit<Api.TaskUpdateOptions, "team_id">
  ): Promise<{ task: Api.UpdatedTask | null; error: Error | null }> {
    // Build the query parameters
    const appliedOptions: Api.TaskCreateOptions = {
      ...(options?.custom_task_ids !== undefined && {
        custom_task_ids: options.custom_task_ids,
        team_id: this._workspaceId,
      }),
    };
    const query = new URLSearchParams(
      JSON.stringify(appliedOptions)
    ).toString();

    // Try to execute the PUT request
    try {
      const response = await fetch(
        `https://api.clickup.com/api/v2/task/${taskId}?${query}`,
        {
          method: "PUT", // Specify the method as PUT
          headers: {
            "Content-Type": "application/json", // Set Content-Type as application/json
            Authorization: this._apiToken, // Set Authorization header
          },
          body: JSON.stringify(taskUpdate), // Convert taskUpdate to JSON string
        }
      );

      // Check if the response is OK
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Parse the JSON response
      const task: Api.UpdatedTask = await response.json();
      return { task, error: null };
    } catch (error) {
      return { task: null, error };
    }
  }

  // Start Timer
  async startTimer(
    taskId: string,
    options?: Omit<Api.TaskStartTimerOptions, "team_id">
  ): Promise<{ startedTimer: Api.StartedTimer | null; error: Error | null }> {
    // Build the query parameters
    const appliedOptions: Api.TaskStartTimerOptions = {
      ...(options?.custom_task_ids === "true" && {
        custom_task_ids: options.custom_task_ids,
        team_id: String(this._workspaceId),
      }),
    };
    const query = new URLSearchParams(appliedOptions).toString();

    // Try to execute the POST request
    try {
      const response = await fetch(
        `https://api.clickup.com/api/v2/team/${this._workspaceId}/time_entries/start?${query}`,
        {
          method: "POST", // Specify the method as POST
          headers: {
            "Content-Type": "application/json", // Set Content-Type as application/json
            Authorization: this._apiToken, // Set Authorization header
          },
          body: JSON.stringify({ tid: taskId }), // Convert { tid: taskId } to JSON string
        }
      );

      // Check if the response is OK
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Parse the JSON response
      const startedTimer: Api.StartedTimer = await response.json();
      return { startedTimer, error: null };
    } catch (error) {
      return { startedTimer: null, error };
    }
  }

  // Stop Timer
  async stopTimer(): Promise<{
    stoppedTimer: Api.StoppedTimer | null;
    error: Error | null;
  }> {
    // Try to execute the POST request
    try {
      const response = await fetch(
        `https://api.clickup.com/api/v2/team/${this._workspaceId}/time_entries/stop`,
        {
          method: "POST", // Specify the method as POST
          headers: {
            Authorization: this._apiToken, // Set Authorization header
          },
          // No body is needed for stopping the timer
        }
      );

      // Check if the response is OK
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Parse the JSON response
      const stoppedTimer: Api.StoppedTimer = await response.json();
      return { stoppedTimer, error: null };
    } catch (error) {
      return { stoppedTimer: null, error };
    }
  }

  /** There are two kinds of Task URLs:
   *
   * - One that uses a workspaceId/customId combo, e.g., https://app.clickup.com/t/some-workspace-id/some-custom-id
   * - One that uses a id/customId combo, e.g., https://app.clickup.com/t/some-task-id/some-custom-id
   */
  parseIds(taskUrl: Base.Url): {
    id: string | null;
    customId: string | null;
    error: Error | null;
  } {
    try {
      const [_, taskIds] = taskUrl.split(clickup.task.urlIdentifier);
      const [idOrWorkspaceId, customId] = taskIds.split("/");
      const id =
        idOrWorkspaceId === String(this._workspaceId) ? null : idOrWorkspaceId;
      if (!id && !customId) {
        return {
          id: null,
          customId: null,
          error: new Error("💣 couldn't parse an ID from Task URL"),
        };
      }
      return { id, customId: customId || null, error: null };
    } catch (error) {
      return { id: null, customId: null, error };
    }
  }
}
