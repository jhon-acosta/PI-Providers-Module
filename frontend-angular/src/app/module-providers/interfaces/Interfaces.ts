export interface RegisterI {
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