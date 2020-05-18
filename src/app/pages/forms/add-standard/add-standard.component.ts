import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NbToastrService, NbGlobalPhysicalPosition } from '@nebular/theme';
import { Api } from '../../../models/base/api.model';
import { StandardCreate, Standard } from '../../../models/standard/Standard.module';
import { StandardService } from '../../../services/standard.service';
import { PieceService } from '../../../services/piece.service';
import { Piece } from '../../../models/piece/piece.module';

@Component({
  selector: 'ngx-add-standard',
  styleUrls: ['./add-standard.component.scss'],
  templateUrl: './add-standard.component.html',
})
export class AddStandardComponent implements OnInit {

  loading = false;
  error = null;

  input: StandardCreate = { id: 0, file: '', pieceId: 0 };
  pieces: Piece[] = [];
  result: Api<Standard>;
  submitted: boolean = false;

  constructor(private title: Title,
    private dataService: StandardService, private pieceDataService: PieceService,
     private toastrService: NbToastrService) {
  }

  ngOnInit(): void {
    this.title.setTitle('پنل مدیریت' + ' | ' + 'افزودن ' + 'استاندارد');

    this.loading = true;
    this.pieceDataService.get().subscribe(
      results => {
        this.pieces = results.data;
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
