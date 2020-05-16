import { Piece } from './../piece/piece.module';

export class Supporter extends Base {
  companyName: string;
  stateName: string;
  phone: string;
  pieces: Piece[];
}

export class SupporterCreate extends Base {
  companyName: string;
  phone: string;
  state: number;
  pieces: Piece[];
}
