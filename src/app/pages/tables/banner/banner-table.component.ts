import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Title } from '@angular/platform-browser';
import { BannerService } from '../../../services/banner.service';
import { NbToastrService, NbGlobalPhysicalPosition } from '@nebular/theme';
import { Setting } from '../../../setting';

@Component({
  selector: 'ngx-banner-table',
  templateUrl: './banner-table.component.html',
  styleUrls: ['./banner-table.component.scss'],
})
export class BannerTableComponent implements OnInit {

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
      image: {
        title: 'عکس',
        type: 'html',
      },
      type: {
        title: 'نوع',
        type: 'number',
      },
      userId: {
        title: 'کاربر',
        type: 'number',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private title: Title,
    private dataService: BannerService, private toastrService: NbToastrService) {
  }

  ngOnInit(): void {
    this.title.setTitle('پنل مدیریت' + ' | ' + 'لیست ' + 'بنرها');

    this.loadData();
  }

  loadData() {
    this.loading = true;

    this.dataService.get().subscribe(
      results => {
        this.source.load(results.data.map(function (val) {
          val.image = `<img src="${Setting.baseUrl}uploads/${val.image}" height="70" width="70" />`;
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
          this.source.load(results.data.map(function (val) {
            val.image = `<img src="${Setting.baseUrl}uploads/${val.image}" height="70" width="70" />`;
            return val;
          }));
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
          field: 'type',
          search: query,
        },
        {
          field: 'userId',
          search: query,
        },
      ], false, true);
    }
  }
}
