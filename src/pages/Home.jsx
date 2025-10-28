import { Link } from "react-router-dom";

export default function Home() {
  // Use a div or React.Fragment as the outermost container if you don't need a <main> tag
  return (
    // The main tag here serves as the container for the entire page content
    <main className="min-h-screen">
      
      {/* 🚀 Hero Section - Adjusted padding-bottom to match original */}
      <section className="relative overflow-hidden bg-white pb-32">
        {/* Decorative circles - Adjusting opacity to match original (0.2 -> 20) */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-500 rounded-full border opacity-20"></div>
        <div className="absolute top-1/2 right-0 w-72 h-72 bg-blue-300 rounded-full border opacity-10"></div> {/* Original was opacity-10 */}

        {/* Hero Content */}
        {/* NOTE: If max-w-container is not a custom Tailwind config, you might want to replace it with a standard class like max-w-7xl */}
        <div className="max-w-container mx-auto flex flex-col items-center text-center px-6 py-24 relative z-10">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4">TicketApp</h1>
          <p className="text-lg text-gray-600 max-w-xl mb-8">
            Manage your tickets easily across projects — fast, clean, and consistent.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/auth/login"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
            >
              Login
            </Link>
            <Link
              to="/auth/signup"
              className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition"
            >
              Get Started
            </Link>
          </div>
        </div>

        {/* Smooth Wavy Bottom overlapping next section - CORRECTED clip-path */}
        <div
          className="absolute bottom-0 left-0 w-full h-48 bg-blue-100 z-0"
          style={{
            // Original Twig clip-path converted to React inline style format
            clipPath: "path('M0,160 C300,240 1140,80 1440,160 L1440,320 L0,320 Z')",
          }}
        ></div>
      </section>

      ---

      {/* ✨ Features Section - Adjusted margin and padding to match original overlap */}
      <section className="relative z-10 -mt-24 max-w-container mx-auto grid md:grid-cols-3 gap-6 px-6 py-24">
        <div className="bg-white rounded-2xl shadow p-8 text-center">
          <h2 className="font-semibold text-xl mb-2">Track Tickets</h2>
          <p className="text-gray-600">
            Stay organized with open, in-progress, and closed states.
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow p-8 text-center">
          <h2 className="font-semibold text-xl mb-2">Secure Access</h2>
          <p className="text-gray-600">
            Login simulation powered by localStorage tokens.
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow p-8 text-center">
          <h2 className="font-semibold text-xl mb-2">Unified Design</h2>
          <p className="text-gray-600">
            Same layout across React, Vue, and Twig.
          </p>
        </div>
      </section>

      ---

      {/* 🦶 Footer - Adjusted margin-top to match original structure */}
      <footer className="bg-gray-900 text-white py-8 mt-10">
        <div className="max-w-container mx-auto text-center text-sm">
          {/* Note: In your code, you had a new Date() call, which is good practice! */}
          &copy; **{new Date().getFullYear()}** TicketApp — All rights reserved.
        </div>
      </footer>
    </main>
  );
}