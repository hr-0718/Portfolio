
function shakeWindow() {
  document.body.classList.add('shake-window');
  document.body.addEventListener('animationend', () => {
    document.body.classList.remove('shake-window');
  }, { once: true });
}

document.querySelectorAll('.clickable').forEach(card => {
  card.addEventListener('click', () => {
    shakeWindow();
    card.classList.add('shake');
    card.addEventListener('animationend', () => {
      card.classList.remove('shake');
    }, { once: true });
  });
});

document.addEventListener('click', (e) => {
  const effect = document.createElement('div');
  effect.classList.add('click-effect');
  effect.style.left = `${e.clientX}px`;
  effect.style.top = `${e.clientY}px`;

  document.body.appendChild(effect);

  effect.addEventListener('animationend', () => {
    effect.remove();
  });
});



document.addEventListener("DOMContentLoaded", () => {
  const checks = document.querySelectorAll(".filter-check");
  const cards = document.querySelectorAll(".work-card");

  function applyFilter() {
    // ON になっているチェックボックスの value を配列で取得
    const activeFilters = [...checks]
      .filter(ch => ch.checked)
      .map(ch => ch.value);

    // 何も選択されていない → 全表示
    if (activeFilters.length === 0) {
      cards.forEach(card => card.classList.remove("hidden"));
      return;
    }

    cards.forEach(card => {
      const tags = [...card.querySelectorAll(".work-tag")];

      // AND 条件：すべての activeFilters を持っているか？
      const match = activeFilters.every(filter =>
        tags.some(tag => tag.classList.contains(filter))
      );

      if (match) {
        card.classList.remove("hidden");
      } else {
        card.classList.add("hidden");
      }
    });
  }

  // チェックボックスが変わるたびにフィルタ適用
  checks.forEach(ch => ch.addEventListener("change", applyFilter));
});