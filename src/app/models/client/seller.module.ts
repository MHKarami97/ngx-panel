export class Seller {
  id: number;
  companyName: string;
  stateName: string;
}

export class SellerSingle {
  id: number;
  companyName: string;
  address: string;
  location: string;
  phone: string;
  userPhoneNumber: string;
  userFullName: string;
  stateName: string;
  managerName: string;
}

export class SellerCreate {
  id: number;
  companyName: string;
  address: string;
  phone: string;
  stateId: number;
  userId: number;
  managerName: string;
}
