import { Piece } from './../piece/piece.module';

export class Producer extends Base {
  companyName: string;
  stateName: string;
  pieces: Piece[];
}

export class ProducerSingle extends Base {
  companyName: string;
  address: string;
  location: string;
  phone: string;
  userPhoneNumber: string;
  userFullName: string;
  stateName: string;
}

export class ProducerCreate extends Base {
  companyName: string;
  address: string;
  location: string;
  phone: string;
  userPhoneNumber: string;
  userFullName: string;
  state: number;
  pieces: Piece[];
}
