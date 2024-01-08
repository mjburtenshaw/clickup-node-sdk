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
  people?: Person[]; // Programmatic access to people is only available on paid plans.
  token: Token;
};

export type Resource = {
  initService: (workspace: Workspace) => Client;
  task: {
    urlIdentifier: "/t/"; // sample Task URL: https://app.clickup.com/t/someId/someCustomId
  };
};
