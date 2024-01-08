"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Space = void 0;
class Space {
    constructor(workspace) {
        this._apiToken = workspace.token;
        this._workspaceId = workspace.id;
    }
    _apiToken;
    _workspaceId;
    /**
     * @see https://clickup.com/api/clickupreference/operation/GetSpaces/
     */
    async list(options) {
        const appliedOptions = {
            ...(options?.archived !== undefined && { archived: options.archived }),
        };
        const query = new URLSearchParams(JSON.stringify(appliedOptions)).toString();
        try {
            const res = await get(`https://api.clickup.com/api/v2/team/${this._workspaceId}/space?${query}`, {
                headers: {
                    Authorization: this._apiToken,
                },
            });
            const spaces = res.data.spaces;
            return { spaces, error: null };
        }
        catch (error) {
            return { spaces: null, error };
        }
    }
}
exports.Space = Space;
