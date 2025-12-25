const listEl = document.getElementById("list");
const searchEl = document.getElementById("search");

let pages = [];

fetch("data/pages.json")
  .then(r => r.json())
  .then(data => {
    pages = data.sort(
      (a, b) => new Date(b.updated) - new Date(a.updated)
    );
    render(pages);
  });

searchEl.addEventListener("input", () => {
  const q = searchEl.value.toLowerCase();
  render(
    pages.filter(p =>
      (p.title || "").toLowerCase().includes(q) ||
      (p.name || "").toLowerCase().includes(q) ||
      (p.description || "").toLowerCase().includes(q)
    )
  );
});

function render(items) {
  listEl.innerHTML = "";

  for (const p of items) {
    const card = document.createElement("div");
    card.className = "card";

    const img = document.createElement("img");
    img.className = "icon";
    img.src = getFavicon(p);
    img.onerror = () => {
      img.src = "assets/deficon-192.png";
    };

    const info = document.createElement("div");
    info.className = "info";

    const title = document.createElement("a");
    title.href = p.url;
    title.target = "_blank";
    title.textContent = p.title || p.name;

    const desc = document.createElement("div");
    desc.className = "desc";
    desc.textContent = p.description || "";

    const updated = document.createElement("div");
    updated.className = "updated";
    updated.textContent =
      "Updated: " + new Date(p.updated).toLocaleDateString();

    info.append(title, desc, updated);
    card.append(img, info);
    listEl.append(card);
  }
}

function getFavicon(p) {
  if (p.favicon) {
    return new URL(p.favicon, p.url).href;
  }
  return p.url.replace(/\/$/, "") + "/favicon.ico";
}
