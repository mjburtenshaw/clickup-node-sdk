import type { Api, Base, Service } from "./types";

export class List {
  constructor(workspace: Service.Workspace) {
    this._apiToken = workspace.token;
  }

  private _apiToken: Service.Token;

  /**
   * @see https://clickup.com/api/clickupreference/operation/GetLists/
   */
  async list(
    folderId: Base.Double,
    options?: Api.ListListsOptions
  ): Promise<{ lists: Api.ListedList[] | null; error: Error | null }> {
    try {
      const appliedOptions: Api.ListListsOptions = {
        ...(options?.archived !== undefined && { archived: options.archived }),
      };
      const query = new URLSearchParams(
        JSON.stringify(appliedOptions)
      ).toString();
      const response = await fetch(
        `https://api.clickup.com/api/v2/folder/${folderId}/list?${query}`,
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
      const lists: Api.ListedList[] = data.lists;
      return { lists, error: null };
    } catch (error) {
      return { lists: null, error };
    }
  }

  /**
   * @see https://clickup.com/api/clickupreference/operation/GetFolderlessLists/
   */
  async listFolderless(
    spaceId: Base.Double,
    options?: Api.ListFolderlessListsOptions
  ): Promise<{
    folderlessLists: Api.ListedFolderlessList[] | null;
    error: Error | null;
  }> {
    try {
      const appliedOptions: Api.ListFolderlessListsOptions = {
        ...(options?.archived !== undefined && { archived: options.archived }),
      };
      const query = new URLSearchParams(
        JSON.stringify(appliedOptions)
      ).toString();
      const response = await fetch(
        `https://api.clickup.com/api/v2/space/${spaceId}/list?${query}`,
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
      const folderlessLists = data.lists;
      return { folderlessLists, error: null };
    } catch (error) {
      return { folderlessLists: null, error };
    }
  }

  /**
   * @see https://clickup.com/api/clickupreference/operation/GetList/
   */
  async get(
    listId: Base.Double
  ): Promise<{ list: Api.RetrievedList | null; error: Error | null }> {
    try {
      const response = await fetch(
        `https://api.clickup.com/api/v2/list/${listId}`,
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
      const list: Api.RetrievedList = data;
      return { list, error: null };
    } catch (error) {
      return { list: null, error };
    }
  }
}
