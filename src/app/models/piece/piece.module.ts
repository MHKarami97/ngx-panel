export class Piece {
  id: number;
  name: string;
  pieceCategoryName: string;
}

export class PieceCreate {
  id: number;
  name: string;
  pieceCategoryId: number;
}

export class ClientPieceCreate {
  id: number;
  pieceId: number;
  companyInfoId: number;
  producerInfoId: number;
}

export class ClientPiece {
  id: number;
  pieceName: string;
  companyInfoId: number;
  producerInfoId: number;
}
