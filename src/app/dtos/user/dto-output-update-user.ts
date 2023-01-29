export interface DtoOutputUpdateUser {
  id:number;
  userRole:string;
  mailValidation:boolean;
  username:string;
  lastname:string;
  firstname:string;
  mailaddress:string;
  password:string;
  implantation:string;
  validatorkey: string;
  connectionDate: Date;
  registrationDate: Date;

  changePassword: boolean;
}
