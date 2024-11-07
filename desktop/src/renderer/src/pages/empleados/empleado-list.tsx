import { Link } from 'react-router-dom'

function EmpleadoList() {
  return (
    <div>
      <h1>Empleados</h1>
      <Link to="/empleado/nuevo">Agregar un nuevo empleado</Link>
    </div>
  )
}

export default EmpleadoList
