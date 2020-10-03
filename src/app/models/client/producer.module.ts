import { Piece } from './../piece/piece.module';

export class Producer {
  companyName: string;
  stateName: string;
  pieces: Piece[];
}

export class ProducerSingle {
  id: number;
  companyName: string;
  address: string;
  location: string;
  phone: string;
  userPhoneNumber: string;
  userFullName: string;
  stateName: string;
}

export class ProducerCreate {
  id: number;
  companyName: string;
  address: string;
  phone: string;
  stateId: number;
  userId: number;
}
