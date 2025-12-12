export type EmployeeRole = 'Developer' | 'Lead' | 'Designer';

export interface Employee {
  id: string;
  name: string;
  email: string;
  role: EmployeeRole;
  status: 'Active' | 'Inactive';
}