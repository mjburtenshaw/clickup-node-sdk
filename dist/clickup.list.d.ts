import type { Api, Base, Service } from "./types";
export declare class List {
    constructor(workspace: Service.Workspace);
    private _apiToken;
    /**
     * @see https://clickup.com/api/clickupreference/operation/GetLists/
     */
    list(folderId: Base.Double, options?: Api.ListListsOptions): Promise<{
        lists: Api.ListedList[] | null;
        error: Error | null;
    }>;
    /**
     * @see https://clickup.com/api/clickupreference/operation/GetFolderlessLists/
     */
    listFolderless(spaceId: Base.Double, options?: Api.ListFolderlessListsOptions): Promise<{
        folderlessLists: Api.ListedFolderlessList[] | null;
        error: Error | null;
    }>;
    /**
     * @see https://clickup.com/api/clickupreference/operation/GetList/
     */
    get(listId: Base.Double): Promise<{
        list: Api.RetrievedList | null;
        error: Error | null;
    }>;
}
