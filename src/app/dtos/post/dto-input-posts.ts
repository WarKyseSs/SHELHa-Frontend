export interface DtoInputPost {
  idPost : number;
  username: string;
  idAuthor : number;
  idCat : number;
  message : string;
  sujet : string;
  datePost: Date;
  dateLastEdit: Date;
  urlPost: string;
  canChange: boolean;
  isSelected: boolean;
  userRole:string;
}
