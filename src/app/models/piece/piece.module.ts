export class Piece extends Base {
  name: string;
  pieceCategoryName: string;
}

export class PieceCreate extends Base {
  name: string;
  pieceCategoryId: number;
}

export class ClientPieceCreate extends Base {
  pieceId: number;
  companyInfoId: number;
  producerInfoId: number;
}

export class ClientPiece extends Base {
  pieceName: string;
  companyInfoId: number;
  producerInfoId: number;
}
