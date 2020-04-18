import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, NavigationStart } from '@angular/router';
import { AdminService } from '../../@core/utils';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'hq-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private adminS: AdminService) {
  }

  private user: any;
  private id: any;

  ngOnInit() {

    let idUser = this.route.snapshot.params.id;
    this.getUser(idUser);
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      idUser = this.route.snapshot.params.id; 
      this.getUser(idUser);
    });
  }

  getUser(id: String):any{
    if (id == null || id == undefined) /* id = CurrentUSer.id id = "first"; this.router.navigateByUrl("/app/dashboard");*/  console.log("not found");
    else this.adminS.getUser(id).subscribe(res => { this.user = res; });
  }


  ngOnDestroy() {
  }
}
