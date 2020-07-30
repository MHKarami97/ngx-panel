export class Price extends Base {
  file: string;
  companyInfoId: number;
  companyInfoCompanyName: string;
  createdDate: string;
  updatedDate: string;
}

export class PriceCreate extends Base {
  file: string;
  companyInfoId: number;
}
