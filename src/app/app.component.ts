import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import { SeoService } from './@core/utils/seo.service';
import { Title } from '@angular/platform-browser';
import { NbMenuService } from '@nebular/theme';
import { NbTokenService } from '@nebular/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {

  constructor(private analytics: AnalyticsService,
    private seoService: SeoService,
    private titleService: Title,
    private menuService: NbMenuService,
    private tokenService: NbTokenService,
    private router: Router) {
  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle('پنل مدیریت | ' + newTitle);
  }

  onContecxtItemSelection(title: string) {
    if (title === 'خروج') {
      this.tokenService.clear();
      // this.authService.logout('');
      this.router.navigate(['auth/login']);
    } else if (title === 'پروفایل') {
      // console.log('Profile Clicked');
    }
  }

  ngOnInit(): void {
    this.analytics.trackPageViews();
    this.seoService.trackCanonicalChanges();

    this.menuService.onItemClick()
      .subscribe((event) => {
        this.onContecxtItemSelection(event.item.title);
      });
  }
}
