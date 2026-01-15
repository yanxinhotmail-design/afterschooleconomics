const container = document.getElementById("glossary-container");
const searchInput = document.getElementById("searchInput");

/* ===== 描画関数 ===== */
function renderGlossary(data) {
  container.innerHTML = "";

  data.forEach(section => {
    const sec = document.createElement("section");

    const h2 = document.createElement("h2");
    h2.textContent = section.title;

    const dl = document.createElement("dl");

    section.items.forEach(item => {
      const dt = document.createElement("dt");
      dt.innerHTML = `<strong>${item.term}</strong>`;

      const dd = document.createElement("dd");
      dd.textContent = item.desc;

      dl.appendChild(dt);
      dl.appendChild(dd);
    });

    sec.appendChild(h2);
    sec.appendChild(dl);
    container.appendChild(sec);
  });
}

/* ===== 検索処理 ===== */
function filterGlossary(keyword) {
  const result = glossaryData
    .map(section => {
      const matchedItems = section.items.filter(item =>
        item.term.includes(keyword) ||
        item.desc.includes(keyword)
      );

      return {
        title: section.title,
        items: matchedItems
      };
    })
    .filter(section => section.items.length > 0); // ← 該当カテゴリのみ表示

  renderGlossary(result);
}

/* ===== イベント ===== */
searchInput.addEventListener("input", e => {
  const keyword = e.target.value.trim();

  if (keyword === "") {
    renderGlossary(glossaryData); // 全表示に戻す
  } else {
    filterGlossary(keyword);
  }
});

/* 初期表示 */
renderGlossary(glossaryData);
