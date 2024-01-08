"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clickup = void 0;
const clickup_client_1 = require("./clickup.client");
exports.clickup = {
    initService: (workspace) => new clickup_client_1.Client(workspace),
    task: {
        urlIdentifier: "/t/",
    }
};
