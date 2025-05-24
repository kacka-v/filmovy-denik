<script>
  function updateProgress() {
    const checkboxes = document.querySelectorAll('.seen-checkbox');
    const total = checkboxes.length;
    const seen = Array.from(checkboxes).filter(cb => cb.checked).length;
    const percent = total === 0 ? 0 : Math.round((seen / total) * 100);

    document.getElementById('seen-count').textContent = seen;
    document.getElementById('total-count').textContent = total;
    document.getElementById('seen-percent').textContent = `${percent}%`;
    document.getElementById('progress-bar').style.width = `${percent}%`;
  }

  document.addEventListener('DOMContentLoaded', () => {
    const checkboxes = document.querySelectorAll('.seen-checkbox');
    checkboxes.forEach(cb => cb.addEventListener('change', updateProgress));
    updateProgress(); // init
  });
</script>
