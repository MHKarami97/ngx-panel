import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { NbThemeService, NbToastrService, NbGlobalPhysicalPosition } from '@nebular/theme';
import { Statistic } from '../../../models/more/statistic.module';
import { StatisticService } from '../../../services/statistic.service';

@Component({
  selector: 'ngx-echarts-bar-animation',
  template: `
    <div echarts [options]="options" class="echart"></div>
  `,
})
export class EchartsBarAnimationComponent implements AfterViewInit, OnDestroy, OnInit {
  options: any = {};
  themeSubscription: any;
  loading = false;
  error = null;
  data: Statistic;

  constructor(private theme: NbThemeService,
     private dataService: StatisticService, private toastrService: NbToastrService) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.dataService.get().subscribe(
      results => {
        this.data === results.data;
      },
      error => {
        this.error = error.message;
        this.onError();
      },
    );
    this.loading = false;
  }

  ngAfterViewInit() {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      const xAxisData = [];
      const data1 = [];

      const colors: any = config.variables;
      const echarts: any = config.variables.echarts;

      this.options = {
        backgroundColor: echarts.bg,
        color: [colors.primaryLight, colors.infoLight],
        legend: {
          data: ['bar'],
          align: 'left',
          textStyle: {
            color: echarts.textColor,
          },
        },
        xAxis: [
          {
            data: xAxisData,
            silent: false,
            axisTick: {
              alignWithLabel: true,
            },
            axisLine: {
              lineStyle: {
                color: echarts.axisLineColor,
              },
            },
            axisLabel: {
              textStyle: {
                color: echarts.textColor,
              },
            },
          },
        ],
        yAxis: [
          {
            axisLine: {
              lineStyle: {
                color: echarts.axisLineColor,
              },
            },
            splitLine: {
              lineStyle: {
                color: echarts.splitLineColor,
              },
            },
            axisLabel: {
              textStyle: {
                color: echarts.textColor,
              },
            },
          },
        ],
        series: [
          {
            name: 'bar',
            type: 'bar',
            data: data1,
            animationDelay: idx => idx * 10,
          },
        ],
        animationEasing: 'elasticOut',
        animationDelayUpdate: idx => idx * 5,
      };

      xAxisData.push('دسته بندی ها');
      xAxisData.push('استاندارد ها');
      xAxisData.push('درخواست ها');
      xAxisData.push('قیمت ها');
      xAxisData.push('کاربر ها');

      data1.push(this.data.categories);
      data1.push(this.data.standards);
      data1.push(this.data.requests);
      data1.push(this.data.prices);
      data1.push(this.data.users);
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
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
}
