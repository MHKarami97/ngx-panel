export class Company extends Base {
  companyName: string;
  stateName: string;
}

export class CompanySingle extends Base {
  companyName: string;
  address: string;
  location: string;
  phone: string;
  userPhoneNumber: string;
  userFullName: string;
  stateName: string;
}

export class CompanyCreate extends Base {
  companyName: string;
  address: string;
  location: string;
  phone: string;
  userPhoneNumber: string;
  userFullName: string;
  state: number;
}
