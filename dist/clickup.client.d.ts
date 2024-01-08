import { Folder } from "./clickup.folder";
import { List } from "./clickup.list";
import { People } from "./clickup.people";
import { Space } from "./clickup.space";
import { Task } from "./task/clickup.task";
import type { Service } from "./types";
export declare class Client {
    constructor(workspace: Service.Workspace);
    Folder: Folder;
    List: List;
    People: People;
    Space: Space;
    Task: Task;
}
