export interface Return<T = any> {
  ok: boolean;
  message: string;
  data?: T;
}
