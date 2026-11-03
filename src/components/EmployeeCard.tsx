import type { Employee } from '../Types/Employee';

interface EmployeeCardProps {
  employee: Employee;
}

function EmployeeCard({ employee }: EmployeeCardProps) {
  return (
    <figure className='DisplayEmployee'>
      <img src={employee.picture.medium} alt={employee.name.first} />
      <figcaption>
        <strong>
          {employee.name.title ? `${employee.name.title} ` : ''}
          {employee.name.first} {employee.name.last}
        </strong>
        <p>{employee.email}</p>
      </figcaption>
    </figure>
  );
}

export default EmployeeCard;