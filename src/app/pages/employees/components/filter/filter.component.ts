import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {
  
  employeeForm:any;
  value = '';
  phoneNumber = '';
  @Output() filterData = new EventEmitter<any>();

  constructor(
    private employeeService: EmployeeService,
  ) {}
  ngOnInit(): void {
    this.employeeForm = new FormGroup({
      create_at: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      is_admin: new FormControl(false),
      is_ecp: new FormControl(false),
      name: new FormControl(''),
      phone: new FormControl(''),
      status: new FormControl(''),
      update_at: new FormControl(''),
    });
  }

  submitForm() {
    // if (this.formGroup.valid) {
    //   // Form is valid, handle the submission
      console.log(this.employeeForm.value);
      this.filterData.emit(this.employeeForm.value);
    // } else {
      // Form is invalid, show error messages
      // this.formGroup.markAllAsTouched();
    // }
  }

  clear(){
    this.employeeForm.reset();

    this.employeeService.updateEmployee$.next(true);

  }
}
