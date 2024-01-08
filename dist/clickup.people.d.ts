import type { Service } from "./types";
export declare class People {
    constructor(workspace: Service.Workspace);
    private _people;
    list(): Service.Person[];
}
