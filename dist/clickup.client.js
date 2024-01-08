"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const clickup_folder_1 = require("./clickup.folder");
const clickup_list_1 = require("./clickup.list");
const clickup_people_1 = require("./clickup.people");
const clickup_space_1 = require("./clickup.space");
const clickup_task_1 = require("./task/clickup.task");
class Client {
    constructor(workspace) {
        this.Folder = new clickup_folder_1.Folder(workspace);
        this.List = new clickup_list_1.List(workspace);
        this.People = new clickup_people_1.People(workspace);
        this.Space = new clickup_space_1.Space(workspace);
        this.Task = new clickup_task_1.Task(workspace);
    }
    Folder;
    List;
    People;
    Space;
    Task;
}
exports.Client = Client;
