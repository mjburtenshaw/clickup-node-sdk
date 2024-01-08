import { Client } from "./clickup.client";
import type { Service } from "./types";

export const clickup: Service.Resource = {
  initService: (workspace: Service.Workspace) => new Client(workspace),
  task: {
    urlIdentifier: "/t/",
  }
};
