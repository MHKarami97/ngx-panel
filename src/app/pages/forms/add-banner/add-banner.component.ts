import { User } from './../../../models/user/user.module';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NbToastrService, NbGlobalPhysicalPosition } from '@nebular/theme';
import { Api } from '../../../models/base/api.model';
import { Banner, BannerCreate } from '../../../models/more/banner.module';
import { BannerService } from '../../../services/banner.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'ngx-add-banner',
  styleUrls: ['./add-banner.component.scss'],
  templateUrl: './add-banner.component.html',
})
export class AddBannerComponent implements OnInit {

  loading = false;
  error = null;

  public uploadedFiles: Array<File> = [];

  input: BannerCreate = { id: 0, image: '', type: 0, userId: 0 };
  users: User[] = [];
  result: Api<Banner>;
  submitted: boolean = false;

  constructor(private title: Title,
    private dataService: BannerService, private userService: UserService, private toastrService: NbToastrService) {
  }

  ngOnInit(): void {
    this.title.setTitle('پنل مدیریت' + ' | ' + 'افزودن ' + 'بنر');

    this.loading = true;
    this.userService.get().subscribe(
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
