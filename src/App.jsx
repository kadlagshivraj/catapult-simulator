import React, { useState, useEffect } from 'react'

// Single-file React component for a small physics learning site.
// Uses Tailwind-style classes for structure (plain CSS works fine too).

export default function App() {
  const [route, setRoute] = useState('home') // home, catapult, pendulum

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Left information panel */}
        <aside className="md:col-span-1 bg-white p-6 rounded-2xl shadow-md sticky top-6">
          <h1 className="text-xl font-bold mb-2">Learning with Simple Physics</h1>
          <p className="text-sm mb-4">
            This mini-site demonstrates two classroom-friendly physics models:
            a <strong>Catapult (Projectile Motion)</strong> and a
            <strong> Pendulum (Simple Harmonic Motion)</strong>. 
            Each module includes physics explanation, DIY build steps, and an interactive simulator.
          </p>

          <h2 className="text-sm font-semibold mt-4">Why This Helps Students</h2>
          <ul className="list-disc ml-5 text-sm mt-2 space-y-1">
            <li>Connects formulas to real motion</li>
            <li>Encourages experiment-based understanding</li>
            <li>Visualizes quadratic and periodic motion</li>
            <li>Fun and safe for classroom use</li>
          </ul>

          <div className="mt-6">
            <button onClick={() => setRoute('home')} className="px-3 py-2 bg-blue-600 text-white rounded-lg shadow">
              Home
            </button>
          </div>
        </aside>

        {/* Right main area */}
        <main className="md:col-span-3">
          {/* Module boxes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <ModuleBox title="Catapult (Projectile)" subtitle="Explore projectile motion" onClick={() => setRoute('catapult')} clickable />
            <ModuleBox title="Pendulum (Simple)" subtitle="Study periodic motion" onClick={() => setRoute('pendulum')} clickable />
            <ModuleBox title="More Coming Soon..." subtitle="New interactive models coming soon" clickable={false} />
          </div>

          {/* Page switching */}
          <div className="bg-white p-6 rounded-2xl shadow-md">
            {route === 'home' && <HomePage />}
            {route === 'catapult' && <CatapultModule />}
            {route === 'pendulum' && <PendulumModule />}
          </div>
        </main>
      </div>
    </div>
  )
}

/* ---------- Reusable small components ---------- */

function ModuleBox({ title, subtitle, onClick, clickable = true }) {
  return (
    <div
      className={`p-4 rounded-xl ${
        clickable
          ? 'bg-gradient-to-tr from-indigo-50 to-white border border-indigo-100 hover:shadow-lg cursor-pointer'
          : 'bg-gray-100 opacity-80'
      }`}
      onClick={clickable ? onClick : undefined}
    >
      <h3 className="font-semibold">{title}</h3>
      <p className="text-xs text-gray-600 mt-2">{subtitle}</p>
      {!clickable && <div className="mt-4 text-xs text-gray-500">(Not Clickable)</div>}
    </div>
  )
}

function HomePage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Welcome</h2>
      <p className="text-sm mb-4">
        Click the boxes above to open modules. Each module contains:
        (1) short physics explanation,
        (2) DIY building steps, and
        (3) an interactive simulator.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FeatureCard
          title="Measurement Scales"
          text="Each simulator includes units, adjustable angle, mass presets (1 N, 10 N, 100 N), and visual trajectory display."
        />
        <FeatureCard
          title="Learning by Doing"
          text="Students see how equations like y = x tanθ - (gx²)/(2u²cos²θ) become real-world motion."
        />
      </div>
    </div>
  )
}

function FeatureCard({ title, text }) {
  return (
    <div className="p-4 border rounded-lg bg-gray-50">
      <h4 className="font-semibold text-sm">{title}</h4>
      <p className="text-xs text-gray-600 mt-2">{text}</p>
    </div>
  )
}

/* ---------- Catapult Simulator ---------- */

function CatapultModule() {
  const [angle, setAngle] = useState(45)
  const [stretch, setStretch] = useState(0.05) // m
  const [weight, setWeight] = useState(1) // N
  const k = 20
  const g = 9.8
  const mass = weight / g
  const v = Math.sqrt((k * (stretch ** 2)) / mass)
  const range = (v ** 2 * Math.sin(2 * (angle * Math.PI / 180))) / g
  const height = (v ** 2 * Math.pow(Math.sin(angle * Math.PI / 180), 2)) / (2 * g)

  return (
    <div>
      <h2 className="text-xl font-bold mb-3">Catapult — Projectile Simulator (45° recommended)</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 p-3 border rounded-lg bg-gray-50">
          <h4 className="font-semibold text-sm mb-2">Trajectory Summary</h4>
          <p className="text-xs">Velocity: {v.toFixed(2)} m/s</p>
          <p className="text-xs">Range: {range.toFixed(2)} m</p>
          <p className="text-xs">Max Height: {height.toFixed(2)} m</p>
          <p className="text-xs">Weight: {weight} N</p>
          <p className="text-xs">Stretch: {(stretch * 100).toFixed(1)} cm</p>
        </div>

        <aside className="p-4 bg-white rounded-lg border">
          <h3 className="font-semibold mb-2">Controls</h3>
          <label className="block text-xs mt-2">Launch Angle: {angle}°</label>
          <input type="range" min="10" max="80" value={angle} onChange={e => setAngle(Number(e.target.value))} />

          <label className="block text-xs mt-3">Stretch Length: {(stretch * 100).toFixed(1)} cm</label>
          <input type="range" min="1" max="20" value={stretch * 100} onChange={e => setStretch(Number(e.target.value) / 100)} />

          <label className="block text-xs mt-3">Select Weight (N)</label>
          <select className="w-full text-sm" value={weight} onChange={e => setWeight(Number(e.target.value))}>
            <option value={1}>1 N (≈0.1 kg)</option>
            <option value={10}>10 N (≈1.0 kg)</option>
            <option value={100}>100 N (≈10.2 kg)</option>
          </select>

          <p className="text-xs mt-3 text-gray-600">Equations: v = √(kx²/m), R = u²sin2θ/g, y = x tanθ - (gx²)/(2u²cos²θ)</p>
        </aside>
      </div>

      <div className="mt-6 p-4 bg-white rounded-lg border">
        <h4 className="font-semibold">How to Make (DIY)</h4>
        <ol className="text-sm list-decimal ml-5 mt-2">
          <li>Glue popsicle sticks into a triangle base and lever arm.</li>
          <li>Attach a rubber band and spoon as the launcher cup.</li>
          <li>Pull back, measure the angle, and launch small objects.</li>
        </ol>
        <p className="text-sm mt-2">
          Video: <a href="#" className="text-indigo-600">(Add your YouTube link here)</a>
        </p>
      </div>
    </div>
  )
}

/* ---------- Pendulum Simulator ---------- */

function PendulumModule() {
  const [length, setLength] = useState(0.5)
  const [weight, setWeight] = useState(1)
  const g = 9.8
  const mass = weight / g
  const period = 2 * Math.PI * Math.sqrt(length / g)

  return (
    <div>
      <h2 className="text-xl font-bold mb-3">Simple Pendulum — Periodic Motion</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 border rounded bg-gray-50">
          <h4 className="font-semibold text-sm mb-2">Pendulum Simulation</h4>
          <p className="text-xs">Length: {length.toFixed(2)} m</p>
          <p className="text-xs">Mass ≈ {mass.toFixed(3)} kg</p>
          <p className="text-xs">Period (T): {period.toFixed(2)} s</p>
          <input type="range" min="0.1" max="2" step="0.01" value={length} onChange={e => setLength(Number(e.target.value))} />
        </div>

        <div className="p-4 border rounded bg-white">
          <h4 className="font-semibold mb-2">How to Make (DIY)</h4>
          <ol className="list-decimal ml-5 text-sm mt-2">
            <li>Attach a string and a small ball to a support.</li>
            <li>Measure its length and swing small angles.</li>
            <li>Use a stopwatch for 10 swings to find average period.</li>
          </ol>
          <p className="text-sm mt-2">
            Video: <a href="#" className="text-indigo-600">(Add your YouTube link)</a>
          </p>
        </div>
      </div>

      <div className="mt-4 p-3 bg-gray-50 border rounded">
        <strong>Formula:</strong>
        <p className="text-sm mt-1">T = 2π√(L/g)</p>
        <p className="text-xs text-gray-600">Independent of mass — shows simple harmonic motion.</p>
      </div>
    </div>
  )
}
