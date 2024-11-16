// mock-data.ts
import { Employee, Payroll } from '../types'

export const mockEmployees: Employee[] = [
  {
    id: '1',
    name: 'Carlos Rodríguez',
    baseSalary: 1200,
    startDate: '2018-05-21',
    position: 'Mecánico Senior',
    department: 'Mecánica General'
  },
  {
    id: '2',
    name: 'María López',
    baseSalary: 950,
    startDate: '2019-07-15',
    position: 'Asistente Administrativo',
    department: 'Administración'
  },
  {
    id: '3',
    name: 'José Martínez',
    baseSalary: 1050,
    startDate: '2020-03-10',
    position: 'Mecánico Junior',
    department: 'Mecánica General'
  },
  {
    id: '4',
    name: 'Ana Gómez',
    baseSalary: 1100,
    startDate: '2017-11-05',
    position: 'Especialista en Electricidad',
    department: 'Electricidad'
  },
  {
    id: '5',
    name: 'Luis Pérez',
    baseSalary: 1250,
    startDate: '2016-08-19',
    position: 'Mecánico Senior',
    department: 'Mecánica General'
  },
  {
    id: '6',
    name: 'Elena Sánchez',
    baseSalary: 1020,
    startDate: '2018-09-25',
    position: 'Mecánica Junior',
    department: 'Mecánica General'
  },
  {
    id: '7',
    name: 'Miguel Ramírez',
    baseSalary: 1400,
    startDate: '2015-04-12',
    position: 'Supervisor de Taller',
    department: 'Supervisión'
  },
  {
    id: '8',
    name: 'Lucía Fernández',
    baseSalary: 980,
    startDate: '2021-02-01',
    position: 'Asistente de Repuestos',
    department: 'Bodega'
  },
  {
    id: '9',
    name: 'Jorge Hernández',
    baseSalary: 1300,
    startDate: '2018-12-10',
    position: 'Mecánico Senior',
    department: 'Mecánica General'
  },
  {
    id: '10',
    name: 'Raúl Castillo',
    baseSalary: 970,
    startDate: '2020-06-30',
    position: 'Mecánico Junior',
    department: 'Mecánica General'
  },
  {
    id: '11',
    name: 'Patricia Morales',
    baseSalary: 1000,
    startDate: '2019-10-11',
    position: 'Recepcionista',
    department: 'Atención al Cliente'
  },
  {
    id: '12',
    name: 'Alfredo Ramírez',
    baseSalary: 1250,
    startDate: '2017-08-17',
    position: 'Especialista en Suspensión',
    department: 'Suspensión'
  },
  {
    id: '13',
    name: 'Gloria Cruz',
    baseSalary: 1100,
    startDate: '2020-01-14',
    position: 'Asistente Contable',
    department: 'Contabilidad'
  },
  {
    id: '14',
    name: 'Rafael Jiménez',
    baseSalary: 950,
    startDate: '2021-05-21',
    position: 'Mecánico Junior',
    department: 'Mecánica General'
  },
  {
    id: '15',
    name: 'Daniel Vázquez',
    baseSalary: 1200,
    startDate: '2019-03-29',
    position: 'Especialista en Frenos',
    department: 'Frenos'
  },
  {
    id: '16',
    name: 'Mónica Ochoa',
    baseSalary: 980,
    startDate: '2018-12-02',
    position: 'Asistente Administrativo',
    department: 'Administración'
  },
  {
    id: '17',
    name: 'Diego Mejía',
    baseSalary: 1300,
    startDate: '2016-11-30',
    position: 'Mecánico Senior',
    department: 'Mecánica General'
  },
  {
    id: '18',
    name: 'Mariana Ruiz',
    baseSalary: 950,
    startDate: '2021-09-15',
    position: 'Asistente de Taller',
    department: 'Supervisión'
  },
  {
    id: '19',
    name: 'Sofía Blanco',
    baseSalary: 1200,
    startDate: '2017-04-23',
    position: 'Especialista en Electricidad',
    department: 'Electricidad'
  },
  {
    id: '20',
    name: 'Gabriel Fuentes',
    baseSalary: 990,
    startDate: '2021-03-11',
    position: 'Mecánico Junior',
    department: 'Mecánica General'
  },
  {
    id: '21',
    name: 'Laura Acosta',
    baseSalary: 1100,
    startDate: '2018-01-09',
    position: 'Coordinadora de Compras',
    department: 'Compras'
  },
  {
    id: '22',
    name: 'Oscar Torres',
    baseSalary: 1400,
    startDate: '2015-07-04',
    position: 'Supervisor de Taller',
    department: 'Supervisión'
  },
  {
    id: '23',
    name: 'Beatriz Romero',
    baseSalary: 950,
    startDate: '2021-11-08',
    position: 'Asistente de Recepción',
    department: 'Atención al Cliente'
  },
  {
    id: '24',
    name: 'Héctor Ortiz',
    baseSalary: 1250,
    startDate: '2019-06-05',
    position: 'Especialista en Motores',
    department: 'Motores'
  },
  {
    id: '25',
    name: 'Andrea Pineda',
    baseSalary: 980,
    startDate: '2018-10-18',
    position: 'Asistente Administrativo',
    department: 'Administración'
  },
  {
    id: '26',
    name: 'Sebastián Flores',
    baseSalary: 950,
    startDate: '2020-07-07',
    position: 'Mecánico Junior',
    department: 'Mecánica General'
  },
  {
    id: '27',
    name: 'Carmen Peña',
    baseSalary: 1200,
    startDate: '2017-03-16',
    position: 'Especialista en Suspensión',
    department: 'Suspensión'
  },
  {
    id: '28',
    name: 'Ricardo Vega',
    baseSalary: 1100,
    startDate: '2016-09-29',
    position: 'Mecánico Senior',
    department: 'Mecánica General'
  },
  {
    id: '29',
    name: 'Pablo Navarro',
    baseSalary: 990,
    startDate: '2021-01-12',
    position: 'Mecánico Junior',
    department: 'Mecánica General'
  },
  {
    id: '30',
    name: 'Nuria Gómez',
    baseSalary: 1150,
    startDate: '2018-04-25',
    position: 'Especialista en Diagnóstico',
    department: 'Diagnóstico'
  },
  {
    id: '31',
    name: 'Tomás Serrano',
    baseSalary: 1350,
    startDate: '2015-12-21',
    position: 'Supervisor de Taller',
    department: 'Supervisión'
  },
  {
    id: '32',
    name: 'Irene Cáceres',
    baseSalary: 970,
    startDate: '2019-08-15',
    position: 'Asistente de Repuestos',
    department: 'Bodega'
  },
  {
    id: '33',
    name: 'Juan Mena',
    baseSalary: 1200,
    startDate: '2017-06-30',
    position: 'Especialista en Frenos',
    department: 'Frenos'
  },
  {
    id: '34',
    name: 'Sara Delgado',
    baseSalary: 1080,
    startDate: '2020-09-14',
    position: 'Asistente Contable',
    department: 'Contabilidad'
  },
  {
    id: '35',
    name: 'Victor Domínguez',
    baseSalary: 950,
    startDate: '2021-04-18',
    position: 'Mecánico Junior',
    department: 'Mecánica General'
  },
  {
    id: '36',
    name: 'Olga Espinoza',
    baseSalary: 1220,
    startDate: '2016-03-19',
    position: 'Especialista en Electricidad',
    department: 'Electricidad'
  },
  {
    id: '37',
    name: 'Federico Álvarez',
    baseSalary: 1050,
    startDate: '2019-05-05',
    position: 'Mecánico Senior',
    department: 'Mecánica General'
  },
  {
    id: '38',
    name: 'Diana Cabrera',
    baseSalary: 950,
    startDate: '2021-10-08',
    position: 'Asistente Administrativo',
    department: 'Administración'
  },
  {
    id: '39',
    name: 'Enrique León',
    baseSalary: 1280,
    startDate: '2017-07-12',
    position: 'Especialista en Diagnóstico',
    department: 'Diagnóstico'
  },
  {
    id: '40',
    name: 'Luisa Medina',
    baseSalary: 970,
    startDate: '2020-11-02',
    position: 'Recepcionista',
    department: 'Atención al Cliente'
  },
  {
    id: '41',
    name: 'Joaquín Salazar',
    baseSalary: 1340,
    startDate: '2015-09-24',
    position: 'Supervisor de Taller',
    department: 'Supervisión'
  },
  {
    id: '42',
    name: 'Marta Gutiérrez',
    baseSalary: 980,
    startDate: '2021-02-28',
    position: 'Asistente de Taller',
    department: 'Supervisión'
  },
  {
    id: '43',
    name: 'Ángel Rivas',
    baseSalary: 1220,
    startDate: '2018-08-10',
    position: 'Especialista en Suspensión',
    department: 'Suspensión'
  },
  {
    id: '44',
    name: 'Paula Valdés',
    baseSalary: 1000,
    startDate: '2019-03-05',
    position: 'Coordinadora de Compras',
    department: 'Compras'
  },
  {
    id: '45',
    name: 'Rubén Escobar',
    baseSalary: 950,
    startDate: '2020-05-16',
    position: 'Mecánico Junior',
    department: 'Mecánica General'
  },
  {
    id: '46',
    name: 'Silvia Herrera',
    baseSalary: 1250,
    startDate: '2016-01-25',
    position: 'Especialista en Motores',
    department: 'Motores'
  },
  {
    id: '47',
    name: 'Esteban Franco',
    baseSalary: 1050,
    startDate: '2019-12-09',
    position: 'Mecánico Senior',
    department: 'Mecánica General'
  },
  {
    id: '48',
    name: 'Natalia Parra',
    baseSalary: 980,
    startDate: '2021-07-13',
    position: 'Asistente Administrativo',
    department: 'Administración'
  },
  {
    id: '49',
    name: 'Ramiro Lara',
    baseSalary: 1150,
    startDate: '2017-05-20',
    position: 'Especialista en Frenos',
    department: 'Frenos'
  },
  {
    id: '50',
    name: 'Karina Chávez',
    baseSalary: 970,
    startDate: '2020-08-08',
    position: 'Recepcionista',
    department: 'Atención al Cliente'
  }
]

// Ejemplo de datos de planilla para referencia
export const mockPayrolls: Payroll[] = []
