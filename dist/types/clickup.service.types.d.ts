import { Client } from "../clickup.client";
import * as Base from "./clickup.base.types";
export type Token = `pk_${string}`;
export type Person = {
    email: Base.Email;
    id: number;
    name: string;
    type: "member" | "guest";
};
export type Workspace = {
    id: Base.Double;
    people?: Person[];
    token: Token;
};
export type Resource = {
    initService: (workspace: Workspace) => Client;
    task: {
        urlIdentifier: "/t/";
    };
};
