import {Component, OnInit, ViewChild} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {Api} from '../../../models/base/api.model';
import {CompanyService} from '../../../services/company.service';
import {NbToastrService, NbGlobalPhysicalPosition} from '@nebular/theme';
import {Company} from '../../../models/client/company.module';
import {NgForm} from '@angular/forms';
import {PinCreate, Pin} from '../../../models/more/pin.module';
import {PinService} from '../../../services/pin.service';

@Component({
  selector: 'ngx-add-pin',
  styleUrls: ['./add-pin.component.scss'],
  templateUrl: './add-pin.component.html',
})
export class AddPinComponent implements OnInit {

  @ViewChild('form', {static: false}) myForm: NgForm;

  loading = false;
  error = null;

  input: PinCreate = {
    id: 0, companyInfoId: null,
  };
  companies: Company[] = [];
  result: Api<Pin>;
  submitted: boolean = false;

  constructor(private title: Title,
              private dataService: PinService,
              private companyDataService: CompanyService, private toastrService: NbToastrService) {
  }

  ngOnInit(): void {
    this.title.setTitle('پنل مدیریت' + ' | ' + 'افزودن ' + 'پین شده');

    this.loading = true;
    this.companyDataService.get().subscribe(
      results => {
        this.companies = results.data;
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
    this.dataService.create(this.input).subscribe(
      results => {
        this.result = results;

        if (this.result.isSuccess) {
          this.onSuccess(this.result.message);
          this.myForm.resetForm();
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
