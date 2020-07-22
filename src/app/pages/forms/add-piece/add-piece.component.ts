import { Category } from './../../../models/category/category.module';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CategoryService } from '../../../services/category.service';
import { NbToastrService, NbGlobalPhysicalPosition } from '@nebular/theme';
import { Api } from '../../../models/base/api.model';
import { PieceCreate, Piece } from '../../../models/piece/piece.module';
import { PieceService } from '../../../services/piece.service';

@Component({
  selector: 'ngx-add-piece',
  styleUrls: ['./add-piece.component.scss'],
  templateUrl: './add-piece.component.html',
})
export class AddPieceComponent implements OnInit {

  loading = false;
  error = null;

  input: PieceCreate = { id: 0, name: '' };
  mainCats: Category[] = [];
  result: Api<Piece>;
  submitted: boolean = false;

  constructor(private title: Title,
    private categoryDataService: CategoryService,
    private dataService: PieceService, private toastrService: NbToastrService) {
  }

  ngOnInit(): void {
    this.title.setTitle('پنل مدیریت' + ' | ' + 'افزودن ' + 'قطعه');

    this.loading = true;
    this.categoryDataService.get().subscribe(
      results => {
        this.mainCats = results.data;
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
    this.dataService.create(this.input).subscribe(
      results => {
        this.result = results;

        if (this.result.isSuccess) {
          this.onSuccess(this.result.message);
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
