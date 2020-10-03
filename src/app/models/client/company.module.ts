export class Company {
  id: number;
  companyName: string;
  stateName: string;
}

export class CompanySingle {
  id: number;
  companyName: string;
  address: string;
  location: string;
  phone: string;
  userPhoneNumber: string;
  userFullName: string;
  stateName: string;
}

export class CompanyCreate {
  id: number;
  companyName: string;
  address: string;
  phone: string;
  stateId: number;
  userId: number;
}
