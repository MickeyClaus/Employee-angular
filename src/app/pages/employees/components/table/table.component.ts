import { SelectionModel } from '@angular/cdk/collections';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { EmployeeService } from 'src/app/services/employee.service';
import { IEmployee } from 'src/app/models/employee';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, OnChanges {
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
  mobileData: any;
  selection = new SelectionModel<IEmployee>(true, []);
  mobileTable = false;
  @Input() filteredData: any;
  subscription: Subscription | undefined;


  constructor(private employeeService: EmployeeService) {
  
  }

  ngOnInit(): void {
    this.subscription = this.employeeService.updateEmployee$.subscribe(
      (update: boolean) => {
        if (update) {
          this.getData();

        }
      }
    );
    if (window.screen.width < 769) {
      this.mobileTable = true;
    }
    this.getData();
  }

  ngOnChanges(changes: SimpleChanges) {
    let receivedData = this.mobileData.filter(
      (item: any) =>
        item.name.toLowerCase() === this.filteredData.name.toLowerCase()
        //  &&
        // item.phone.toLowerCase() === this.filteredData.phone.toLowerCase() &&
        // item.create_at.toLowerCase() ===
        //   this.filteredData.create_at.toLowerCase() &&
        // item.status.toLowerCase() === this.filteredData.status.toLowerCase() &&
        // item.email.toLowerCase() === this.filteredData.email.toLowerCase() &&
        // item.is_admin.toLowerCase() ===
        //   this.filteredData.is_admin.toLowerCase() &&
        // item.update_at.toLowerCase() ===
          // this.filteredData.update_at.toLowerCase()
    );
    this.dataSource = receivedData;
    this.mobileData = receivedData;
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
