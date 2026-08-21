const page = document.body.dataset.page;
const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('.site-nav');

document.querySelector(`[data-nav="${page}"]`)?.classList.add('active');
const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();

menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  navigation.classList.toggle('open', !open);
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    menuButton?.setAttribute('aria-expanded', 'false');
    navigation?.classList.remove('open');
  }
});

async function copyText(text) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const input = document.createElement('textarea');
  input.value = text;
  input.setAttribute('readonly', '');
  input.style.position = 'fixed';
  input.style.opacity = '0';
  document.body.appendChild(input);
  input.select();
  document.execCommand('copy');
  input.remove();
}

document.querySelectorAll('[data-copy]').forEach(button => {
  button.addEventListener('click', async () => {
    const toast = document.querySelector('.copy-toast');
    try {
      await copyText(button.dataset.copy);
      if (toast) {
        toast.textContent = 'WeChat ID copied to clipboard.';
        toast.classList.add('show');
        window.setTimeout(() => toast.classList.remove('show'), 2200);
      }
    } catch {
      if (toast) {
        toast.textContent = `WeChat ID: ${button.dataset.copy}`;
        toast.classList.add('show');
        window.setTimeout(() => toast.classList.remove('show'), 3000);
      }
    }
  });
});

const trajectoryPoints = [...document.querySelectorAll('[data-trajectory]')];
const trajectoryPanels = [...document.querySelectorAll('.trajectory-panel')];

function activateTrajectory(point, moveFocus = false) {
  const panelId = point.dataset.trajectory;

  trajectoryPoints.forEach(item => {
    const selected = item === point;
    item.classList.toggle('active', selected);
    item.setAttribute('aria-selected', String(selected));
    item.tabIndex = selected ? 0 : -1;
  });

  trajectoryPanels.forEach(panel => {
    panel.hidden = panel.id !== panelId;
  });

  if (moveFocus) point.focus();
}

trajectoryPoints.forEach((point, index) => {
  point.addEventListener('mouseenter', () => activateTrajectory(point));
  point.addEventListener('focus', () => activateTrajectory(point));
  point.addEventListener('click', () => activateTrajectory(point));
  point.addEventListener('keydown', event => {
    if (!['ArrowDown', 'ArrowUp', 'ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();

    let nextIndex = index;
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') nextIndex = (index + 1) % trajectoryPoints.length;
    if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') nextIndex = (index - 1 + trajectoryPoints.length) % trajectoryPoints.length;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = trajectoryPoints.length - 1;
    activateTrajectory(trajectoryPoints[nextIndex], true);
  });
});
