export interface Fault {
  timestamp: number;
  status: number;
  error: string;
  exception: string;
  message: string;
  path: string;
}
