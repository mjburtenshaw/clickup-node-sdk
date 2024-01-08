"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Folder = void 0;
class Folder {
    constructor(workspace) {
        this._apiToken = workspace.token;
    }
    _apiToken;
    /**
     * @see https://clickup.com/api/clickupreference/operation/GetFolders/
     */
    async list(spaceId, options) {
        const appliedOptions = {
            ...(options?.archived !== undefined && { archived: options.archived }),
        };
        const query = new URLSearchParams(JSON.stringify(appliedOptions)).toString();
        try {
            const res = await get(`https://api.clickup.com/api/v2/space/${spaceId}/folder?${query}`, {
                headers: {
                    Authorization: this._apiToken,
                },
            });
            const folders = res.data.folders;
            return { folders, error: null };
        }
        catch (error) {
            return { folders: null, error };
        }
    }
}
exports.Folder = Folder;
