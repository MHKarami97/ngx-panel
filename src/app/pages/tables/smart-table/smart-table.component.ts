import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Title } from '@angular/platform-browser';

import { SmartTableData } from '../../../@core/data/smart-table';

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './smart-table.component.html',
  styleUrls: ['./smart-table.component.scss'],
})
export class SmartTableComponent implements OnInit {

  settings = {
    actions: {
      add: false,
      edit: true,
      delete: true,
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
      firstName: {
        title: 'نام',
        type: 'string',
      },
      lastName: {
        title: 'نام خانوادگی',
        type: 'string',
      },
      username: {
        title: 'نام کاربری',
        type: 'string',
      },
      email: {
        title: 'ایمیل',
        type: 'string',
      },
      age: {
        title: 'سن',
        type: 'number',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: SmartTableData, private title: Title) {
    const data = this.service.getData();
    this.source.load(data);
  }
  ngOnInit(): void {
    this.title.setTitle('پنل مدیریت'  + ' | ' + 'لیست');
  }

  onDeleteConfirm(event): void {
    if (window.confirm('آیا مطمئن هستید که می خواهید این آیتم را پاک کنید؟')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onSearch(query: string = '') {
    if (query === '') {
      this.source.reset();
    } else {
      this.source.setFilter([
        {
          field: 'firstName',
          search: query,
        },
        {
          field: 'lastName',
          search: query,
        },
        {
          field: 'username',
          search: query,
        },
        {
          field: 'email',
          search: query,
        },
      ], false, true);
    }
  }
}
