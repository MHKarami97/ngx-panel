import {User} from './../../../models/user/user.module';
import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {NbToastrService, NbGlobalPhysicalPosition} from '@nebular/theme';
import {Api} from '../../../models/base/api.model';
import {UserService} from '../../../services/user.service';
import {Message, MessageCreate} from '../../../models/more/message.module';
import {MessageService} from '../../../services/message.service';

@Component({
  selector: 'ngx-add-message',
  styleUrls: ['./add-message.component.scss'],
  templateUrl: './add-message.component.html',
})
export class AddMessageComponent implements OnInit {

  loading = false;
  error = null;

  input: MessageCreate = {id: 0, userId: 0, text: null};
  users: User[] = [];
  result: Api<Message>;
  submitted: boolean = false;

  constructor(private title: Title,
              private dataService: MessageService
    , private userService: UserService, private toastrService: NbToastrService) {
  }

  ngOnInit(): void {
    this.title.setTitle('پنل مدیریت' + ' | ' + 'افزودن ' + 'پیام به کاربر');

    this.loading = true;
    this.userService.get().subscribe(
      results => {
        this.users = results.data;
        this.users.forEach(a => a.fullName = a.fullName + ' (' + a.phoneNumber + ') ');
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

    if (this.input.userId === 0 || this.input.userId === null) {
      this.dataService.sendToAll(this.input).subscribe(
        results => {
          this.result = results;

          if (this.result.isSuccess) {
            this.onSuccess(this.result.message);
          } else {
            this.onOther(this.result.message);
          }

          this.loading = false;
        },
        error => {
          this.error = error.message;
          this.loading = false;
          this.onError();
        },
      );
    } else {
      this.dataService.create(this.input).subscribe(
        results => {
          this.result = results;

          if (this.result.isSuccess) {
            this.onSuccess(this.result.message);
          } else {
            this.onOther(this.result.message);
          }

          this.loading = false;
        },
        error => {
          this.error = error.message;
          this.loading = false;
          this.onError();
        },
      );
    }
  }
}
