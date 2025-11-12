import React, { useState } from "react";

/* ─────────────────────────────
   PHYSICS SIMULATOR – BASE LAYOUT
   ───────────────────────────── */
export default function App() {
  const [page, setPage] = useState("home");
  return (
    <div className="app">
      {page === "home" && <Home setPage={setPage} />}
      {page === "catapult" && <CatapultPage setPage={setPage} />}
      {page === "pendulum" && <PendulumPage setPage={setPage} />}

      <style>{`
        body {
          margin: 0;
          background: #eef2f3;
          font-family: "Segoe UI", sans-serif;
          color: #222;
        }
        .app {
          text-align: center;
          padding: 2rem;
        }
        .home {
          background: #fff;
          border-radius: 20px;
          padding: 2rem;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          max-width: 900px;
          margin: auto;
        }
        .modules {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
          margin-top: 2rem;
        }
        .box {
          background: #f7f9fa;
          padding: 1.2rem;
          border-radius: 15px;
          box-shadow: 0 3px 10px rgba(0,0,0,0.1);
          cursor: pointer;
          transition: 0.2s;
        }
        .box:hover {
          transform: scale(1.05);
          background: #e7efff;
        }
        .card {
          background: #fff;
          border-radius: 20px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          padding: 2rem;
          max-width: 950px;
          margin: auto;
        }
        .btn {
          background: #4a90e2;
          color: #fff;
          border: none;
          border-radius: 8px;
          padding: 0.6rem 1.2rem;
          margin: 0.4rem;
          cursor: pointer;
          font-weight: 600;
        }
        .btn:hover { background:#357abd; }
        h1,h2,h3 { margin: 0.5rem 0; }
      `}</style>
    </div>
  );
}

/* ─────────────────────────────
   HOME PAGE
   ───────────────────────────── */
function Home({ setPage }) {
  return (
    <div className="home">
      <h1>Learning with Simple Physics</h1>
      <p>
        Explore interactive simulations of <b>Projectile Motion</b> and{" "}
        <b>Simple Harmonic Motion</b>. Experiment, learn, and teach using
        real-time visuals and measurements.
      </p>
      <div className="modules">
        <div className="box" onClick={() => setPage("catapult")}>
          <h3>🎯 Catapult</h3>
          <p>Projectile motion simulator</p>
        </div>
        <div className="box" onClick={() => setPage("pendulum")}>
          <h3>🕹️ Pendulum</h3>
          <p>Periodic motion simulator</p>
        </div>
        <div className="box" style={{ opacity: 0.6 }}>
          <h3>🚀 Coming Soon…</h3>
          <p>More physics modules</p>
        </div>
      </div>
    </div>
  );
}

/*  Placeholder shells for next parts  */
function CatapultPage({ setPage }) {
  return (
    <div className="card">
      <h2>🎯 Catapult Simulator (loading…)</h2>
      <p>Next step will add the full simulation with grid, arrows & controls.</p>
      <button className="btn" onClick={() => setPage("home")}>⬅ Back</button>
    </div>
  );
}
function PendulumPage({ setPage }) {
  return (
    <div className="card">
      <h2>🕹️ Pendulum Simulator (loading…)</h2>
      <p>Next step will add the swinging motion & theory text.</p>
      <button className="btn" onClick={() => setPage("home")}>⬅ Back</button>
    </div>
  );
}
/* ─────────────────────────────
   CATAPULT SIMULATION – PHET STYLE
   ───────────────────────────── */
import { useRef, useEffect, useState } from "react";

function CatapultPage({ setPage }) {
  const canvasRef = useRef(null);
  const [angle, setAngle] = useState(45);
  const [velocity, setVelocity] = useState(20);
  const [running, setRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [range, setRange] = useState(0);
  const g = 9.8;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const scale = 5; // 1 m = 5 px
    let frame, start = null;
    const rad = (angle * Math.PI) / 180;
    const totalTime = (2 * velocity * Math.sin(rad)) / g;
    const totalRange = ((velocity ** 2) * Math.sin(2 * rad)) / g;
    setRange(totalRange.toFixed(2));

    function draw(t) {
      if (!start) start = t;
      const elapsed = (t - start) / 1000;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Grid
      ctx.strokeStyle = "#ddd";
      for (let x = 0; x < canvas.width; x += 50) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 50) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Ground axis
      ctx.fillStyle = "#999";
      ctx.fillRect(0, canvas.height - 20, canvas.width, 3);

      // Protractor arc
      ctx.beginPath();
      ctx.arc(80, canvas.height - 20, 60, Math.PI, Math.PI + (angle * Math.PI) / 180);
      ctx.strokeStyle = "#4a90e2";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Launch parameters
      if (running && elapsed <= totalTime) {
        const x = velocity * Math.cos(rad) * elapsed;
        const y = velocity * Math.sin(rad) * elapsed - 0.5 * g * elapsed ** 2;
        const px = x * scale + 80;
        const py = canvas.height - 20 - y * scale;

        // Projectile
        ctx.beginPath();
        ctx.arc(px, py, 8, 0, Math.PI * 2);
        ctx.fillStyle = "#4a90e2";
        ctx.fill();

        // Velocity arrow
        const vx = velocity * Math.cos(rad);
        const vy = velocity * Math.sin(rad) - g * elapsed;
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(px + vx * 2, py - vy * 2);
        ctx.strokeStyle = "#e67e22";
        ctx.lineWidth = 2;
        ctx.stroke();

        setTime(elapsed.toFixed(2));
        frame = requestAnimationFrame(draw);
      } else if (running) {
        setRunning(false);
      }
    }

    if (running) frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, [running, angle, velocity]);

  return (
    <div className="card">
      <h2>🎯 Catapult – Projectile Motion</h2>
      <canvas ref={canvasRef} width={700} height={350}></canvas>

      <div>
        <label>
          Angle (°): {angle}
          <input type="range" min="10" max="80" value={angle}
            onChange={(e) => setAngle(+e.target.value)} />
        </label>
        <label>
          Velocity (m/s): {velocity}
          <input type="range" min="5" max="40" value={velocity}
            onChange={(e) => setVelocity(+e.target.value)} />
        </label>
      </div>

      <div style={{ margin: "0.5rem", background: "#f7f9fa", borderRadius: "10px", padding: "0.6rem" }}>
        ⏱ Time: {time}s 📏 Range: {range} m
      </div>

      <div>
        <button className="btn" onClick={() => setRunning(true)}>▶ Play</button>
        <button className="btn" onClick={() => setRunning(false)}>⏸ Pause</button>
        <button className="btn" onClick={() => { setRunning(false); setTime(0); }}>🔄 Reset</button>
        <button className="btn" onClick={() => setPage("home")}>⬅ Back</button>
      </div>
    </div>
  );
}
/* ─────────────────────────────
   PENDULUM SIMULATION – PHET STYLE
   ───────────────────────────── */
import { useRef, useEffect, useState } from "react";

function PendulumPage({ setPage }) {
  const canvasRef = useRef(null);
  const [length, setLength] = useState(1);
  const [running, setRunning] = useState(false);
  const [time, setTime] = useState(0);
  const g = 9.8;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const originX = canvas.width / 2;
    const originY = 60;
    const L = length * 200; // pixels per meter
    const theta0 = 0.5; // initial angle (radians)
    let animationFrame, start = null;

    function draw(t) {
      if (!start) start = t;
      const elapsed = (t - start) / 1000;
      const theta = theta0 * Math.cos(Math.sqrt(g / length) * elapsed);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Grid
      ctx.strokeStyle = "#ddd";
      for (let x = 0; x < canvas.width; x += 50) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 50) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Scale ruler
      ctx.strokeStyle = "#aaa";
      for (let i = 0; i < L; i += 50) {
        ctx.beginPath();
        ctx.moveTo(originX + 220, originY + i);
        ctx.lineTo(originX + 230, originY + i);
        ctx.stroke();
      }

      // Pendulum string
      const bobX = originX + L * Math.sin(theta);
      const bobY = originY + L * Math.cos(theta);
      ctx.beginPath();
      ctx.moveTo(originX, originY);
      ctx.lineTo(bobX, bobY);
      ctx.strokeStyle = "#444";
      ctx.lineWidth = 3;
      ctx.stroke();

      // Pendulum bob
      ctx.beginPath();
      ctx.arc(bobX, bobY, 15, 0, Math.PI * 2);
      ctx.fillStyle = "#e67e22";
      ctx.fill();

      // Length indicator
      ctx.fillStyle = "#222";
      ctx.font = "14px Segoe UI";
      ctx.fillText(`${length.toFixed(1)} m`, originX + 240, originY + L / 2);

      // Timer
      if (running) {
        setTime(elapsed.toFixed(2));
        animationFrame = requestAnimationFrame(draw);
      }
    }

    if (running) animationFrame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animationFrame);
  }, [running, length]);

  const T = (2 * Math.PI * Math.sqrt(length / g)).toFixed(2);

  return (
    <div className="card">
      <h2>🕹️ Pendulum – Periodic Motion</h2>
      <canvas ref={canvasRef} width={700} height={400}></canvas>

      <div>
        <label>
          Length (m): {length}
          <input
            type="range"
            min="0.3"
            max="2"
            step="0.1"
            value={length}
            onChange={(e) => setLength(+e.target.value)}
          />
        </label>
      </div>

      <div
        style={{
          margin: "0.5rem",
          background: "#f7f9fa",
          borderRadius: "10px",
          padding: "0.6rem",
        }}
      >
        ⏱ Time: {time}s 📏 Period (T): {T}s
      </div>

      <div>
        <button className="btn" onClick={() => setRunning(true)}>▶ Play</button>
        <button className="btn" onClick={() => setRunning(false)}>⏸ Pause</button>
        <button className="btn" onClick={() => { setRunning(false); setTime(0); }}>🔄 Reset</button>
        <button className="btn" onClick={() => setPage("home")}>⬅ Back</button>
      </div>

      <PendulumTheory />
    </div>
  );
}

/* ─────────────────────────────
   PENDULUM THEORY + TEACHING
   ───────────────────────────── */
function PendulumTheory() {
  return (
    <div style={{ textAlign: "left", marginTop: "1.5rem" }}>
      <h3>📘 What is a Simple Pendulum?</h3>
      <p>
        A <b>simple pendulum</b> is a small mass (bob) suspended from a light, inextensible string that can swing freely under gravity.
        It demonstrates <b>periodic motion</b>, where the motion repeats at regular intervals.
      </p>

      <h4>⚙️ Formula:</h4>
      <p>
        The time period (T) of one complete oscillation is given by:  
        <b>T = 2π√(L / g)</b>
      </p>

      <h4>🎯 Observations:</h4>
      <ul>
        <li>The period increases as the length increases.</li>
        <li>It is independent of the mass of the bob.</li>
        <li>It slightly increases with larger swing angles.</li>
      </ul>

      <h4>🌍 Real-Life Examples:</h4>
      <ul>
        <li>Clock pendulums (used to keep time accurately)</li>
        <li>Swings in playgrounds</li>
        <li>Seismic sensors measuring Earth’s vibrations</li>
      </ul>

      <h3>👨‍🏫 Teaching Ideas (Fun Classroom Activities)</h3>
      <ul>
        <li>
          ⏱ Ask students to time 10 oscillations using a stopwatch — divide by 10 to get the average period.
        </li>
        <li>
          📏 Let students change the length and note how the time period changes.
        </li>
        <li>
          ⚡ Discuss how Galileo discovered the pendulum’s property by observing swinging lamps.
        </li>
        <li>
          🎨 Have them draw the motion path and mark amplitude and mean position.
        </li>
      </ul>

      <h4>💡 Teacher Tip:</h4>
      <p>
        Encourage students to compare experimental values with the simulator’s readings.
        They’ll notice how close real-life motion is to theoretical prediction — this builds curiosity and accuracy.
      </p>
    </div>
  );
}

