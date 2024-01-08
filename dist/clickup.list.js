"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.List = void 0;
class List {
    constructor(workspace) {
        this._apiToken = workspace.token;
    }
    _apiToken;
    /**
     * @see https://clickup.com/api/clickupreference/operation/GetLists/
     */
    async list(folderId, options) {
        try {
            const appliedOptions = {
                ...(options?.archived !== undefined && { archived: options.archived }),
            };
            const query = new URLSearchParams(JSON.stringify(appliedOptions)).toString();
            const res = await get(`https://api.clickup.com/api/v2/folder/${folderId}/list?${query}`, {
                headers: {
                    Authorization: this._apiToken,
                },
            });
            const lists = res.data.lists;
            return { lists, error: null };
        }
        catch (error) {
            return { lists: null, error };
        }
    }
    /**
     * @see https://clickup.com/api/clickupreference/operation/GetFolderlessLists/
     */
    async listFolderless(spaceId, options) {
        try {
            const appliedOptions = {
                ...(options?.archived !== undefined && { archived: options.archived }),
            };
            const query = new URLSearchParams(JSON.stringify(appliedOptions)).toString();
            const res = await get(`https://api.clickup.com/api/v2/space/${spaceId}/list?${query}`, {
                headers: {
                    Authorization: this._apiToken,
                },
            });
            const folderlessLists = await res.data.lists;
            return { folderlessLists, error: null };
        }
        catch (error) {
            return { folderlessLists: null, error };
        }
    }
    /**
     * @see https://clickup.com/api/clickupreference/operation/GetList/
     */
    async get(listId) {
        try {
            const res = await get(`https://api.clickup.com/api/v2/list/${listId}`, {
                headers: {
                    Authorization: this._apiToken,
                },
            });
            const list = res.data;
            return { list, error: null };
        }
        catch (error) {
            return { list: null, error };
        }
    }
}
exports.List = List;
