
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
