import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="h-screen flex items-center justify-center">
      <main className="w-96">
        <h2 className="text-center text-2xl font-semibold">404 Not Found</h2>
        <p className="text-center">Está intentando acceder a una funacionalidad que no existe.</p>
        <p className="text-center">
          <Link to="/" className="text-blue-500">
            Volver al inicio
          </Link>
        </p>
      </main>
    </div>
  )
}
