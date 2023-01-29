export interface DtoInputComment {
  idComment : number;
  idPost : number;
  idUser : number;
  username : string;
  message : string;
  dateComment: Date;
  dateLastEdit: Date;
  canChange: boolean;
  isSelected: boolean;
  userRole:string;
}
