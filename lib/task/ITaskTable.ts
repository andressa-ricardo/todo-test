export interface ITaskTable {
  id: number;
  user_id: string;
  title: string;
  status: "A fazer" | "Pausado" | "Em progresso" | "Finalizado";
  start_time?: Date;
  end_time?: Date;
  created_at: Date;
}

export interface ITaskTableUpdate extends Omit<ITaskTable, "created_at"> {}

export interface ITaskTableValidate
  extends Omit<
    ITaskTable,
    "title" | "status" | "start_time" | "end_time" | "created_at"
  > {}

export interface ITaskTableQuery
  extends Omit<
    ITaskTable,
    "title" | "status" | "start_time" | "end_time" | "created_at" | "id"
  > {}

export interface ITaskTableInsert
  extends Omit<
    ITaskTable,
    "status" | "start_time" | "end_time" | "created_at" | "id"
  > {}
