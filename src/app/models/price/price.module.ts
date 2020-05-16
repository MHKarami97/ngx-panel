export class Price extends Base {
  file: string;
  companyInfoCompanyName: string;
}

export class PriceCreate extends Base {
  file: string;
  companyInfoId: number;
}
