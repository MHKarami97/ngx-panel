export class Price {
  id: number;
  file: string;
  companyInfoId: number;
  companyInfoCompanyName: string;
  createdDate: string;
  updatedDate: string;
}

export class PriceCreate {
  id: number;
  companyInfoId: number;
}
