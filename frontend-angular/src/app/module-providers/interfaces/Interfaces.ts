export interface RegisterI {
  id?: number,
  roleId: number,
  typeId: number,
  numberIdentification: string,
  names: string,
  surnames: string,
  email: string,
  password: string,
  cellPhone: string,
  markImage?: string,
  filePdf?: string,
  province: string
}

export interface RememberPassowrdI {
  email: string,
}

export interface LoginI {
  email:string,
  password: string
}

export interface RoleI {
  id?: string,
  description: string
}

export interface verifyAccountI {
  email: string,
  codeForVerfication: string
}