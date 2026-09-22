/* Beyond Say No - interactive site controller */
(() => {
  "use strict";

  const app = document.getElementById("app-container");
  const progress = document.getElementById("progressContainer");
  const progressLabel = document.getElementById("progressLabel");
  const progressBar = document.getElementById("progressBar");
  const homeButton = document.getElementById("headerHomeButton");
  const brandButton = document.getElementById("brandButton");
  const postTestUrl = "https://forms.gle/DSPjpxLNj4CAroTG9";

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
        <div class="hero-visual"><div class="character-group"><div class="character character-peer"><div class="character-head"></div><div class="character-body"></div></div><div class="character character-person"><div class="character-head"></div><div class="character-body"></div></div><div class="character character-helper"><div class="character-head"></div><div class="character-body"></div></div></div></div>
      </div>
    `);
  }

  function scenario1() { choicePage(1, "01 • First scene", "Something feels off.", "Choose the response that best identifies the situation.", ["Stress is involved.", "Someone is normalizing the behaviour.", "A substance is being presented as an easy solution.", "All of these."], "redFlags"); }
  function redFlags() { choicePage(2, "02 • Risk recognition", "Spot the red flags.", "Using substances to cope, minimizing risk, and popularity are all reasons to pause.", ["Using something whenever stressed.", "Saying it is not dangerous.", "Saying everyone does it.", "All of these."], "mythCheck"); }
  function mythCheck() { choicePage(3, "03 • Misinformation", "Wait. Is that actually true?", "Popularity and confidence are not evidence of safety.", ["Occasional use is always safe.", "Everyone doing something does not prove it is safe.", "Using substances to cope with stress can become risky."], "peerPressure"); }
  function peerPressure() { choicePage(4, "04 • Peer pressure", "The group chat.", "You are allowed to step away from pressure.", ["Go along with them.", "Say no and leave the situation.", "Suggest something else or change the situation."], "misinformation"); }
  function misinformation() { choicePage(5, "05 • Critical thinking", "The misinformation trap.", "A confident message is not automatically a reliable one.", ["It presents a substance as a solution.", "No reliable evidence is provided.", "All of these."], "someoneNeedsHelp"); }
  function someoneNeedsHelp() { choicePage(6, "06 • Asking for help", "Someone wants help.", "A person does not have to wait until everything gets worse.", ["Keep it secret.", "Talk to someone trustworthy.", "Seek professional help."], "helpingFriend"); }
  function helpingFriend() { choicePage(7, "07 • Supporting someone", "Your friend tells you.", "Support starts with listening without shame.", ["Just stop.", "Keep it secret.", "Let's find someone who can help."], "helpSeeking"); }
  function helpSeeking() { choicePage(8, "08 • Help-seeking", "What happens next?", "You do not have to solve everything alone.", ["Keep it completely to yourself.", "Search random social-media advice.", "Talk to a trusted person or qualified professional."], "finalChallenge"); }

  function finalChallenge() {
    render(`<span class="eyebrow">09 • Put it together</span><h2>One last situation.</h2><p class="lead">Apply what you've learned to a new situation.</p><div class="card"><p>Stress, pressure, misinformation, and concern about use can all be warning signs.</p><div class="actions">${button("I'M READY →", "finalReveal")}</div></div>`, 9);
  }

  function finalReveal() {
    render(`<div class="final-message"><span class="eyebrow">You spotted the signals</span><h2>Recognize → Question → Support.</h2><p class="lead">Notice warning signs, question unsupported claims, and encourage appropriate help.</p></div><div class="info-grid"><div class="info-card"><h3>RECOGNIZE</h3><p class="muted">Notice risky coping, pressure, and normalization.</p></div><div class="info-card"><h3>QUESTION</h3><p class="muted">Popularity is not evidence of safety.</p></div><div class="info-card"><h3>SUPPORT</h3><p class="muted">Listen without shaming and encourage help.</p></div></div><div class="actions">${button("VIEW SUPPORT RESOURCES →", "resources")}${button("TAKE THE POST-TEST →", "postTest", "secondary")}</div>`, 9);
  }

  function support() {
    render(`<span class="eyebrow">Direct support</span><h2>You're not too late to ask for help.</h2><p class="lead">Start with someone you trust or a qualified professional.</p><div class="info-grid"><div class="info-card"><h3>National Drug De-Addiction Helpline</h3><div class="resource-number">14446</div><p class="muted">Support and referral related to substance-use concerns.</p><a class="call-button" href="tel:14446">CALL 14446</a></div><div class="info-card"><h3>Tele-MANAS</h3><div class="resource-number">14416</div><p class="muted">National tele-mental-health support service.</p><a class="call-button" href="tel:14416">CALL 14416</a></div></div><div class="actions">${button("BACK TO HOME", "home", "secondary")}</div>`);
  }

  function worried() {
    render(`<span class="eyebrow">For a friend or family member</span><h2>You don't have to handle this alone.</h2><p class="lead">Talk without judgment, listen, and encourage appropriate support.</p><div class="card"><h3>Try saying:</h3><p>“I've noticed you're struggling. Do you want to talk?”</p><p class="muted">Avoid labels, threats, or shame.</p></div><div class="actions">${button("VIEW SUPPORT", "support")}${button("BACK TO HOME", "home", "secondary")}</div>`);
  }

  function resources() {
    render(`<span class="eyebrow">Support</span><h2>Keep this information.</h2><p class="lead">Reaching out is a valid next step.</p><div class="info-grid"><div class="info-card"><h3>Drug De-Addiction Helpline</h3><div class="resource-number">14446</div><a class="call-button" href="tel:14446">CALL 14446</a></div><div class="info-card"><h3>Tele-MANAS</h3><div class="resource-number">14416</div><a class="call-button" href="tel:14416">CALL 14416</a></div></div><div class="actions">${button("TAKE THE POST-TEST →", "postTest")}${button("BACK TO HOME", "home", "secondary")}</div>`);
  }

  function postTest() {
    render(`<span class="eyebrow">Follow-up</span><h2>You've completed Beyond Say No.</h2><p class="lead">Open the short follow-up Google Form.</p><div class="research-note"><strong>Post-test survey</strong><p>The survey opens in a new tab.</p></div><div class="actions"><a href="${postTestUrl}" class="button button-primary" target="_blank" rel="noopener noreferrer">TAKE THE POST-TEST →</a>${button("VIEW SUPPORT RESOURCES", "resources", "secondary")}${button("BACK TO HOME", "home", "quiet")}</div>`);
  }

  const routes = { home, scenario1, redFlags, mythCheck, peerPressure, misinformation, someoneNeedsHelp, helpingFriend, helpSeeking, finalChallenge, finalReveal, support, worried, resources, postTest };

  document.addEventListener("click", (event) => {
    const target = event.target.closest("button, a");
    if (!target) return;
    const action = target.dataset.action || target.dataset.choiceNext;
    if (target.dataset.choiceNext) {
      const feedback = document.getElementById("feedback");
      if (feedback) feedback.innerHTML = `<div class="feedback"><div class="feedback-title">GOOD OBSERVATION</div><p>That is a useful next step. Keep noticing the whole situation.</p><div class="actions">${button("NEXT →", target.dataset.choiceNext)}</div></div>`;
      return;
    }
    if (action && routes[action]) routes[action]();
  });

  homeButton?.addEventListener("click", home);
  brandButton?.addEventListener("click", home);
  home();
})();
