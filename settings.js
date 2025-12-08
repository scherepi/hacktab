// settings.js
document.addEventListener('DOMContentLoaded', () => {
  // Grab elements
  const settingsBtn = document.getElementById('settingsBtn');
  const settingsPopup = document.getElementById('settingsPopup');
  const closeSettings = document.getElementById('closeSettings');

  const darkModeToggle = document.getElementById('darkModeToggle');
  const showShortcutsToggle = document.getElementById('showShortcutsToggle');
  const animatedBgToggle = document.getElementById('animatedBgToggle');

  const nameInput = document.getElementById('nameInput');
  const saveNameBtn = document.getElementById('saveNameBtn');

  const hackatimeUsernameInput = document.getElementById('hackatimeUsername');
  const hackatimeKeyInput = document.getElementById('hackatimeKey');
  const saveHackatimeBtn = document.getElementById('saveHackatimeBtn');

  const githubUsernameInput = document.getElementById('githubUsername');
  const saveGithubBtn = document.getElementById('saveGithubBtn');

  
  // Helpers
  function getSettings() {
    return JSON.parse(localStorage.getItem('settings')) || {};
  }
  function saveSettings(settings) {
    localStorage.setItem('settings', JSON.stringify(settings));
    applySettings(settings);
  }
  function applyTheme(themeName) {
    document.documentElement.className = themeName ? `theme-${themeName}` : '';
  }
  function applySettings(settings) {
    document.body.classList.toggle('dark', !!settings.darkMode);
    applyTheme(settings.theme || 'dark');
    const win2 = document.getElementById('win2');
    if (win2) win2.style.display = settings.showShortcuts === false ? 'none' : '';
    const matrix = document.querySelector('.matrix');
    if (matrix) matrix.style.display = settings.animatedBg === false ? 'none' : '';
  }

  // Load settings into UI
  function loadSettingsToUI() {
    const s = getSettings();
    if (darkModeToggle) darkModeToggle.checked = !!s.darkMode;
    if (showShortcutsToggle) showShortcutsToggle.checked = s.showShortcuts !== false;
    if (animatedBgToggle) animatedBgToggle.checked = s.animatedBg !== false;
    if (nameInput) nameInput.value = s.name || '';
    if (hackatimeUsernameInput) hackatimeUsernameInput.value = s.hackatimeUsername || '';
    if (hackatimeKeyInput) hackatimeKeyInput.value = s.hackatimeKey || '';
    if (githubUsernameInput) githubUsernameInput.value = s.githubUsername || '';
    if (themeSelector) themeSelector.value = s.theme || 'dark';
    applySettings(s);
  }

  // Popup open/close
  settingsBtn?.addEventListener('click', () => {
    settingsPopup.style.display = 'block';
  });
  closeSettings?.addEventListener('click', () => {
    settingsPopup.style.display = 'none';
  });

  // Toggles
  darkModeToggle?.addEventListener('change', () => {
    const s = getSettings();
    s.darkMode = darkModeToggle.checked;
    saveSettings(s);
  });
  showShortcutsToggle?.addEventListener('change', () => {
    const s = getSettings();
    s.showShortcuts = showShortcutsToggle.checked;
    saveSettings(s);
  });
  animatedBgToggle?.addEventListener('change', () => {
    const s = getSettings();
    s.animatedBg = animatedBgToggle.checked;
    saveSettings(s);
  });

  // Save name
  saveNameBtn?.addEventListener('click', () => {
    const s = getSettings();
    s.name = nameInput.value.trim();
    saveSettings(s);
    alert(`Name saved as "${s.name}"`);
  });

  // Save Hackatime
  saveHackatimeBtn?.addEventListener('click', () => {
    const s = getSettings();
    s.hackatimeUsername = hackatimeUsernameInput.value.trim();
    s.hackatimeKey = hackatimeKeyInput.value.trim();
    saveSettings(s);
    alert('Hackatime settings saved.');
    if (typeof refreshHackatime === 'function' && s.hackatimeUsername && s.hackatimeKey) {
      refreshHackatime(s.hackatimeUsername, s.hackatimeKey);
    }
  });

  // Save GitHub
  saveGithubBtn?.addEventListener('click', () => {
    const s = getSettings();
    s.githubUsername = githubUsernameInput.value.trim();
    saveSettings(s);
    alert(`GitHub username saved as "${s.githubUsername}"`);
    if (typeof refreshGithub === 'function' && s.githubUsername) {
      refreshGithub(s.githubUsername);
    }
  });

  // Close popup with Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && settingsPopup.style.display === 'block') {
      settingsPopup.style.display = 'none';
    }
  });

  // Theme selector
  const themeSelector = document.getElementById('themeSelector');
  themeSelector?.addEventListener('change', () => {
    const s = getSettings();
    s.theme = themeSelector.value;
    saveSettings(s);
    applyTheme(s.theme);
  });

  // Initial load
  loadSettingsToUI();
});
