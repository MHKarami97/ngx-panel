import {Component, OnInit} from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {Title} from '@angular/platform-browser';
import {NbToastrService, NbGlobalPhysicalPosition} from '@nebular/theme';
import {MessageService} from '../../../services/message.service';

@Component({
  selector: 'ngx-message-table',
  templateUrl: './message-table.component.html',
  styleUrls: ['./message-table.component.scss'],
})
export class MessageTableComponent implements OnInit {

  loading = false;
  error = null;

  settings = {
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
    add: {
      addButtonContent: '<i class="nb-search"></i>',
      createButtonContent: '<i class="nb-search"></i>',
      cancelButtonContent: '<i class="nb-search"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      id: {
        title: 'ID',
        type: 'number',
        editable: false,
      },
      userFullName: {
        title: 'نام کاربر',
        type: 'string',
      },
      text: {
        title: 'متن',
        type: 'string',
      },
      time: {
        title: 'زمان',
        type: 'string',
      },
      isReadText: {
        title: 'وضعیت',
        type: 'string',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private title: Title,
              private dataService: MessageService, private toastrService: NbToastrService) {
  }

  ngOnInit(): void {
    this.title.setTitle('پنل مدیریت' + ' | ' + 'لیست ' + 'پیام ها');

    this.loading = true;
    this.dataService.getAll().subscribe(
      results => {
        this.source.load(results.data.map(function (val) {
          val.isReadText = val.isRead ? 'خوانده شده' : 'خوانده نشده';
          return val;
        }));
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
      duration: 3000,
      hasIcon: true,
      position: NbGlobalPhysicalPosition.BOTTOM_RIGHT,
      preventDuplicates: true,
    };

    this.toastrService.danger(
      this.error,
      'خطا',
      config);
  }

  onSearch(query: string = '') {
    if (query === '') {
      this.source.reset();
    } else {
      this.source.setFilter([
        {
          field: 'text',
          search: query,
        },
        {
          field: 'userFullName',
          search: query,
        },
      ], false, true);
    }
  }
}
