import { Component, OnInit } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
  providers: [{ provide: MatPaginatorIntl, useClass: PaginatorComponent }],
})
export class PaginatorComponent implements OnInit {
  constructor(public matPaginatorIntl: MatPaginatorIntl) {
  }

  ngOnInit() {
    this.matPaginatorIntl.itemsPerPageLabel = 'Custom Items per Page';
  }
}
