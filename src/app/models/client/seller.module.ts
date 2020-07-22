export class Seller extends Base {
  companyName: string;
  stateName: string;
}

export class SellerSingle extends Base {
  companyName: string;
  address: string;
  location: string;
  phone: string;
  userPhoneNumber: string;
  userFullName: string;
  stateName: string;
  managerName: string;
}

export class SellerCreate extends Base {
  companyName: string;
  address: string;
  phone: string;
  stateId: number;
  userId: number;
  managerName: string;
}
