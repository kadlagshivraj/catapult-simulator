import React, { useState } from "react";

export default function App() {
  const [page, setPage] = useState("home");
  const [angle, setAngle] = useState(45);
  const [velocity, setVelocity] = useState(20);
  const [length, setLength] = useState(0.5);
  const g = 9.8;

  const renderPage = () => {
    if (page === "catapult") {
      const radians = (angle * Math.PI) / 180;
      const range = ((velocity ** 2) * Math.sin(2 * radians)) / g;
      return (
        <div className="card">
          <h2>🎯 Catapult — Projectile Motion</h2>
          <p>
            Study how angle and velocity affect projectile range using the equation:
            <br />
            <strong>R = (u² sin(2θ)) / g</strong>
          </p>

          <div className="controls">
            <label>
              Launch Angle (°): {angle}
              <input
                type="range"
                min="10"
                max="80"
                value={angle}
                onChange={(e) => setAngle(+e.target.value)}
              />
            </label>

            <label>
              Launch Speed (m/s): {velocity}
              <input
                type="range"
                min="5"
                max="30"
                value={velocity}
                onChange={(e) => setVelocity(+e.target.value)}
              />
            </label>
          </div>

          <p>
            🌍 Gravity (g): 9.8 m/s² <br />
            📏 Range = <strong>{range.toFixed(2)} m</strong>
          </p>

          <button onClick={() => setPage("home")} className="btn">
            ⬅ Back to Home
          </button>
        </div>
      );
    }

    if (page === "pendulum") {
      const period = 2 * Math.PI * Math.sqrt(length / g);
      return (
        <div className="card">
          <h2>🕹️ Simple Pendulum — Periodic Motion</h2>
          <p>
            Explore simple harmonic motion. The formula for period is:
            <br />
            <strong>T = 2π√(L/g)</strong>
          </p>

          <label>
            Length (m): {length}
            <input
              type="range"
              min="0.1"
              max="2"
              step="0.1"
              value={length}
              onChange={(e) => setLength(+e.target.value)}
            />
          </label>

          <p>
            🌍 Gravity (g): 9.8 m/s² <br />
            ⏱️ Period (T) = <strong>{period.toFixed(2)} s</strong>
          </p>

          <button onClick={() => setPage("home")} className="btn">
            ⬅ Back to Home
          </button>
        </div>
      );
    }

    return (
      <div className="home">
        <h1>Learning with Simple Physics</h1>
        <p>
          This interactive site demonstrates two physics models —{" "}
          <strong>Catapult (Projectile Motion)</strong> and{" "}
          <strong>Pendulum (Periodic Motion)</strong>. Click a module to explore!
        </p>

        <div className="box-container">
          <div className="box" onClick={() => setPage("catapult")}>
            <h3>🎯 Catapult</h3>
            <p>Projectile motion simulator</p>
          </div>

          <div className="box" onClick={() => setPage("pendulum")}>
            <h3>🕹️ Pendulum</h3>
            <p>Simple harmonic motion demo</p>
          </div>

          <div className="box disabled">
            <h3>🚀 Coming Soon...</h3>
            <p>More physics modules!</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="app">
      {renderPage()}

      <style>{`
        body {
          margin: 0;
          font-family: 'Segoe UI', sans-serif;
          background: #eef2f3;
          color: #222;
        }
        .app {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          padding: 1rem;
          text-align: center;
        }
        .card, .home {
          background: white;
          padding: 2rem;
          border-radius: 20px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          width: 90%;
          max-width: 600px;
        }
        .controls {
          margin: 1rem 0;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        input[type="range"] {
          width: 100%;
        }
        .btn {
          background: #4a90e2;
          color: white;
          padding: 0.6rem 1.2rem;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          margin-top: 1rem;
        }
        .btn:hover {
          background: #357abd;
        }
        .box-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 1rem;
          margin-top: 1.5rem;
        }
        .box {
          background: #f7f9fa;
          padding: 1rem;
          border-radius: 15px;
          box-shadow: 0 3px 10px rgba(0,0,0,0.1);
          cursor: pointer;
          transition: transform 0.2s ease;
        }
        .box:hover {
          transform: scale(1.05);
          background: #e7efff;
        }
        .box.disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}
