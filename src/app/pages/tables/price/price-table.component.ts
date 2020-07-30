import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Title } from '@angular/platform-browser';
import { NbToastrService, NbGlobalPhysicalPosition } from '@nebular/theme';
import { PriceService } from '../../../services/price.service';
import { Setting } from '../../../setting';

@Component({
  selector: 'ngx-price-table',
  templateUrl: './price-table.component.html',
  styleUrls: ['./price-table.component.scss'],
})
export class PriceTableComponent implements OnInit {

  loading = false;
  error = null;

  settings = {
    actions: {
      add: false,
      edit: false,
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
      companyInfoCompanyName: {
        title: 'نام شرکت',
        type: 'string',
      },
      file: {
        title: 'فایل',
        type: 'html',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private title: Title,
    private dataService: PriceService, private toastrService: NbToastrService) {
  }

  ngOnInit(): void {
    this.title.setTitle('پنل مدیریت' + ' | ' + 'لیست ' + 'قیمت ها');

    this.loading = true;
    this.dataService.get().subscribe(
      results => {
        this.source.load(results.data.map(function (val) {
          if (val.file !== null)
            val.file = `<a href="${Setting.baseUrl}uploads/${val.file}">link</a>`;

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

  onDeleteConfirm(event): void {
    if (window.confirm('آیا مطمئن هستید که می خواهید این آیتم را پاک کنید؟')) {
      event.confirm.resolve();

      this.loading = true;
      this.dataService.delete(event.data.id).subscribe(
        results => {
          if (!results.isSuccess) {
            this.toastrService.danger('خطا در پاک کردن آیتم خواسته شده');
          }
        },
        error => {
          this.error = error.message;
          this.onError();
        },
      );
      this.loading = false;

      this.loading = true;
      this.dataService.get().subscribe(
        results => {
          this.source.load(results.data);
        },
        error => {
          this.error = error.message;
          this.onError();
        },
      );
      this.loading = false;

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
          field: 'companyInfoCompanyName',
          search: query,
        },
      ], false, true);
    }
  }
}
