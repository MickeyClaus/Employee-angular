import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { EmployeeService } from 'src/app/services/employee.service';
import { IEmployee } from 'src/app/models/employee';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  mergedData: IEmployee[] = [];
  displayedColumns: string[] = [
    'move',
    'login',
    'email',
    'phone',
    'role',
    'changeDate',
    'createDate',
    'status',
    'payment',
  ];
  dataSource = new MatTableDataSource<IEmployee>();
  mobileData : any;
  selection = new SelectionModel<IEmployee>(true, []);
  mobileTable = false;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    if (window.screen.width < 769) {
    this.mobileTable = true;
    }
    this.getData();
  }

  getData(): void {
    this.employeeService.getEmployeesData().subscribe((data: any) => {
      const { users, data: userMappings } = data;

      this.dataSource = userMappings.map((mapping: any) => {
        const user = users.find((user: any) => user.id === mapping.user_id);
        return { ...user, ...mapping };
      });
      this.mobileData = this.dataSource;
    });
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data?.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource?.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: IEmployee): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.id + 1
    }`;
  }
}
