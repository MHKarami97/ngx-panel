import { Category } from './../../../models/category/category.module';
import { CategoryService } from './../../../services/category.service';
import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Title } from '@angular/platform-browser';

import { SmartTableData } from '../../../@core/data/smart-table';
import { Subscription } from 'rxjs';
import { NbToastrService, NbGlobalPhysicalPosition } from '@nebular/theme';

@Component({
  selector: 'ngx-category-table',
  templateUrl: './category-table.component.html',
  styleUrls: ['./category-table.component.scss'],
})
export class CategoryTableComponent implements OnInit {

  isFetching = false;
  error = null;
  private errorSub: Subscription;

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
      name: {
        title: 'نام',
        type: 'string',
      },
      parentName: {
        title: 'دسته مادر',
        type: 'string',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: SmartTableData, private title: Title,
    private dataService: CategoryService, private toastrService: NbToastrService) {
  }

  ngOnInit(): void {
    this.title.setTitle('پنل مدیریت' + ' | ' + 'لیست ' + 'دسته بندی ها');

    this.errorSub = this.dataService.error.subscribe(errorMessage => {
      this.error = errorMessage;
    });

    this.isFetching = true;
    this.dataService.get().subscribe(
      results => {
        this.isFetching = false;
        this.source.load(results);
      },
      error => {
        this.isFetching = false;
        this.error = error.message;
      },
    );

    if (this.isFetching && !this.error) {
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
          field: 'name',
          search: query,
        },
        {
          field: 'parentName',
          search: query,
        },
      ], false, true);
    }
  }
}
