import { AfterViewInit, Component, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NbLayoutComponent } from '@nebular/theme';

import { WindowModeBlockScrollService } from '../../services/window-mode-block-scroll.service';

@Component({
  selector: 'hq-public-one-column-layout',
  styleUrls: ['./public-one-column.layout.scss'],
  template: `
    <nb-layout windowMode>
      <nb-layout-header fixed>
        <hq-public-header></hq-public-header>
      </nb-layout-header>
      
      <nb-layout-column>
        <ng-content select="router-outlet"></ng-content>
      </nb-layout-column>

      <nb-layout-footer fixed>
        <hq-public-footer></hq-public-footer>
      </nb-layout-footer>
    </nb-layout>
  `,
})
export class PublicOneColumnLayoutComponent implements AfterViewInit {

  @ViewChild(NbLayoutComponent, { static: false }) layout: NbLayoutComponent;

  constructor(
    @Inject(PLATFORM_ID) private platformId,
    private windowModeBlockScrollService: WindowModeBlockScrollService,
  ) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.windowModeBlockScrollService.register(this.layout);
    }
  }
}
