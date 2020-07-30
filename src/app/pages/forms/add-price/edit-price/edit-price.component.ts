import { Component, OnInit, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NbToastrService, NbGlobalPhysicalPosition } from '@nebular/theme';
import { Api } from '../../../../models/base/api.model';
import { Price, PriceCreate } from '../../../../models/price/Price.module';
import { PriceService } from '../../../../services/price.service';
import { Company } from '../../../../models/client/company.module';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-edit-price',
  styleUrls: ['./edit-price.component.scss'],
  templateUrl: './edit-price.component.html',
})
export class EditPriceComponent implements OnInit {

  loading = false;
  error = null;
  @Input() id: string;

  public uploadedFiles: Array<File> = [];

  input: PriceCreate = { id: 0, companyInfoId: 0 };
  result: Api<Price>;
  submitted: boolean = false;
  companies: Company[] = [];
  file: string;

  constructor(private title: Title,
    public route: ActivatedRoute,
    private dataService: PriceService,
    private toastrService: NbToastrService) {
  }

  ngOnInit(): void {
    this.title.setTitle('پنل مدیریت' + ' | ' + 'ویرایش ' + 'قیمت');

    this.id = this.route.snapshot.paramMap.get('id');

    this.loading = true;
    this.dataService.getById(+this.id).subscribe(
      results => {
        this.input.companyInfoId = results.data.companyInfoId;
        this.input.id = results.data.id;

        this.loading = false;
      },
      error => {
        this.error = error.message;
        this.onError();
      },
    );
  }

  onError() {
    const config = {
      destroyByClick: true,
      duration: 4000,
      hasIcon: true,
      position: NbGlobalPhysicalPosition.BOTTOM_RIGHT,
      preventDuplicates: true,
    };

    this.toastrService.danger(
      this.error,
      'خطا',
      config);
  }

  onSuccess(msg: string) {
    const config = {
      destroyByClick: true,
      duration: 4000,
      hasIcon: true,
      position: NbGlobalPhysicalPosition.BOTTOM_RIGHT,
      preventDuplicates: true,
    };

    this.toastrService.success(
      msg,
      'هورا!!',
      config);
  }

  onOther(msg: string) {
    const config = {
      destroyByClick: true,
      duration: 4000,
      hasIcon: true,
      position: NbGlobalPhysicalPosition.BOTTOM_RIGHT,
      preventDuplicates: true,
    };

    this.toastrService.warning(
      msg,
      'چی شده؟!؟',
      config);
  }

  add(): void {
    this.submitted = true;
    this.loading = true;

    const formData: FormData = new FormData();

    for (const key in this.input) {
      if (this.input.hasOwnProperty(key)) {
        formData.append(key, this.input[key]);
      }
    }

    if (this.uploadedFiles != null && this.uploadedFiles.length > 0) {
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < this.uploadedFiles.length; i++) {
        formData.append(this.uploadedFiles[i].name, this.uploadedFiles[i]);
      }
    }

    this.dataService.update(+this.id, formData).subscribe(
      results => {
        this.result = results;

        if (this.result.isSuccess) {
          this.onSuccess(this.result.message);
        } else {
          this.onOther(this.result.message);
        }
      },
      error => {
        this.error = error.message;
        this.onError();
      },
    );
    this.loading = false;
  }
}
