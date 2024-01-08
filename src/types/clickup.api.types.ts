import * as Base from "./clickup.base.types";

export type WorkspaceId = Base.Double;

export type UserId = Base.Int32;

export type ListId = Base.Double;

export type TaskId = string; // resembles a CUID

export type CustomTaskId = string;

export type Priority = Base.Int32;

export type Priority1 = {
  priority: string;
  color: Base.HexColor;
};

export type Priority4 = {
  priority?: string;
  color?: Base.HexColor;
};

export type User = {
  id: UserId;
  username: string;
  color: Base.HexColor;
  profilePicture: Base.Url;
};

export type User2 = {
  id: UserId;
  username: string;
  initials: string;
  email: Base.Email;
  color: Base.HexColor;
  profilePicture: Base.Url;
};

export type Status = {
  status: string;
  color: Base.HexColor;
  orderindex: Base.Int32;
  type: string;
};

export type Status5 = {
  status: string;
  color: Base.HexColor;
  hide_label: boolean;
};

export type Status11 = {
  status?: string;
  color?: Base.HexColor;
  hide_label?: boolean;
};

export type Member = {
  user: User;
};

export type TypeConfig1 = {
  single_user?: boolean;
  include_groups?: boolean;
  include_guests?: boolean;
  include_team_members?: boolean;
};

export type Value1 = {
  id: Base.Int32;
  username: string;
  email: Base.Email;
  color: Base.HexColor;
  initials: string;
  profilePicture: Base.Url | null;
};

export type Value = Partial<Value1>;

export type Value2 = {
  value: string;
};

export type CustomFields = {
  enabled: boolean;
};

export type CustomFields6 = {
  id: string; // resembles a UUID.
  value: Base.Int32 | string;
};

export type CustomFields7 = {
  id: string; // resembles a UUID.
  name: string;
  type: string;
  type_config: TypeConfig1;
  date_created: Base.STimestampMs;
  hide_from_guests: boolean;
  value?: string;
  required: boolean;
};

export type CustomFields8 = {
  id: string; // resembles a UUID.
  name: string;
  type: string;
  type_config: TypeConfig1;
  date_created: Base.STimestampMs;
  hide_from_guests: boolean;
  value: Value | Value1 | Value2;
  required: boolean;
};

export type Creator = {
  id: Base.Int32;
  username: string;
  color: Base.HexColor;
  profilePicture: Base.Url;
};

export type List = {
  id: Base.SInt;
};

export type List4 = {
  id: Base.SInt;
  name: string;
  orderindex: Base.Int32;
  content: string;
  status: Status11 | string | null | any;
  priority: Priority4 | string | null | any;
  assignee: string | null;
  task_count: Base.SInt | null;
  due_date: Base.STimestampMs | null;
  start_date: Base.STimestampMs | null;
  folder: Folder3;
  space: Space2;
  archived: boolean;
  override_statuses: boolean;
  permission_level: string;
};

export type Folder = {
  id: Base.SInt;
};

export type Folder3 = {
  id: string;
  name: string;
  hidden: boolean;
  access: boolean;
};

export type Folder5 = {
  id: Base.SInt;
  name: string;
  orderindex: Base.Int32;
  override_statuses: boolean;
  hidden: boolean;
  space: Space2;
  task_count: Base.SInt;
  lists: string[];
};

export type DueDates = {
  enabled: boolean;
  start_date: boolean;
  remap_due_dates: boolean;
  remap_closed_due_date: boolean;
};

export type TimeTracking = {
  enabled: boolean;
};

export type Tags = {
  enabled: boolean;
};

export type Tags10 = {
  name: string;
};

export type TimeEstimates = {
  enabled: boolean;
};

export type Checklists = {
  enabled: boolean;
};

export type RemapDependencies = {
  enabled: boolean;
};

export type DependencyWarning = {
  enabled: boolean;
};

export type Portfolios = {
  enabled: boolean;
};

export type Features4 = {
  due_dates: DueDates;
  time_tracking: TimeTracking;
  tags: Tags;
  time_estimates: TimeEstimates;
  checklists: Checklists;
  custom_fields?: CustomFields;
  remap_dependencies?: RemapDependencies;
  dependency_warning?: DependencyWarning;
  portfolios?: Portfolios;
};

export type Space = {
  id: Base.SInt;
};

export type Space2 = {
  id: string;
  name: string;
  access: boolean;
};

export type Space13 = {
  id: Base.SInt;
  name: string;
  private: boolean;
  color?: Base.HexColor | null;
  avatar?: Base.Url;
  admin_can_manage?: boolean;
  archived?: boolean;
  members?: Member[];
  statuses: Status[];
  multiple_assignees: boolean;
  features: Features4;
};

export type Assignees = {
  add: number[];
  rem: number[];
};

export type Task6 = {
  id: string;
  name: string;
  status: Status;
  custom_type: string | null;
};

export type Data2 = {
  id: string;
  task: Task6;
  wid: Base.SInt;
  user: User2;
  billable: boolean;
  start: Base.STimestampMs;
  duration: Base.Int32;
  description: string;
  tags: string[];
  at: Base.TimestampMs;
};

export type Data3 = {
  id: string;
  task: Task6;
  wid: Base.SInt;
  user: User2;
  billable: boolean;
  start: Base.STimestampMs;
  end: Base.TimestampMs;
  duration: Base.Int32;
  description: string;
  tags: string[];
  source: string;
  at: Base.TimestampMs;
};

/**
 * Use [the ClickUp API explorer](https://clickup.com/api/clickupreference/operation/GetAuthorizedTeams/) and an API Token to get the value of an `id`.
 * @see https://clickup.com/api/clickupreference/operation/GetAuthorizedTeams/
 */
export type ListedWorkspace = {
  id: Base.SInt;
  name: string;
  color: Base.HexColor;
  avatar: Base.Url;
  members: Member[];
};

/**
 * @see https://clickup.com/api/clickupreference/operation/CreateTask/
 */
export type StagedTask = {
  name: string;
  description?: string;
  markdown_description?: string;
  assignees?: UserId[];
  tags?: string[];
  priority?: Priority | null;
  time_estimate?: Base.DurationMs | null;
  parent?: TaskId | null; // You can create a subtask by including an existing task ID. The parent task ID you include cannot be a subtask, and must be in the same List specified in the path parameter.
  status?: string;
  due_date?: Base.TimestampMs;
  start_date?: Base.TimestampMs;
  due_date_time?: boolean;
  start_date_time?: boolean;
  notify_all?: boolean; // if true, notifications will be sent to everyone including the creator of the comment.
  links_to?: TaskId | null; // Include a task ID to create a linked dependency with your new task.
  check_required_custom_fields?: boolean; // When creating a task via API any required Custom Fields are ignored by default. Set to true to enforce required custom fields.
  custom_fields?: CustomFields6[];
  custom_item_id?: number | Base.SNull; // To create a task that doesn't use a custom task type, either don't include this field in the request body, or send 'null'. To create this task as a Milestone, send a value of 1. To use a custom task type, send the custom task type ID as defined in your Workspace, such as 2.
};

/**
 * @see https://clickup.com/api/clickupreference/operation/CreateTask/
 */
export type NewTask = {
  id?: TaskId;
  custom_id?: CustomTaskId | null;
  custom_item_id?: number | null; // A null value means this item is a task. A value of 1 is a Milestone. Any other number is a custom task type.
  name?: string;
  text_content?: string;
  description?: string;
  status?: Status;
  orderindex?: Base.SFloat;
  date_created?: Base.STimestampMs;
  date_updated?: Base.STimestampMs;
  date_closed?: Base.STimestampMs | null;
  creator?: Creator;
  assignees?: Base.SInt[];
  checklists?: string[];
  tags?: string[];
  parent?: TaskId | null;
  priority?: Priority | null;
  due_date?: Base.STimestampMs | null;
  start_date?: Base.STimestampMs | null;
  time_estimate?: Base.STimestampMs | null;
  time_spent?: string | null;
  custom_fields?: CustomFields8[];
  list?: List;
  folder?: Folder;
  space?: Space;
  url?: Base.Url;

  // not documented
  markdown_description?: string;
  date_done?: unknown | null;
};

/**
 * @see https://clickup.com/api/clickupreference/operation/GetTask/
 */
export type RetrievedTask = {
  id?: TaskId;
  custom_id?: CustomTaskId | null;
  custom_item_id?: number | null; // A null value means this item is a task. A value of 1 is a Milestone. Any other number is a custom task type.
  name?: string;
  text_content?: string;
  description?: string;
  status?: Status;
  orderindex?: Base.SFloat;
  date_created?: Base.STimestampMs;
  date_updated?: Base.STimestampMs;
  date_closed?: Base.STimestampMs | null;
  creator?: Creator;
  assignees?: Base.SInt[];
  checklists?: string[];
  tags?: string[];
  parent?: TaskId | null;
  priority?: Priority | null;
  due_date?: Base.STimestampMs | null;
  start_date?: Base.STimestampMs | null;
  time_estimate?: Base.STimestampMs | null;
  time_spent?: string | null;
  custom_fields?: CustomFields8[];
  list?: List;
  folder?: Folder;
  space?: Space;
  url?: Base.Url;

  // not documented
  markdown_description?: string;
  date_done?: unknown | null;
};

/**
 * @see https://clickup.com/api/clickupreference/operation/GetLists/
 * Embedded in `response.lists` which is an array of this type.
 */
export type ListedList = List4;

/**
 * @see https://clickup.com/api/clickupreference/operation/GetFolderlessLists/
 * Embedded in `response.lists` which is an array of this type.
 */
export type ListedFolderlessList = List4;

/**
 * @see https://clickup.com/api/clickupreference/operation/GetFolders/
 * Embedded in `response.folders` which is an array of this type.
 */
export type ListedFolder = Folder5;

/**
 * @see https://clickup.com/api/clickupreference/operation/GetSpaces/
 * Embedded in `response.spaces` which is an array of this type.
 */
export type ListedSpace = Space13;

/**
 * @see https://clickup.com/api/clickupreference/operation/GetList/
 */
export type RetrievedList = {
  id: Base.SInt;
  name: string;
  orderindex: Base.Int32;
  content: string;
  status: Status5;
  priority: Priority1;
  assignee: string | null;
  due_date: Base.STimestampMs;
  due_date_time: boolean;
  start_date: Base.STimestampMs | null;
  start_date_time: string | null;
  folder: Folder3;
  space: Space2;
  inbound_address: string;
  archived: boolean;
  override_statuses: boolean;
  statuses: Status[];
  permission_level: string;
};

/**
 * @see https://clickup.com/api/clickupreference/operation/UpdateTask/
 */
export type TaskUpdate = {
  custom_item_id?: number | null; // To convert an item using a custom task type into a task, send 'null'. To update this task to be a Milestone, send a value of 1. To use a custom task type, send the custom task type ID as defined in your Workspace, such as 2.
  name?: string;
  description?: string; // Use " " To clear the task description.
  status?: string;
  priority?: Base.Int32;
  due_date?: Base.TimestampMs;
  due_date_time?: boolean;
  parent?: string; // You can move a subtask to another parent task by including "parent" with a valid task id. You cannot convert a subtask to a task by setting "parent" to null.
  time_estimate?: Base.DurationMs;
  start_date?: Base.TimestampMs;
  start_date_time?: boolean;
  assignees?: Assignees;
  archived?: boolean;
};

/**
 * @see https://clickup.com/api/clickupreference/operation/UpdateTask/
 */
export type UpdatedTask = {
  id?: TaskId;
  custom_id?: CustomTaskId | null;
  custom_item_id?: Base.Int32 | null;
  name?: string;
  text_content?: string;
  description?: string;
  status?: Status;
  archived?: boolean;
  orderindex?: Base.SInt;
  date_created?: Base.STimestampMs;
  date_updated?: Base.STimestampMs;
  date_closed?: Base.STimestampMs | null;
  creator?: Creator;
  assignees?: Base.SInt[];
  checklists?: string[];
  tags?: string[];
  parent?: TaskId;
  priority?: string | null;
  due_date?: Base.STimestampMs | null;
  start_date?: Base.STimestampMs | null;
  time_estimate?: Base.SDurationMs | null;
  time_spent?: Base.SDurationMs | null;
  custom_fields?: CustomFields7[];
  list?: List;
  folder?: Folder;
  space?: Space;
  url: Base.Url;

  // not documented
  markdown_description?: string;
};

/**
 * @see https://clickup.com/api/clickupreference/operation/StartatimeEntry/
 * For Workspaces on the Free Forever or Unlimited Plan, either the timer_id parameter or the "tid" field in the body of the request are required fields.
 */
export type TaskStartTimerRequest = {
  description?: string;
  tags?: Tags10; // Users on the Business Plan and above can include a time tracking label.
  tid?: string; // [t]ask or [t]imer id
  billable?: boolean;
};

/**
 * @see https://clickup.com/api/clickupreference/operation/StartatimeEntry/
 * Nested under `response.data`
 */
export type StartedTimer = Data2;

/**
 * @see https://clickup.com/api/clickupreference/operation/StopatimeEntry/
 * Nested under `response.data`
 */
export type StoppedTimer = Data3;

/**
 * @see https://clickup.com/api/clickupreference/operation/CreateTaskComment/
 */
export type StagedTaskComment = {
  comment_text: string;
  assignee: number;
  notify_all: boolean; // If notify_all is true, notifications will be sent to everyone including the creator of the comment.
};

/**
 * @see https://clickup.com/api/clickupreference/operation/CreateTaskComment/
 */
export type NewTaskComment = {
  id: Base.SInt;
  hist_id: Base.SInt;
  date: Base.TimestampMs;
};

/**
 * @see https://clickup.com/api/clickupreference/operation/CreateTask/
 */
export type TaskCreateOptions = {
  custom_task_ids?: boolean;
  team_id?: Base.Double;
};

/**
 * @see https://clickup.com/api/clickupreference/operation/StartatimeEntry/
 */
export type TaskStartTimerOptions = {
  custom_task_ids?: Base.SBool;
  team_id?: Base.SDouble;
};

/**
 * @see https://clickup.com/api/clickupreference/operation/UpdateTask/
 */
export type TaskUpdateOptions = {
  custom_task_ids?: boolean;
  team_id?: Base.Double;
};

/**
 * @see https://clickup.com/api/clickupreference/operation/CreateTaskComment/
 */
export type TaskCommentCreateOptions = {
  custom_task_ids?: boolean;
  team_id?: Base.Double;
};

/**
 * @see https://clickup.com/api/clickupreference/operation/GetTask/
 */
export type TaskReadOptions = {
  custom_task_ids?: Base.SBool;
  team_id?: Base.SDouble;
  include_subtasks?: Base.SBool;
  include_markdown_description?: Base.SBool;
};

/**
 * @see https://clickup.com/api/clickupreference/operation/GetLists/
 */
export type ListListsOptions = {
  archived: boolean;
};

/**
 * @see https://clickup.com/api/clickupreference/operation/GetFolderlessLists/
 */
export type ListFolderlessListsOptions = {
  archived: boolean;
};

/**
 * @see https://clickup.com/api/clickupreference/operation/GetFolders/
 */
export type ListFolderOptions = {
  archived: boolean;
};

/**
 * @see https://clickup.com/api/clickupreference/operation/GetSpaces/
 */
export type ListSpaceOptions = {
  archived: boolean;
};
