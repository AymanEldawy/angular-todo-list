export interface ITodo {
  id: number;
  title: string;
  description: string;
  date: Date | string;
  is_bookmark: boolean;
}
