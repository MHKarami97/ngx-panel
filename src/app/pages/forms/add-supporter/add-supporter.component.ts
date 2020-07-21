import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Api } from '../../../models/base/api.model';
import { User } from '../../../models/user/user.module';
import { UserService } from '../../../services/user.service';
import { NbToastrService, NbGlobalPhysicalPosition } from '@nebular/theme';
import { SupporterCreate, Supporter } from '../../../models/client/Supporter.module';
import { SupporterService } from '../../../services/supporter.service';

@Component({
  selector: 'ngx-add-supporter',
  styleUrls: ['./add-supporter.component.scss'],
  templateUrl: './add-supporter.component.html',
})
export class AddSupporterComponent implements OnInit {

  loading = false;
  error = null;

  input: SupporterCreate = {
    id: 0,
    companyName: '', phone: '', state: 0, pieces: null
  };
  users: User[] = [];
  result: Api<Supporter>;
  submitted: boolean = false;

  constructor(private title: Title,
    private dataService: SupporterService,
    private userDataService: UserService, private toastrService: NbToastrService) {
  }

  ngOnInit(): void {
    this.title.setTitle('پنل مدیریت' + ' | ' + 'افزودن ' + 'پشتیبان');

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
