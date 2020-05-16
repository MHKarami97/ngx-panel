export class Standard extends Base {
  file: string;
  createdDate: string;
  updatedDate: string;
  pieceName: string;
}

export class StandardCreate extends Base {
  file: string;
  pieceId: number;
}
