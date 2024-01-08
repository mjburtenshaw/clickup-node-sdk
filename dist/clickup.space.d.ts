import type { Api, Service } from "./types";
export declare class Space {
    constructor(workspace: Service.Workspace);
    private _apiToken;
    private _workspaceId;
    /**
     * @see https://clickup.com/api/clickupreference/operation/GetSpaces/
     */
    list(options?: Api.ListSpaceOptions): Promise<{
        spaces: Api.ListedSpace[] | null;
        error: Error | null;
    }>;
}
