import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Api } from '../../../models/base/api.model';
import { User } from '../../../models/user/user.module';
import { UserService } from '../../../services/user.service';
import { NbToastrService, NbGlobalPhysicalPosition } from '@nebular/theme';
import { ProducerCreate, Producer } from '../../../models/client/Producer.module';
import { ProducerService } from '../../../services/producer.service';
import { State } from '../../../models/state/state.module';
import { StateService } from '../../../services/state.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'ngx-add-producer',
  styleUrls: ['./add-producer.component.scss'],
  templateUrl: './add-producer.component.html',
})
export class AddProducerComponent implements OnInit {

  @ViewChild('form', { static: false }) myForm: NgForm;

  loading = false;
  error = null;

  input: ProducerCreate = {
    id: 0, address: '', companyName: '', phone: '', stateId: 0, userId: 0
  };
  users: User[] = [];
  states: State[] = [];
  result: Api<Producer>;
  submitted: boolean = false;

  constructor(private title: Title,
    private dataService: ProducerService, private userDataService: UserService,
    private stateDataService: StateService, private toastrService: NbToastrService) {
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
