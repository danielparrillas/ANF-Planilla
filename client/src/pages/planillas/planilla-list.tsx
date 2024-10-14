import { Link } from "react-router-dom";

function PlanillaList() {
	return (
		<div>
			<h1>Planillas</h1>
			<Link to="/planilla/nuevo">Agregar una nueva planilla</Link>
		</div>
	);
}

export default PlanillaList;