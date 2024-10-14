import { useParams } from "react-router-dom";

function EmpleadoForm() {
	const { id } = useParams(); // Captura el parámetro de la URL
	const isEditing = id !== "nuevo"; // Si el id es "nuevo", es una creación; si no, es edición.

	return (
		<div>
			<h1>{isEditing ? "Editar Empleado" : "Crear Empleado"}</h1>
			{/* Aquí va el formulario */}
		</div>
	);
}

export default EmpleadoForm;
