import { Piece } from './../piece/piece.module';

export class Producer {
  companyName: string;
  stateName: string;
  pieces: Piece[];
  edit: string;
  id: number;
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
  description: string;
  stateId: number;
  userId: number;
}

export class ProducerCreate {
  id: number;
  companyName: string;
  address: string;
  phone: string;
  stateId: number;
  userId: number;
  description: string;
}
