// Skip the static boot screen when the intro already played this session.
try {
  if (sessionStorage.getItem('devfolio:loaded') === '1') document.getElementById('boot')?.remove()
} catch {
  /* storage blocked: the boot screen is removed when the app mounts */
}
