import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Api } from '../../../models/base/api.model';
import { User } from '../../../models/user/user.module';
import { UserService } from '../../../services/user.service';
import { CompanyService } from '../../../services/company.service';
import { NbToastrService, NbGlobalPhysicalPosition } from '@nebular/theme';
import { CompanyCreate, Company } from '../../../models/client/company.module';

@Component({
  selector: 'ngx-add-company',
  styleUrls: ['./add-company.component.scss'],
  templateUrl: './add-company.component.html',
})
export class AddCompanyComponent implements OnInit {

  loading = false;
  error = null;

  input: CompanyCreate = { id: 0, address: '',
   location: '', companyName: '', phone: '', userFullName: '', userPhoneNumber: '', state: 0 };
  users: User[] = [];
  result: Api<Company>;
  submitted: boolean = false;

  constructor(private title: Title,
    private dataService: CompanyService, private userDataService: UserService, private toastrService: NbToastrService) {
  }

  ngOnInit(): void {
    this.title.setTitle('پنل مدیریت' + ' | ' + 'افزودن ' + 'شرکت');

    this.loading = true;
    this.userDataService.get().subscribe(
      results => {
        this.users = results.data;
      },
      error => {
        this.error = error.message;
        this.onError();
      },
    );
    this.loading = false;
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
