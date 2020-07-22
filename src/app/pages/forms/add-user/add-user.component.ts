import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NbToastrService, NbGlobalPhysicalPosition } from '@nebular/theme';
import { Api } from '../../../models/base/api.model';
import { User, UserCreate } from '../../../models/user/user.module';
import { UserService } from '../../../services/user.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'ngx-add-user',
  styleUrls: ['./add-user.component.scss'],
  templateUrl: './add-user.component.html',
})
export class AddUserComponent implements OnInit {

  @ViewChild('form', { static: false }) myForm: NgForm;
  
  loading = false;
  error = null;

  input: UserCreate = { id: 0, email: '', fullName: '', phoneNumber: '' };
  result: Api<User>;
  submitted: boolean = false;

  constructor(private title: Title,
    private dataService: UserService, private toastrService: NbToastrService) {
  }

  ngOnInit(): void {
    this.title.setTitle('پنل مدیریت' + ' | ' + 'افزودن ' + 'کاربر');
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
