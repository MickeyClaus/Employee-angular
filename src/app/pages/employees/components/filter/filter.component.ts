import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {
  
  employeeForm:any;
  value = '';
  phoneNumber = '';

  ngOnInit(): void {
    this.employeeForm = new FormGroup({
      create_at: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      id: new FormControl(''),
      is_admin: new FormControl(false),
      is_ecp: new FormControl(false),
      name: new FormControl(''),
      phone: new FormControl(''),
      status: new FormControl(''),
      update_at: new FormControl(''),
      user_id: new FormControl(''),
    });
  }
}
