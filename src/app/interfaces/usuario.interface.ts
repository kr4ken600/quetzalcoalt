export interface IUsuarioReq {
  username?: string,
  email: string,
  password: string
}

export interface IUsuarioRes {
  username: string,
  uid: string,
}