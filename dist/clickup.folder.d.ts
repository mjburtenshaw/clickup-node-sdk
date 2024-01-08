import type { Api, Base, Service } from "./types";
export declare class Folder {
    constructor(workspace: Service.Workspace);
    private _apiToken;
    /**
     * @see https://clickup.com/api/clickupreference/operation/GetFolders/
     */
    list(spaceId: Base.Double, options?: Api.ListFolderOptions): Promise<{
        folders: Api.ListedFolder[] | null;
        error: Error | null;
    }>;
}
