export interface IResponseUsuario {
  ok: boolean;
  uid?: string;
  username?: string;
  role: string;
  token?: string;
  msg?: string;
  errors?: Errors;
  error?: Error;
}

export interface Errors {
  campo: Campo;
}

export interface Error {
  ok: boolean;
  msg?: string;
}

export interface Campo {
  type: string;
  value: string;
  msg: string;
  path: string;
  location: string;
}
