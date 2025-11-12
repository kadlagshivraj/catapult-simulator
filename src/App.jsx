import { useState, useRef, useEffect } from "react";

export default function App() {
  const [page, setPage] = useState("home");

  return (
    <div style={{ fontFamily: "Segoe UI, sans-serif", padding: "1rem", textAlign: "center" }}>
      {page === "home" && <Home setPage={setPage} />}
      {page === "catapult" && <CatapultPage setPage={setPage} />}
      {page === "pendulum" && <PendulumPage setPage={setPage} />}
    </div>
  );
}

/* ---------------- HOME PAGE ---------------- */
function Home({ setPage }) {
  return (
    <div>
      <h1>Learning with Simple Physics</h1>
      <p>
        Explore interactive simulations of <b>Projectile Motion</b> and <b>Simple Harmonic Motion</b>.
        Learn concepts, test motion, and get teaching tips for classrooms.
      </p>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
          flexWrap: "wrap",
          marginTop: "2rem",
        }}
      >
        <div className="card" onClick={() => setPage("catapult")}>
          <h3>🏹 Catapult</h3>
          <p>Projectile motion simulator</p>
        </div>
        <div className="card" onClick={() => setPage("pendulum")}>
          <h3>🎯 Pendulum</h3>
          <p>Periodic motion simulator</p>
        </div>
        <div className="card" style={{ opacity: 0.6 }}>
          <h3>🔜 Coming Soon...</h3>
          <p>More physics modules!</p>
        </div>
      </div>

      <style>{`
        .card {
          background: #fff;
          border-radius: 12px;
          padding: 1rem;
          width: 200px;
          cursor: pointer;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
          transition: transform 0.2s;
        }
        .card:hover { transform: scale(1.05); background:#f9f9f9; }
      `}</style>
    </div>
  );
}

/* ---------------- CATAPULT SIMULATION ---------------- */
function CatapultPage({ setPage }) {
  const canvasRef = useRef(null);
  const [angle, setAngle] = useState(45);
  const [velocity, setVelocity] = useState(20);
  const [running, setRunning] = useState(false);
  const [time, setTime] = useState(0);
  const g = 9.8;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const originY = canvas.height - 50;
    const originX = 80;

    let animationFrame, start = null;
    const rad = (angle * Math.PI) / 180;
    const vX = velocity * Math.cos(rad);
    const vY = velocity * Math.sin(rad);

    function draw(t) {
      if (!start) start = t;
      const elapsed = (t - start) / 1000;
      const x = vX * elapsed;
      const y = vY * elapsed - 0.5 * g * elapsed ** 2;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#eef";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Grid
      ctx.strokeStyle = "#ddd";
      for (let i = 0; i < canvas.width; i += 50) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
      }
      for (let i = 0; i < canvas.height; i += 50) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
      }

      // Ground
      ctx.strokeStyle = "#444";
      ctx.beginPath();
      ctx.moveTo(0, originY);
      ctx.lineTo(canvas.width, originY);
      ctx.stroke();

      // Projectile
      const posY = originY - y * 10;
      const posX = originX + x * 10;
      ctx.beginPath();
      ctx.arc(posX, posY, 8, 0, 2 * Math.PI);
      ctx.fillStyle = "#e74c3c";
      ctx.fill();

      setTime(elapsed.toFixed(2));
      if (posY > originY) {
        cancelAnimationFrame(animationFrame);
        return;
      }
      if (running) animationFrame = requestAnimationFrame(draw);
    }

    if (running) animationFrame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animationFrame);
  }, [angle, velocity, running]);

  const range = ((velocity ** 2 * Math.sin(2 * (angle * Math.PI / 180))) / g).toFixed(2);

  return (
    <div className="card">
      <h2>🏹 Catapult – Projectile Motion</h2>
      <canvas ref={canvasRef} width={700} height={400}></canvas>
      <p>🎯 Range: {range} m | ⏱ Time: {time}s</p>

      <label>Angle: {angle}°</label>
      <input type="range" min="10" max="80" value={angle} onChange={(e) => setAngle(+e.target.value)} />
      <label>Velocity: {velocity} m/s</label>
      <input type="range" min="5" max="50" value={velocity} onChange={(e) => setVelocity(+e.target.value)} />

      <div>
        <button className="btn" onClick={() => setRunning(true)}>▶ Launch</button>
        <button className="btn" onClick={() => setRunning(false)}>⏸ Pause</button>
        <button className="btn" onClick={() => { setRunning(false); setTime(0); }}>🔄 Reset</button>
        <button className="btn" onClick={() => setPage("home")}>⬅ Back</button>
      </div>

      <CatapultTheory />

      <style>{`
        .btn { margin: 5px; padding: 8px 12px; border:none; border-radius:6px; background:#2ecc71; color:white; cursor:pointer; }
        .btn:hover { background:#27ae60; }
      `}</style>
    </div>
  );
}

/* ---------------- CATAPULT THEORY ---------------- */
function CatapultTheory() {
  return (
    <div style={{ textAlign: "left", marginTop: "1.5rem" }}>
      <h3>📘 What is Projectile Motion?</h3>
      <p>
        Projectile motion occurs when an object is thrown and moves under the influence of gravity.
        The path followed is a **parabola**, combining horizontal and vertical motions.
      </p>
      <h4>⚙️ Formulae:</h4>
      <ul>
        <li>Range: R = (u² sin(2θ)) / g</li>
        <li>Maximum Height: H = (u² sin²θ) / (2g)</li>
        <li>Time of Flight: T = (2u sinθ) / g</li>
      </ul>
      <h4>🎯 Real-Life Examples:</h4>
      <ul>
        <li>Catapult launches</li>
        <li>Throwing a basketball</li>
        <li>Firing a cannon</li>
      </ul>
      <h4>👨‍🏫 Teaching Ideas:</h4>
      <ul>
        <li>Have students predict range at different angles and compare with the simulator.</li>
        <li>Draw trajectory and mark height, time, and range on graph paper.</li>
      </ul>
    </div>
  );
}

/* ---------------- PENDULUM SIMULATION ---------------- */
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
    const L = length * 200;
    const theta0 = 0.5;
    let animationFrame, start = null;

    function draw(t) {
      if (!start) start = t;
      const elapsed = (t - start) / 1000;
      const theta = theta0 * Math.cos(Math.sqrt(g / length) * elapsed);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = "#eee";
      for (let x = 0; x < canvas.width; x += 50) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      const bobX = originX + L * Math.sin(theta);
      const bobY = originY + L * Math.cos(theta);

      ctx.beginPath();
      ctx.moveTo(originX, originY);
      ctx.lineTo(bobX, bobY);
      ctx.strokeStyle = "#444";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(bobX, bobY, 15, 0, Math.PI * 2);
      ctx.fillStyle = "#f39c12";
      ctx.fill();

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
      <h2>🎯 Pendulum – Periodic Motion</h2>
      <canvas ref={canvasRef} width={700} height={400}></canvas>
      <p>⏱ Time: {time}s | 📏 Period (T): {T}s</p>
      <label>Length (m): {length}</label>
      <input type="range" min="0.3" max="2" step="0.1" value={length} onChange={(e) => setLength(+e.target.value)} />
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

/* ---------------- PENDULUM THEORY ---------------- */
function PendulumTheory() {
  return (
    <div style={{ textAlign: "left", marginTop: "1.5rem" }}>
      <h3>📘 What is a Simple Pendulum?</h3>
      <p>
        A small mass (bob) on a light string that swings freely under gravity shows **periodic motion**.
        Its period depends only on its length and gravity.
      </p>
      <h4>⚙️ Formula:</h4>
      <p>T = 2π√(L / g)</p>
      <h4>🌍 Examples:</h4>
      <ul>
        <li>Clock pendulums</li>
        <li>Playground swings</li>
        <li>Seismographs</li>
      </ul>
      <h4>👨‍🏫 Teaching Ideas:</h4>
      <ul>
        <li>Measure time for 10 oscillations and find average period.</li>
        <li>Compare different lengths to see how T changes.</li>
        <li>Discuss Galileo’s discovery of isochronous motion.</li>
      </ul>
    </div>
  );
}

