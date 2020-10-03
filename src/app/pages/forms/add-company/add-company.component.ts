import {Component, OnInit, ViewChild} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {Api} from '../../../models/base/api.model';
import {User} from '../../../models/user/user.module';
import {UserService} from '../../../services/user.service';
import {CompanyService} from '../../../services/company.service';
import {NbToastrService, NbGlobalPhysicalPosition} from '@nebular/theme';
import {CompanyCreate, Company} from '../../../models/client/company.module';
import {State} from '../../../models/state/state.module';
import {StateService} from '../../../services/state.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'ngx-add-company',
  styleUrls: ['./add-company.component.scss'],
  templateUrl: './add-company.component.html',
})
export class AddCompanyComponent implements OnInit {

  @ViewChild('form', {static: false}) myForm: NgForm;

  loading = false;
  error = null;

  input: CompanyCreate = {
    id: 0, address: '', companyName: '', phone: '', stateId: 0, userId: 0,
  };
  users: User[] = [];
  states: State[] = [];
  result: Api<Company>;
  submitted: boolean = false;

  constructor(private title: Title,
              private dataService: CompanyService, private userDataService: UserService,
              private stateDataService: StateService, private toastrService: NbToastrService) {
  }

  ngOnInit(): void {
    this.title.setTitle('پنل مدیریت' + ' | ' + 'افزودن ' + 'شرکت');

    this.loading = true;
    this.userDataService.get().subscribe(
      results => {
        this.users = results.data;
        this.users.forEach(a => a.fullName = a.fullName + ' (' + a.phoneNumber + ') ');
      },
      error => {
        this.error = error.message;
        this.onError();
      },
    );

    this.stateDataService.get().subscribe(
      results => {
        this.states = results.data;
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
