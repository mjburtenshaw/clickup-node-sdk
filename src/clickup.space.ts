import type { Api, Base, Service } from "./types";

export class Space {
  constructor(workspace: Service.Workspace) {
    this._apiToken = workspace.token;
    this._workspaceId = workspace.id;
  }

  private _apiToken: Service.Token;
  private _workspaceId: Base.Double;

  /**
   * @see https://clickup.com/api/clickupreference/operation/GetSpaces/
   */
  async list(
    options?: Api.ListSpaceOptions
  ): Promise<{ spaces: Api.ListedSpace[] | null; error: Error | null }> {
    const appliedOptions: Api.ListSpaceOptions = {
      ...(options?.archived !== undefined && { archived: options.archived }),
    };
    const query = new URLSearchParams(
      JSON.stringify(appliedOptions)
    ).toString();
    try {
      const response = await fetch(
        `https://api.clickup.com/api/v2/team/${this._workspaceId}/space?${query}`,
        {
          headers: {
            Authorization: this._apiToken,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      const spaces: Api.ListedSpace[] = data.spaces;
      return { spaces, error: null };
    } catch (error) {
      return { spaces: null, error };
    }
  }
}
