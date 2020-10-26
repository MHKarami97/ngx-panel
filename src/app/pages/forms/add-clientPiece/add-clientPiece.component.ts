import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NbToastrService, NbGlobalPhysicalPosition } from '@nebular/theme';
import { Api } from '../../../models/base/api.model';
import { PieceService } from '../../../services/piece.service';
import { Piece, ClientPieceCreate, ClientPiece } from '../../../models/piece/piece.module';
import { Company } from '../../../models/client/company.module';
import { Producer } from '../../../models/client/Producer.module';
import { CompanyService } from '../../../services/company.service';
import { ProducerService } from '../../../services/producer.service';

@Component({
  selector: 'ngx-add-client-piece',
  styleUrls: ['./add-clientPiece.component.scss'],
  templateUrl: './add-clientPiece.component.html',
})
export class AddClientPieceComponent implements OnInit {

  loading = false;
  error = null;

  input: ClientPieceCreate = { id: 0, companyInfoId: null, producerInfoId: null, pieceId: null };
  pieces: Piece[] = [];
  companies: Company[] = [];
  producers: Producer[] = [];
  result: Api<ClientPiece>;
  submitted: boolean = false;

  constructor(private title: Title,
    private dataService: PieceService, private dataCompanyService: CompanyService,
    private dataProducerService: ProducerService,
    private toastrService: NbToastrService) {
  }

  ngOnInit(): void {
    this.title.setTitle('پنل مدیریت' + ' | ' + 'افزودن ' + 'قطعه به کلاینت');

    this.loading = true;
    this.dataService.get().subscribe(
      results => {
        this.pieces = results.data;
      },
      error => {
        this.error = error.message;
        this.onError();
      },
    );

    this.dataCompanyService.get().subscribe(
      results => {
        this.companies = results.data;
      },
      error => {
        this.error = error.message;
        this.onError();
      },
    );

    this.dataProducerService.get().subscribe(
      results => {
        this.producers = results.data;

        this.loading = false;
      },
      error => {
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
    this.loading = true;

    this.dataService.addPieceToClient(this.input).subscribe(
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
