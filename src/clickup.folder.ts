import type { Api, Base, Service } from "./types";

export class Folder {
  constructor(workspace: Service.Workspace) {
    this._apiToken = workspace.token;
  }

  private _apiToken: Service.Token;

  /**
   * @see https://clickup.com/api/clickupreference/operation/GetFolders/
   */
  async list(
    spaceId: Base.Double,
    options?: Api.ListFolderOptions
  ): Promise<{ folders: Api.ListedFolder[] | null; error: Error | null }> {
    const appliedOptions: Api.ListFolderOptions = {
      ...(options?.archived !== undefined && { archived: options.archived }),
    };
    const query = new URLSearchParams(
      JSON.stringify(appliedOptions)
    ).toString();
    try {
      const response = await fetch(
        `https://api.clickup.com/api/v2/space/${spaceId}/folder?${query}`,
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
      const folders: Api.ListedFolder[] = data.folders;
      return { folders, error: null };
    } catch (error) {
      return { folders: null, error };
    }
  }
}
