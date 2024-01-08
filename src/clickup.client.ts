import { Folder } from "./clickup.folder";
import { List } from "./clickup.list";
import { People } from "./clickup.people";
import { Space } from "./clickup.space";
import { Task } from "./task/clickup.task";
import type { Service } from "./types";

export class Client {
  constructor(workspace: Service.Workspace) {
    this.Folder = new Folder(workspace);
    this.List = new List(workspace);
    this.People = new People(workspace);
    this.Space = new Space(workspace);
    this.Task = new Task(workspace);
  }

  public Folder: Folder;
  public List: List;
  public People: People;
  public Space: Space;
  public Task: Task;
}
