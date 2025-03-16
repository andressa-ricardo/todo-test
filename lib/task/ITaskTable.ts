export interface ITaskTable {
  id: string;
  user_id: string;
  status: "A fazer" | "Pausado" | "Em progresso" | "Finalizada";
  start_time?: Date;
  end_time?: Date;
  created_at: Date;
}
