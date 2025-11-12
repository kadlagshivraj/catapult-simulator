import React, { useState, useRef, useEffect } from "react";

export default function App() {
  const [page, setPage] = useState("home");
  const [tab, setTab] = useState("simulation");

  return (
    <div className="app">
      {page === "home" && <Home setPage={setPage} />}
      {page === "catapult" && (
        <PhysicsPage
          title="🎯 Projectile Motion (Catapult)"
          setPage={setPage}
          content={<Catapult />}
          theory={<CatapultTheory />}
        />
      )}
      {page === "pendulum" && (
        <PhysicsPage
          title="🕹️ Simple Pendulum (Periodic Motion)"
          setPage={setPage}
          content={<Pendulum />}
          theory={<PendulumTheory />}
        />
      )}

      <style>{`
        body { margin:0; background:#eef2f3; font-family:'Segoe UI',sans-serif; color:#222;}
        .app { text-align:center; padding:2rem;}
        .home {
          background:white; border-radius:20px; padding:2rem;
          box-shadow:0 4px 15px rgba(0,0,0,0.1); max-width:800px; margin:auto;
        }
        .modules {display:grid; grid-template-columns:repeat(auto-fit,minmax(200px,1fr)); gap:1rem; margin-top:1.5rem;}
        .box {background:#f7f9fa; padding:1rem; border-radius:15px; box-shadow:0 3px 10px rgba(0,0,0,0.1); cursor:pointer; transition:.2s;}
        .box:hover {transform:scale(1.05); background:#e7efff;}
        canvas {background:#fff; border-radius:10px; box-shadow:0 2px 8px rgba(0,0,0,0.1);}
        .btn {background:#4a90e2; color:#fff; border:none; padding:0.5rem 1.2rem; border-radius:8px; cursor:pointer; margin:0.5rem;}
        .card {background:white; padding:1.5rem; border-radius:20px; box-shadow:0 4px 15px rgba(0,0,0,0.1); max-width:900px; margin:auto;}
        .tabs {display:flex; justify-content:center; gap:1rem; margin-bottom:1rem;}
        .tab {cursor:pointer; padding:0.5rem 1rem; border-radius:6px;}
        .tab.active {background:#4a90e2; color:white;}
        h1,h2,h3 {margin:0.5rem 0;}
      `}</style>
    </div>
  );
}

/* ---------- HOME PAGE ---------- */
function Home({ setPage }) {
  return (
    <div className="home">
      <h1>Learning with Simple Physics</h1>
      <p>
        Explore interactive simulations of <b>Projectile Motion</b> and{" "}
        <b>Simple Harmonic Motion</b>. Learn concepts, see motion, and get
        teaching ideas for classrooms.
      </p>
      <div className="modules">
        <div className="box" onClick={() => setPage("catapult")}>
          <h3>🎯 Catapult</h3>
          <p>Projectile motion simulation</p>
        </div>
        <div className="box" onClick={() => setPage("pendulum")}>
          <h3>🕹️ Pendulum</h3>
          <p>Periodic motion simulation</p>
        </div>
        <div className="box" style={{ opacity: 0.6 }}>
          <h3>🚀 Coming Soon...</h3>
          <p>More physics modules!</p>
        </div>
      </div>
    </div>
  );
}

/* ---------- GENERIC PHYSICS PAGE ---------- */
function PhysicsPage({ title, setPage, content, theory }) {
  const [tab, setTab] = useState("simulation");
  return (
    <div className="card">
      <h2>{title}</h2>
      <div className="tabs">
        <div
          className={`tab ${tab === "simulation" ? "active" : ""}`}
          onClick={() => setTab("simulation")}
        >
          Simulation
        </div>
        <div
          className={`tab ${tab === "theory" ? "active" : ""}`}
          onClick={() => setTab("theory")}
        >
          Theory & Teaching
        </div>
      </div>
      {tab === "simulation" ? content : theory}
      <button onClick={() => setPage("home")} className="btn">
        ⬅ Back to Home
      </button>
    </div>
  );
}

/* ---------- CATAPULT SIMULATION ---------- */
function Catapult() {
  const canvasRef = useRef(null);
  const [angle, setAngle] = useState(45);
  const [velocity, setVelocity] = useState(20);
  const [running, setRunning] = useState(false);
  const g = 9.8;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrame;
    let startTime = null;
    const rad = (angle * Math.PI) / 180;
    const scale = 5; // px per meter
    const maxTime = (2 * velocity * Math.sin(rad)) / g;

    function draw(t) {
      if (!startTime) startTime = t;
      const elapsed = (t - startTime) / 1000; // seconds
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // ground
      ctx.fillStyle = "#ccc";
      ctx.fillRect(0, canvas.height - 20, canvas.width, 20);
      if (elapsed <= maxTime) {
        const x = velocity * Math.cos(rad) * elapsed;
        const y = velocity * Math.sin(rad) * elapsed - 0.5 * g * elapsed ** 2;
        const px = x * scale;
        const py = canvas.height - 20 - y * scale;
        ctx.beginPath();
        ctx.arc(px, py, 10, 0, Math.PI * 2);
        ctx.fillStyle = "#4a90e2";
        ctx.fill();
        animationFrame = requestAnimationFrame(draw);
      }
    }

    if (running) {
      animationFrame = requestAnimationFrame(draw);
    }
    return () => cancelAnimationFrame(animationFrame);
  }, [running, angle, velocity]);

  return (
    <div>
      <canvas ref={canvasRef} width={600} height={300}></canvas>
      <div>
        <label>
          Angle: {angle}°
          <input
            type="range"
            min="10"
            max="80"
            value={angle}
            onChange={(e) => setAngle(+e.target.value)}
          />
        </label>
        <label>
          Velocity: {velocity} m/s
          <input
            type="range"
            min="5"
            max="30"
            value={velocity}
            onChange={(e) => setVelocity(+e.target.value)}
          />
        </label>
        <button className="btn" onClick={() => setRunning(true)}>
          ▶ Start
        </button>
        <button className="btn" onClick={() => setRunning(false)}>
          ⏹ Stop
        </button>
      </div>
    </div>
  );
}

/* ---------- CATAPULT THEORY ---------- */
function CatapultTheory() {
  return (
    <div style={{ textAlign: "left" }}>
      <h3>📘 What is Projectile Motion?</h3>
      <p>
        Projectile motion occurs when an object is launched into the air and
        moves under the influence of gravity. The path followed is a parabola.
      </p>
      <p>
        <b>Key Equations:</b>
        <br />
        Range R = (u² sin(2θ)) / g
        <br />
        Time of Flight T = (2u sinθ) / g
        <br />
        Maximum Height H = (u² sin²θ) / (2g)
      </p>

      <h4>🎯 Real-life Examples</h4>
      <ul>
        <li>Throwing a ball or javelin</li>
        <li>Launching an Angry Bird</li>
        <li>Water coming from a fountain</li>
      </ul>

      <h4>👨‍🏫 How Teachers Can Explain</h4>
      <ul>
        <li>
          Use this simulator to show how angle affects range — maximum at 45°.
        </li>
        <li>Let students predict where the projectile will land.</li>
        <li>Discuss energy conversion: potential ↔ kinetic.</li>
      </ul>
    </div>
  );
}

/* ---------- PENDULUM SIMULATION ---------- */
function Pendulum() {
  const canvasRef = useRef(null);
  const [length, setLength] = useState(0.8);
  const [running, setRunning] = useState(false);
  const g = 9.8;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrame;
    let startTime = null;
    const originX = canvas.width / 2;
    const originY = 40;
    const L = length * 200; // pixel scale
    const theta0 = 0.4; // initial angle (radians)

    function draw(t) {
      if (!startTime) startTime = t;
      const elapsed = (t - startTime) / 1000;
      const theta = theta0 * Math.cos(Math.sqrt(g / length) * elapsed);
      const bobX = originX + L * Math.sin(theta);
      const bobY = originY + L * Math.cos(theta);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      ctx.moveTo(originX, originY);
      ctx.lineTo(bobX, bobY);
      ctx.strokeStyle = "#555";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(bobX, bobY, 15, 0, Math.PI * 2);
      ctx.fillStyle = "#e67e22";
      ctx.fill();

      animationFrame = requestAnimationFrame(draw);
    }

    if (running) animationFrame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animationFrame);
  }, [running, length]);

  const period = (2 * Math.PI * Math.sqrt(length / g)).toFixed(2);

  return (
    <div>
      <canvas ref={canvasRef} width={500} height={400}></canvas>
      <div>
        <label>
          Length: {length} m
          <input
            type="range"
            min="0.2"
            max="2"
            step="0.1"
            value={length}
            onChange={(e) => setLength(+e.target.value)}
          />
        </label>
        <button className="btn" onClick={() => setRunning(true)}>
          ▶ Start
        </button>
        <button className="btn" onClick={() => setRunning(false)}>
          ⏹ Stop
        </button>
        <p>Period (T): {period}s</p>
      </div>
    </div>
  );
}

/* ---------- PENDULUM THEORY ---------- */
function PendulumTheory() {
  return (
    <div style={{ textAlign: "left" }}>
      <h3>📘 What is a Simple Pendulum?</h3>
      <p>
        A simple pendulum consists of a mass (bob) suspended from a fixed point
        so that it can swing freely. It exhibits periodic motion under gravity.
      </p>
      <p>
        <b>Key Equation:</b> T = 2π√(L/g)
      </p>
      <h4>🔍 Real-life Examples</h4>
      <ul>
        <li>Clock pendulums</li>
        <li>Playground swings</li>
        <li>Seismic vibration sensors</li>
      </ul>
      <h4>👨‍🏫 How Teachers Can Explain</h4>
      <ul>
        <li>Ask students to observe time for 10 oscillations.</li>
        <li>Show that the period is independent of bob mass.</li>
        <li>Relate amplitude vs frequency using this simulation.</li>
      </ul>
    </div>
  );
}
