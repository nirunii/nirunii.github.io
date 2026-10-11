import { useState, useEffect, useRef } from "react";
import { GH, LI, EMAIL, CV, PROJECTS, SKILLS, PHOTOS, TECH, NOTES } from "./data";


const REDUCE = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
function Typer() {
  const W = ["React", "Node.js", "PostgreSQL", "Postman"];
  const [t, setT] = useState("");
  useEffect(() => {
    if (REDUCE()) { setT("React, Node.js and PostgreSQL"); return; }
    let w = 0, c = 0, del = false, id;
    const tick = () => {
      const word = W[w]; c += del ? -1 : 1; setT(word.slice(0, c));
      let d = del ? 40 : 80;
      if (!del && c === word.length) { del = true; d = 1400; }
      else if (del && c === 0) { del = false; w = (w + 1) % W.length; d = 300; }
      id = setTimeout(tick, d);
    };
    id = setTimeout(tick, 600);
    return () => clearTimeout(id);
  }, []);
  return <p className="type" aria-label="Working with React, Node.js, PostgreSQL, Supabase and Postman">Working with <b aria-hidden="true">{t}</b><span className="caret" aria-hidden="true"></span></p>;
}

function PhotoSlider() {
  const slides = PHOTOS.length ? PHOTOS : [1, 2, 3].map(n => ({ ph: n }));
  const [i, setI] = useState(0);
  const go = d => setI(x => (x + d + slides.length) % slides.length);
  const [pause, setPause] = useState(false);
  useEffect(() => {
    if (pause || slides.length < 2 || REDUCE()) return;
    const id = setInterval(() => go(1), 4000);
    return () => clearInterval(id);
  }, [pause, slides.length]);
  const s = slides[i];
  const chev = d => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={d} /></svg>;
  return (
    <div className="photo">
      <div className="frame" onMouseEnter={() => setPause(true)} onMouseLeave={() => setPause(false)} onFocus={() => setPause(true)} onBlur={() => setPause(false)} role="group" aria-roledescription="carousel" aria-label="Photos of Niruni">
        {s.src ? <img key={i} className="fd" src={s.src} alt={s.alt} /> : <div key={i} className="ph fd"><b></b><span>Your photo {s.ph} goes here</span></div>}
        <button className="nv l" onClick={() => go(-1)} aria-label="Previous photo">{chev("M15 5l-7 7 7 7")}</button>
        <button className="nv r" onClick={() => go(1)} aria-label="Next photo">{chev("M9 5l7 7-7 7")}</button>
      </div>
      <div className="dots">{slides.map((_, j) => <button key={j} className={j === i ? "on" : ""} onClick={() => setI(j)} aria-label={"Show photo " + (j + 1)} aria-current={j === i}></button>)}</div>
      <p className="cap"><strong>Niruni Prabhasha</strong><br />Software Technology undergraduate, Ja-Ela</p>
    </div>
  );
}

function Count({ to }) {
  const ref = useRef(null);
  const [n, setN] = useState(REDUCE() ? to : 0);
  useEffect(() => {
    if (REDUCE()) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect(); let k = 0;
      const id = setInterval(() => { k++; setN(Math.round(to * k / 30)); if (k >= 30) clearInterval(id); }, 35);
    });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return <span ref={ref} style={{ display: "inline" }}>{n}</span>;
}
function Code() {
  return (
    <div className="code" aria-hidden="true">
      <div className="cd"><i></i><i></i><i></i></div>
      <pre><span className="k">const</span> niruni = {"{"}{"\n"}  role: <span className="s">"Full-stack developer"</span>,{"\n"}  stack: [<span className="s">"React"</span>, <span className="s">"Node.js"</span>],{"\n"}  learning: <span className="k">true</span>,{"\n"}{"}"};</pre>
    </div>
  );
}
function Mock({ i, label, img }) {
  if (img) return <div className="mk"><img className="shot" src={img} alt={label + " screenshot"} /></div>;
  return (
    <div className={"mk mk" + i} role="img" aria-label={label + " interface sketch"}>
      {i === 0 && <div className="ui"><b>Today</b>{[1, 0, 0].map((on, k) => <div className="row" key={k}><span className={"cb" + (on ? " on" : "")}></span><span className="ln" style={{ maxWidth: [140, 100, 120][k] }}></span></div>)}</div>}
      {i === 1 && <><span className="cart">Cart 2</span><div className="ui"><div className="tiles">{["Serum", "Cleanser"].map(n => <div className="tile" key={n}><i></i><span>{n}</span><em className="price">Add</em></div>)}</div></div></>}
      {i === 2 && <div className="ui"><div className="cd2"><i></i><i></i><i></i></div><span className="ln" style={{ height: 14, margin: "6px 0", maxWidth: "70%" }}></span><span className="ln"></span><span className="ln" style={{ margin: "10px 0 0", height: 52, borderRadius: 10, background: "#F6C1D6" }}></span></div>}
    </div>
  );
}

function Notes() {
  const [sel, setSel] = useState(0);
  const mins = x => Math.max(1, Math.round(x.body.join(" ").split(/\s+/).length / 150));
  const n = NOTES[sel] || NOTES[0];
  return (
    <section id="notes">
      <h2 className="sec rv">Notes</h2>
      <p className="lede">Short write-ups of what I've learned while building my projects.</p>
      <div className="nwrap rv">
        <div className="nlist">
          {NOTES.map((x, i) => (
            <button key={x.t} className={"ncard" + (sel === i ? " on" : "")} aria-pressed={sel === i} onClick={() => setSel(i)}>
              <span className="meta">{x.date}, {mins(x)} min read</span>
              <strong>{x.t}</strong>
              <span className="sum">{x.sum}</span>
              <span className="chips2">{x.tags.join(", ")}</span>
            </button>
          ))}
        </div>
        <article className="nread" aria-live="polite">
          <div className="meta">{n.date}, {mins(n)} min read</div>
          <h3>{n.t}</h3>
          <ul className="chips">{n.tags.map(t => <li key={t}>{t}</li>)}</ul>
          {n.body.map(x => <p key={x}>{x}</p>)}
        </article>
      </div>
    </section>
  );
}

function ThemeIcon({ dark }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {dark ? <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></> : <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />}
    </svg>
  );
}

function App() {
  const [theme, setTheme] = useState(() => { try { return localStorage.getItem("theme"); } catch (e) { return null; } });
  useEffect(() => {
    const r = document.documentElement;
    if (theme) r.setAttribute("data-theme", theme); else r.removeAttribute("data-theme");
  }, [theme]);
  const dark = theme ? theme === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
  const flip = () => { const t = dark ? "light" : "dark"; setTheme(t); try { localStorage.setItem("theme", t); } catch (e) {} };
  useEffect(() => {
    const bar = document.querySelector(".prog");
    const onS = () => { const h = document.documentElement; bar.style.width = (h.scrollTop / ((h.scrollHeight - h.clientHeight) || 1)) * 100 + "%"; };
    window.addEventListener("scroll", onS, { passive: true }); onS();
    let io;
    if (!REDUCE() && "IntersectionObserver" in window) {
      document.body.classList.add("anim");
      io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: 0.15 });
      document.querySelectorAll(".rv").forEach(el => io.observe(el));
    }
    return () => { window.removeEventListener("scroll", onS); io && io.disconnect(); };
  }, []);
  return (
    <>
      <header>
        <div className="wrap">
          <nav aria-label="Main">
            <b>Niruni Prabhasha</b>
            <ul>
              <li><a href="#projects">Projects</a></li>
              <li><a href="#notes">Notes</a></li>
              <li><a href="#experience">Experience</a></li>
              <li><a href="#skills">Skills</a></li>
              <li><a href="#contact">Contact</a></li>
              <li><button className="tg" onClick={flip} aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}><ThemeIcon dark={dark} /></button></li>
            </ul>
          </nav>
        </div>
        <div className="prog"></div>
      </header>
      <main className="wrap">
        <div className="hero">
          <div className="blob" aria-hidden="true" style={{ width: 160, height: 160, background: "var(--rose)", opacity: .5, right: "-4%", top: "50%" }}></div>
          <div className="blob" aria-hidden="true" style={{ width: 90, height: 90, background: "var(--lilac)", left: "38%", bottom: "-30px", animationDelay: "-3s" }}></div>
          <div>
            <h1>Hi, I'm Niruni. I design and build full-stack web apps.</h1>
            <Typer />
            <p>I'm a Software Technology undergraduate at the University of Vocational Technology. I work with React, Node.js and PostgreSQL, and I enjoy turning ideas into clean, reliable software that is easy to use.</p>
            <div className="btns">
              <a className="btn fill" href="#contact">Get in touch</a>
              {CV && <a className="btn line" href={CV} download>Download CV</a>}
              <a className="btn line" href={GH} target="_blank" rel="noopener noreferrer">See my GitHub</a>
            </div>
          </div>
          <div className="stack"><PhotoSlider /><Code /></div>
        </div>

        <div className="marq" aria-hidden="true"><div className="track">{[...TECH, ...TECH, ...TECH, ...TECH].map((t, i) => <span key={i}>{t}</span>)}</div></div>
        <div className="stats">{[[3, "full-stack projects built"], [15, "tools and technologies"], [1, "QA testing role"]].map(([n, l]) => <div className="stat rv" key={l}><b><Count to={n} /></b><span>{l}</span></div>)}</div>

        <section id="projects">
          <h2 className="sec rv">Projects</h2>
          {PROJECTS.map((p, i) => (
            <article className="proj rv" key={p.t}>
              <Mock i={i} label={p.t} img={p.img} />
              <div>
                <h3>{p.t}</h3>
                <div className="kind">{p.kind}</div>
                <ul className="chips">{p.stack.map(s => <li key={s}>{s}</li>)}</ul>
                <ul className="pts">{p.pts.map(x => <li key={x}>{x}</li>)}</ul>
                <div className="plinks"><a href={p.repo || GH} target="_blank" rel="noopener noreferrer">{p.repo ? "View code on GitHub" : "See my work on GitHub"}</a>{p.live && <a href={p.live} target="_blank" rel="noopener noreferrer">Live demo</a>}</div>
              </div>
            </article>
          ))}
        </section>

        <Notes />

        <section id="experience">
          <h2 className="sec rv">Experience and education</h2>
          <div className="two">
            <div>
              <div className="item rv">
                <h3>Quality Assurance Tester</h3>
                <p className="when">University website development project, University of Vocational Technology</p>
                <p>I tested website features and interfaces to find bugs, worked with developers to track defects and confirm fixes, and helped improve how the site works and feels.</p>
              </div>
            </div>
            <div>
              <div className="item rv">
                <h3>B Tech (Hons) in Software Technology</h3>
                <p className="when">University of Vocational Technology, June 2024 to present</p>
                <p>Studying programming, web development, databases and software testing.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="skills">
          <h2 className="sec rv">Skills</h2>
          <div className="skg">
            {SKILLS.map(([g, list]) => (
              <div className="skc rv" key={g}>
                <h3>{g}</h3>
                <ul className="chips">{list.map(x => <li key={x}>{x}</li>)}</ul>
              </div>
            ))}
          </div>
          <div className="skg soft2">
            <div className="skc rv lil"><h3>Soft skills</h3><p>Problem-solving, teamwork, clear communication, time management, adaptability, analytical thinking.</p></div>
            <div className="skc rv lil"><h3>Languages</h3><p>Sinhala (native), English (fluent).</p></div>
          </div>
        </section>

        <section id="contact" style={{ paddingTop: 0 }}>
          <div className="contact rv">
            <h2>Let's work together.</h2>
            <p>I'm based in Ja-Ela, Sri Lanka, and I speak Sinhala and English. Email is the fastest way to reach me.</p>
            <div className="btns">
              <a className="btn fill" href={"mailto:" + EMAIL}>Email me</a>
              {CV && <a className="btn line" href={CV} download>Download CV</a>}
              <a className="btn line" href={LI} target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a className="btn line" href={GH} target="_blank" rel="noopener noreferrer">GitHub</a>
            </div>
          </div>
        </section>
      </main>
      <footer className="wrap">© 2026 J.M.U. Niruni Prabhasha</footer>
    </>
  );
}

export default App;
