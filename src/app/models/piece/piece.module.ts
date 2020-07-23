export class Piece extends Base {
  name: string;
  pieceCategoryName: string;
}

export class PieceCreate extends Base {
  name: string;
  pieceCategoryId: number;
}
