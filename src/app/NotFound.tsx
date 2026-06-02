import { Link } from 'react-router';



export default function NotFound() {

  return (
    <div className='min-h-screen bg-white'>
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
        <h1 className="text-9xl font-bold tracking-tight bg-linear-to-br from-indigo-500 to-indigo-700 bg-clip-text text-transparent">
          404
        </h1>

        <h2 className="mt-3 text-2xl font-semibold text-gray-600">
          Page Not Found
        </h2>

        <p className="mt-3 max-w-md text-sm text-gray-600">
          The page you're looking for doesn't exist or may have been removed.
        </p>

        <Link
          to={'/'}
          className="mt-7 bg-linear-to-br from-indigo-500 to-indigo-700 text-white px-6 py-2 rounded-full font-semibold hover:from-indigo-600 hover:to-indigo-800 transition duration-500"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}