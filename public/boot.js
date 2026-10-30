// Skip the static boot screen when the intro has already played (first visit only).
try {
  if (localStorage.getItem('devfolio:loaded') === '1') document.getElementById('boot')?.remove()
} catch {
  /* storage blocked: the boot screen is removed when the app mounts */
}
