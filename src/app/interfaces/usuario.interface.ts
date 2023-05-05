export interface IUsuarioReq {
  username?: string;
  email: string;
  password: string;
  role?: string;
}

export interface IUsuarioRes {
  username: string;
  uid: string;
  role:string;
}
