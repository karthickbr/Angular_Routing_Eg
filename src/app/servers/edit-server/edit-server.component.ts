import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit {
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
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
    this.changesSaved = true;
    this.router.navigate(['../'], { relativeTo: this.rout});

  }

}
