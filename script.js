let pages = [];

fetch("./data/pages.json")
  .then(r => r.json())
  .then(data => {
    pages = data;
    render();
  });

const cards = document.getElementById("cards");
const search = document.getElementById("search");
const sort = document.getElementById("sort");
const empty = document.getElementById("empty");

search.addEventListener("input", render);
sort.addEventListener("change", render);

function render() {
  const q = search.value.toLowerCase();
  let list = pages.filter(p => p.name.toLowerCase().includes(q));

  if (sort.value === "updated") {
    list.sort((a, b) => new Date(b.updated) - new Date(a.updated));
  } else {
    list.sort((a, b) => a.name.localeCompare(b.name));
  }

  cards.innerHTML = "";
  empty.classList.toggle("hidden", list.length !== 0);

  for (const p of list) {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <a href="${p.url}" target="_blank">${p.name}</a>
      <div class="meta">
        更新: ${new Date(p.updated).toLocaleString()}
      </div>
    `;
    cards.appendChild(div);
  }
}
