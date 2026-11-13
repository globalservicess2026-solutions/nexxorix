
(() => {
  // Replace this with your deployed Cloudflare Worker URL.
  const API_URL = "https://YOUR-WORKER-NAME.YOUR-SUBDOMAIN.workers.dev";

  const WHATSAPP_URL =
    "https://wa.me/917906161625?text=" +
    encodeURIComponent("Hi Nexxorix Digital Solutions, I would like to discuss a project.");

  const style = document.createElement("style");
  style.textContent = `
    #nx-chat-launcher {
      position:fixed;right:22px;bottom:85px;z-index:99999;
      border:0;border-radius:30px;padding:14px 19px;
      background:#14213d;color:white;font-weight:700;
      cursor:pointer;box-shadow:0 5px 20px #0003;
      font:600 14px Arial,sans-serif;
    }
    #nx-chat-panel {
      position:fixed;right:20px;bottom:145px;z-index:99999;
      width:min(360px,calc(100vw - 30px));height:490px;
      max-height:calc(100vh - 175px);background:#fff;
      border:1px solid #ddd;border-radius:16px;
      box-shadow:0 8px 35px #0003;display:none;
      overflow:hidden;font:14px Arial,sans-serif;color:#172033;
    }
    #nx-chat-panel.open {display:flex;flex-direction:column}
    .nx-head {background:#14213d;color:white;padding:16px}
    .nx-head strong {font-size:16px}
    .nx-head small {display:block;margin-top:5px;color:#dce5f5}
    .nx-messages {padding:14px;overflow-y:auto;flex:1;background:#f7f8fb}
    .nx-msg {padding:10px 12px;border-radius:12px;margin:8px 0;
      max-width:88%;line-height:1.45;white-space:pre-wrap;overflow-wrap:anywhere}
    .nx-bot {background:#fff;border:1px solid #e6e8ed}
    .nx-user {background:#dce8ff;margin-left:auto}
    .nx-controls {padding:10px;border-top:1px solid #eee;background:white}
    .nx-input-row {display:flex;gap:7px}
    #nx-chat-input {min-width:0;flex:1;padding:11px;border:1px solid #ccd2dc;
      border-radius:9px;font-size:14px}
    #nx-send {border:0;border-radius:9px;background:#14213d;color:white;
      padding:0 15px;cursor:pointer}
    .nx-actions {display:flex;gap:8px;margin-top:9px;flex-wrap:wrap}
    .nx-actions a {font-size:12px;text-decoration:none;color:#14213d;
      border:1px solid #ccd2dc;padding:8px 10px;border-radius:20px}
    .nx-note {font-size:11px;color:#687386;margin-top:8px;line-height:1.4}
    @media(max-width:480px) {
      #nx-chat-panel {right:10px;bottom:135px}
      #nx-chat-launcher {right:14px;bottom:78px}
    }
  `;
  document.head.appendChild(style);

  const launcher = document.createElement("button");
  launcher.id = "nx-chat-launcher";
  launcher.type = "button";
  launcher.textContent = "💬 Nexxorix Assistant";

  const panel = document.createElement("section");
  panel.id = "nx-chat-panel";
  panel.setAttribute("aria-label", "Nexxorix Assistant chat");
  panel.innerHTML = `
    <div class="nx-head">
      <strong>Nexxorix Assistant</strong>
      <small>Ask us about websites, SEO, advertising and automation.</small>
    </div>
    <div class="nx-messages" id="nx-messages" aria-live="polite">
      <div class="nx-msg nx-bot">
        Hello! Welcome to Nexxorix Digital Solutions.
        How can I help with your business today?
      </div>
    </div>
    <div class="nx-controls">
      <div class="nx-input-row">
        <input id="nx-chat-input" type="text"
          maxlength="1000" placeholder="Type your question..."
          aria-label="Your message">
        <button id="nx-send" type="button">Send</button>
      </div>
      <div class="nx-actions">
        <a href="mailto:nexxorix55@gmail.com">Email us</a>
        <a href="${WHATSAPP_URL}" target="_blank" rel="noopener">Connect on WhatsApp</a>
      </div>
      <div class="nx-note">
        Messages are processed to provide AI replies. Please do not share passwords,
        payment details or sensitive personal information.
      </div>
    </div>
  `;

  document.body.append(launcher, panel);

  const messages = panel.querySelector("#nx-messages");
  const input = panel.querySelector("#nx-chat-input");
  const send = panel.querySelector("#nx-send");
  const history = [];

  launcher.addEventListener("click", () => {
    panel.classList.toggle("open");
    if (panel.classList.contains("open")) input.focus();
  });

  function addMessage(text, who) {
    const item = document.createElement("div");
    item.className = "nx-msg " + (who === "user" ? "nx-user" : "nx-bot");
    item.textContent = text;
    messages.appendChild(item);
    messages.scrollTop = messages.scrollHeight;
    return item;
  }

  async function sendMessage() {
    const message = input.value.trim();
    if (!message || send.disabled) return;

    input.value = "";
    addMessage(message, "user");
    history.push({ role: "user", content: message });

    // Keep only the most recent messages in the browser session.
    while (history.length > 10) history.shift();

    send.disabled = true;
    send.textContent = "...";
    const waiting = addMessage("One moment, please...", "bot");

    try {
      const response = await fetch(API_URL + "/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history })
      });

      if (!response.ok) throw new Error("Chat request failed");
      const data = await response.json();
      const answer = data.reply || "Sorry, I could not prepare a reply.";
      waiting.textContent = answer;
      history.push({ role: "assistant", content: answer });
    } catch (error) {
      waiting.textContent =
        "I'm having trouble connecting right now. Please email us at nexxorix55@gmail.com or contact us on WhatsApp.";
    } finally {
      send.disabled = false;
      send.textContent = "Send";
      input.focus();
    }
  }

  send.addEventListener("click", sendMessage);
  input.addEventListener("keydown", event => {
    if (event.key === "Enter") sendMessage();
  });
})();

document.addEventListener("DOMContentLoaded", () => {

  const toggle = document.querySelector(".menu-btn");
  const links = document.querySelector(".navlinks");

  if (toggle && links) {
    toggle.addEventListener("click", () => {
      const open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
  }

  const current =
    location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll(".navlinks a").forEach(link => {
    if (link.getAttribute("href") === current) {
      link.classList.add("active");
    }
  });

});
