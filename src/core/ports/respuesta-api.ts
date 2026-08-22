export interface RespuestaApi<T = unknown> {
  ok: boolean;
  data?: T;
  error?: string;
}
