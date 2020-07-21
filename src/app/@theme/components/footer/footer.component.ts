import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">
      طراحی شده با ♥
    </span>
    <div class="socials">
      <a href="https://github.com/mhkarami97" target="_blank" class="ion ion-social-github"></a>
      <a href="#" target="_blank" class="ion ion-social-facebook"></a>
      <a href="https://twitter.com/mhkarami97" target="_blank" class="ion ion-social-twitter"></a>
      <a href="https://linkedin.com/in/mhkarami97" target="_blank" class="ion ion-social-linkedin"></a>
    </div>
  `,
})
export class FooterComponent {
}
