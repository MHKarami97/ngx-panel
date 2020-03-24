import { CategoryService } from './../../../services/category.service';
import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Title } from '@angular/platform-browser';
import { NbToastrService, NbGlobalPhysicalPosition } from '@nebular/theme';

@Component({
  selector: 'ngx-category-table',
  templateUrl: './category-table.component.html',
  styleUrls: ['./category-table.component.scss'],
})
export class CategoryTableComponent implements OnInit {

  isFetching = false;
  error = null;

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
      parentCategoryName: {
        title: 'دسته مادر',
        type: 'string',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private title: Title,
    private dataService: CategoryService, private toastrService: NbToastrService) {
  }

  ngOnInit(): void {
    this.title.setTitle('پنل مدیریت' + ' | ' + 'لیست ' + 'دسته بندی ها');

    this.isFetching = true;
    this.dataService.get().subscribe(
      results => {
        this.isFetching = false;
        this.source.load(results.data.map(function (val, i) {
          if (val.parentCategoryName === null)
            val.parentCategoryName = 'ندارد';

          return val;
        }));
      },
      error => {
        this.isFetching = false;
        this.error = error.message;
        this.onError();
      },
    );
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
          field: 'parentCategoryName',
          search: query,
        },
      ], false, true);
    }
  }
}
