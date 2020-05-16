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
}

export class SellerCreate extends Base {
  companyName: string;
  address: string;
  location: string;
  phone: string;
  userPhoneNumber: string;
  userFullName: string;
  state: number;
}
