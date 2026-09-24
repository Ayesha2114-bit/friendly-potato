/* Beyond Say No - interactive site controller */
(() => {
  "use strict";

  const app = document.getElementById("app-container");
  const progress = document.getElementById("progressContainer");
  const progressLabel = document.getElementById("progressLabel");
  const progressBar = document.getElementById("progressBar");
  const homeButton = document.getElementById("headerHomeButton");
  const brandButton = document.getElementById("brandButton");
  const postTestUrl = "https://forms.gle/UrUhDG1w2tUvPyBVA";

  if (!app) return;

  const esc = (value) => String(value).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  }[c]));

  const button = (label, action, type = "primary") =>
    `<button type="button" class="button button-${type}" data-action="${esc(action)}">${esc(label)}</button>`;

  const screen = (content) => `<section class="screen">${content}</section>`;

  const setProgress = (step = 0) => {
    const active = step > 0;
    progress.hidden = !active;
    homeButton.hidden = !active;
    if (active) {
      progressLabel.textContent = `${String(step).padStart(2, "0")} / 09`;
      progressBar.style.width = `${(step / 9) * 100}%`;
    }
  };

  const render = (content, step = 0) => {
    app.innerHTML = screen(content);
    setProgress(step);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const choicePage = (step, eyebrow, title, text, choices, next) => {
    render(`
      <span class="eyebrow">${esc(eyebrow)}</span>
      <h2>${esc(title)}</h2>
      <p class="lead">${esc(text)}</p>
      <div class="card">
        <div class="choice-list">
          ${choices.map((item) => `<button type="button" class="choice-button" data-choice-next="${esc(next)}">${esc(item)}</button>`).join("")}
        </div>
        <div id="feedback" aria-live="polite"></div>
      </div>
    `, step);
  };

  function home() {
    render(`
      <div class="hero">
        <div class="hero-copy">
          <span class="eyebrow">Interactive visual intervention</span>
          <h1>BEYOND<br>SAY NO</h1>
          <p class="lead">Sometimes the risk isn't obvious.</p>
          <p class="muted hero-description">Learn to spot risky situations, question misinformation, respond to pressure, and know what to do next.</p>
          <div class="actions hero-actions">
            ${button("EXPLORE THE CHALLENGE →", "scenario1")}
            ${button("I NEED SUPPORT →", "support", "secondary")}
            ${button("I'M WORRIED ABOUT SOMEONE →", "worried", "secondary")}
          </div>
        </div>
        <div class="hero-visual"><div class="character-group"><div class="character character-peer"><div class="character-head"></div><div class="character-body"></div></div><div class="character [..