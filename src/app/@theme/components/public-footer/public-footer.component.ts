import { Component } from '@angular/core';

@Component({
  selector: 'hq-public-footer',
  styleUrls: ['./public-footer.component.scss'],
  template: `
    <span class="created-by">HQ &copy; 2019</span>
    <div class="socials">
      <a href="https://www.linkedin.com/in/hatim-el-qaddoury/" target="_blank" class="ion ion-social-linkedin"></a>
      <a href="https://www.instagram.com/hatim.elqaddoury/" target="_blank" class="ion ion-social-instagram"></a>
      <a href="https://www.facebook.com/hatim.elqaddoury/" target="_blank" class="ion ion-social-facebook"></a>
      <a href="https://twitter.com/HatimElQaddoury" target="_blank" class="ion ion-social-twitter"></a>
    </div>
  `,
})
export class PublicFooterComponent {
}
