import { CategoryCreate, Category } from './../../../models/category/category.module';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CategoryService } from '../../../services/category.service';
import { NbToastrService, NbGlobalPhysicalPosition } from '@nebular/theme';
import { Api } from '../../../models/base/api.model';

@Component({
  selector: 'ngx-add-category',
  styleUrls: ['./add-category.component.scss'],
  templateUrl: './add-category.component.html',
})
export class AddCategoryComponent implements OnInit {

  isFetching = false;
  error = null;

  categoryInput: CategoryCreate = { id: 0, name: '', parentCategoryId: 0 };
  mainCats: Category[] = [];
  result: Api<CategoryCreate>;
  submitted: boolean = false;

  constructor(private title: Title,
    private dataService: CategoryService, private toastrService: NbToastrService) {
  }

  ngOnInit(): void {
    this.title.setTitle('پنل مدیریت' + ' | ' + 'افزودن ' + 'دسته بندی');

    this.isFetching = true;
    this.dataService.get().subscribe(
      results => {
        this.isFetching = false;
        this.mainCats = results.data;
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

    this.isFetching = true;
    this.dataService.create(this.categoryInput).subscribe(
      results => {
        this.isFetching = false;
        this.result = results;

        if (this.result.isSuccess) {
          this.onSuccess(this.result.message);
        } else {
          this.onOther(this.result.message);
        }
      },
      error => {
        this.isFetching = false;
        this.error = error.message;
        this.onError();
      },
    );
  }
}
