import { Link } from 'react-router-dom'

function ReporteList() {
  return (
    <div>
      <h1>Reportes</h1>
      <Link to="/reporte/nuevo">Agregar un nuevo Reporte</Link>
    </div>
  )
}

export default ReporteList
