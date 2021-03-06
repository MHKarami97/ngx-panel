import {Component, OnInit} from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {Title} from '@angular/platform-browser';
import {NbToastrService, NbGlobalPhysicalPosition} from '@nebular/theme';
import {UserService} from '../../../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'ngx-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss'],
})
export class UserTableComponent implements OnInit {

  loading = false;
  error = null;

  settings = {
    actions: {
      add: false,
      edit: false,
      delete: true,
      custom: [{name: 'active', title: '<i class="nb-checkmark"></i> '}],
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
      fullName: {
        title: 'نام',
        type: 'string',
      },
      phoneNumber: {
        title: 'موبایل',
        type: 'string',
      },
      isActiveTxt: {
        title: 'وضعیت',
        type: 'string',
      },
      edit: {
        title: 'ویرایش',
        type: 'html',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private title: Title,
              private dataService: UserService, private toastrService: NbToastrService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.title.setTitle('پنل مدیریت' + ' | ' + 'لیست ' + 'کاربر ها');

    this.loading = true;
    this.dataService.get().subscribe(
      results => {
        this.source.load(results.data.map(function (val) {
          val.edit = `<a href="/pages/edit/edit-user/${val.id}">link</a>`;
          val.isActiveTxt = val.isActive ? 'فعال' : 'غیر فعال';
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

  onCustomAction(event: any) {
    if (event.data.isActiveTxt === 'فعال') {
      this.toastrService.warning('این کاربر فعال است', 'خطا');
    } else {
      this.loading = true;
      this.dataService.activeUserAdmin(event.data.id).subscribe(
        results => {
          if (!results.isSuccess) {
            this.toastrService.danger('خطا در انجام عمل');
          }
        },
        error => {
          this.error = error.message;
          this.onError();
        },
      );
    }
  }

  onDeleteConfirm(event): void {
    if (window.confirm('آیا مطمئن هستید که می خواهید این آیتم را پاک کنید؟')) {
      event.confirm.resolve();

      this.loading = true;
      this.dataService.delete(event.data.id).subscribe(
        results => {
          if (!results.isSuccess) {
            this.toastrService.danger('این عملیات نمی تواند انجام شود');
          }

          this.toastrService.success('عملیات با موفقیت انجام شد');
        },
        error => {
          this.toastrService.danger('این عملیات نمی تواند انجام شود');
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

  onEditConfirm(event): void {
    this.router.navigate([`/pages/forms-edit/edit-user/${event.data.id}`]);
  }

  onSearch(query: string = '') {
    if (query === '') {
      this.source.reset();
    } else {
      this.source.setFilter([
        {
          field: 'fullName',
          search: query,
        },
        {
          field: 'phoneNumber',
          search: query,
        },
      ], false, true);
    }
  }
}
