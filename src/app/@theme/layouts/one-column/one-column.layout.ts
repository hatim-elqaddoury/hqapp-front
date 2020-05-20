import { AfterViewInit, Component, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NbLayoutComponent, NbSidebarService } from '@nebular/theme';

import { WindowModeBlockScrollService } from '../../services/window-mode-block-scroll.service';
import { LayoutService } from '../../../@core/utils';

@Component({
  selector: 'hq-one-column-layout',
  styleUrls: ['./one-column.layout.scss'],
  templateUrl: `./one-column.layout.html`,
})
export class OneColumnLayoutComponent implements AfterViewInit {

  @ViewChild(NbLayoutComponent, { static: false }) layout: NbLayoutComponent;

  constructor(
    @Inject(PLATFORM_ID) private platformId,
    private windowModeBlockScrollService: WindowModeBlockScrollService,
    private sidebarService: NbSidebarService,
    private layoutService: LayoutService,
  ) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.windowModeBlockScrollService.register(this.layout);
    }
  }
  toggleOnlineUsersBar() {
    this.sidebarService.toggle(false, 'onlineUsers');
    this.layoutService.changeLayoutSize();
    return false;
  }
}
