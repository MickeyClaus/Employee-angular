export const employees = () =>
  import('../../pages/employees/modules/employees.module').then((m) => m.EmployeesModule);

