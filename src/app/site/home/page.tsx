import { Link } from 'react-router';
// Data
import { paths } from '../../../data/paths';



export default function HomePage() {
  
  return (
    <>
      {/* LEARNING PATHS */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pb-28">
        <div className="text-center mb-14">

          <h2 className="text-4xl font-bold mt-12 mb-4">
            Choose Your English Path
          </h2>

          <p className="max-w-2xl mx-auto text-slate-600">
            Select the topic you want to improve and continue by difficulty
            level: Beginner, Intermediate, or Advanced.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-lg md:max-w-4xl mx-auto">
          {paths.map((path) => (
            <Link
              key={path.title}
              to={`/path/${path.href}`}
              className={`group ${path.color} rounded-3xl p-8 border border-slate-100 shadow-xl shadow-slate-200/50 hover:-translate-y-2 transition-all duration-300`}
            >
              <div className="text-5xl mb-6">{path.icon}</div>

              <h3 className="text-2xl font-bold mb-4 group-hover:text-indigo-600 transition">
                {path.title}
              </h3>

              <p className="text-slate-500 leading-relaxed mb-8">
                {path.description}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
                  Beginner → Advanced
                </span>

                <span className="text-indigo-600 font-bold">
                  Explore →
                </span>
              </div>
            </Link>
          ))}
        </div>

      </section>
    </>
  );
}