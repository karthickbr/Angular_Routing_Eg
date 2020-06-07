import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CanDeactivateGuard } from './can-deactivate-guard.service';
import { Observable } from 'rxjs/observable';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanDeactivateGuard {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  allowEdit = false ;
  changesSaved = false;

  constructor(private serversService: ServersService, private rout: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.server = this.serversService.getServer(1);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;

    console.log(this.rout.snapshot.queryParams);
    console.log(this.rout.snapshot.fragment);

    this.rout.queryParams.subscribe(
      (queryParms: Params) => {
        this.allowEdit = queryParms['allowEdit'] === '1' ? true : false;
      }
    );
    this.rout.fragment.subscribe();
    const id = +this.rout.snapshot.params['id'];
    this.server = this.serversService.getServer(id);

    //
    this.serverName = this.server.name;
    this.serverStatus =  this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
    this.changesSaved = true;
    this.router.navigate(['../'], { relativeTo: this.rout}); // ../ for one level up...previous page

  }
  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean  {
   if (!this.allowEdit) {
     return true;
   }
   if ((this.serverName !== this.server.name || this.serverStatus !== this.server.status) && !this.changesSaved) {

      return confirm('Do you want to Discard the Change?');
   } else {
     return true;
   }

  }

}
