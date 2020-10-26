import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {NbToastrService, NbGlobalPhysicalPosition} from '@nebular/theme';
import {Api} from '../../../models/base/api.model';
import {User, UserCreate} from '../../../models/user/user.module';
import {UserService} from '../../../services/user.service';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'ngx-edit-user',
  styleUrls: ['./edit-user.component.scss'],
  templateUrl: './edit-user.component.html',
})
export class EditUserComponent implements OnInit {

  @ViewChild('form', {static: false}) myForm: NgForm;
  @Input() id: string;

  loading = false;
  error = null;

  input: UserCreate = {id: 0, email: '', fullName: '', phoneNumber: ''};
  result: Api<User>;
  submitted: boolean = false;

  constructor(private title: Title,
              private dataService: UserService,
              private toastrService: NbToastrService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.title.setTitle('پنل مدیریت' + ' | ' + 'ویرایش ' + 'کاربر');

    this.id = this.route.snapshot.paramMap.get('id');

    this.loading = true;
    this.dataService.getById(+this.id).subscribe(
      results => {
        this.input.email = results.data.email;
        this.input.fullName = results.data.fullName;
        this.input.phoneNumber = results.data.phoneNumber;
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
    this.dataService.updateSecond(this.input).subscribe(
      results => {
        this.result = results;

        if (this.result.isSuccess) {
          this.onSuccess(this.result.message);
          this.router.navigate([`/pages/tables/user-table`]);
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
