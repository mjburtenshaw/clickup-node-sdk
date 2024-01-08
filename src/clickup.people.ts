import type { Service } from "./types";

export class People {
  constructor(workspace: Service.Workspace) {
    this._people = workspace.people;
  }

  private _people: Service.Person[]

  list() {
    return this._people;
  }
}
