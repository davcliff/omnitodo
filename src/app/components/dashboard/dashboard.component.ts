import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ListComponent } from '../list/list.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  routingQueryParams: Subscription;

  constructor(private dialogService: MatDialog, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.routingQueryParams = this.route.queryParams.subscribe(params => {
      if (params.display === 'inbox') {
        this.showInbox();
      }
      if (params.display === 'project') {
        this.showProject(params.id);
      }

    });
  }

  showProject(id: string): void {
    const dlg = this.dialogService.open(ListComponent, { disableClose: false, data: { perspective: 'Project', id } });
    dlg.afterClosed().subscribe(() => this.router.navigate(['dashboard']));
  }

  showInbox(): void {
    const dlg = this.dialogService.open(ListComponent, { disableClose: false, data: { perspective: 'Inbox' } });
    dlg.afterClosed().subscribe(() => {
      this.router.navigate(['dashboard']);
    });
  }

}
