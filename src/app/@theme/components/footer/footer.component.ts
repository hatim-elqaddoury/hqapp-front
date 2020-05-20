import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NbSidebarService } from '@nebular/theme';

@Component({
  selector: 'hq-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <div class="socials">
      <a href="https://www.linkedin.com/in/hatim-el-qaddoury/" target="_blank" class="ion ion-social-linkedin"></a>
      <a href="https://www.instagram.com/hatim.elqaddoury/" target="_blank" class="ion ion-social-instagram"></a>
      <a href="https://twitter.com/HatimElQaddoury" target="_blank" class="ion ion-social-twitter"></a>
      <a href="https://www.facebook.com/hatim.elqaddoury/" target="_blank" class="ion ion-social-facebook"></a>
    </div>
    
    <div class="created-by"><a class="link" (click)="GoTo('privacy')">Privacy</a> · <a class="link" (click)="GoTo('terms')">Terms</a> · <a class="link" (click)="GoTo('about')">About</a> </div>
    <div class="created-by">HQ &copy; 2019</div>
    
  `,
})
export class FooterComponent {

  constructor(private router: Router, private sidebarService: NbSidebarService,) {
  }
  GoTo(url: string): any {
    this.router.navigateByUrl("/app/" + url);
    //this.sidebarService.collapse('menu-sidebar');
  }

}
