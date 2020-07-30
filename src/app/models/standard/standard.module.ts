export class Standard extends Base {
  file: string;
  createdDate: string;
  updatedDate: string;
  pieceName: string;
  pieceId: number;
}

export class StandardCreate extends Base {
  pieceId: number;
}
