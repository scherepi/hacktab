document.addEventListener('DOMContentLoaded', () => {
  const settingsPopup = document.getElementById('settingsPopup');
  const closeSettings = document.getElementById('closeSettings');

  const saveNameBtn = document.getElementById('saveNameBtn');
  const nameInput = document.getElementById('nameInput');

  const saveHackatimeBtn = document.getElementById('saveHackatimeBtn');
  const hackatimeUsernameInput = document.getElementById('hackatimeUsername');
  const hackatimeKeyInput = document.getElementById('hackatimeKey');

  const saveGithubBtn = document.getElementById('saveGithubBtn');
  const githubUsernameInput = document.getElementById('githubUsername');

  // Close popup
  if (closeSettings) {
    closeSettings.addEventListener('click', () => {
      settingsPopup.style.display = 'none';
    });
  }

  // Save name
  if (saveNameBtn) {
    saveNameBtn.addEventListener('click', () => {
      const settings = JSON.parse(localStorage.getItem('settings')) || {};
      settings.name = nameInput.value.trim();
      localStorage.setItem('settings', JSON.stringify(settings));
      alert(`Name saved as "${settings.name}"`);
    });
  }

  // Save Hackatime
  if (saveHackatimeBtn) {
    saveHackatimeBtn.addEventListener('click', () => {
      const settings = JSON.parse(localStorage.getItem('settings')) || {};
      settings.hackatimeUsername = hackatimeUsernameInput.value.trim();
      settings.hackatimeKey = hackatimeKeyInput.value.trim();
      localStorage.setItem('settings', JSON.stringify(settings));
      alert('Hackatime settings saved.');
    });
  }

  // Save GitHub
  if (saveGithubBtn) {
    saveGithubBtn.addEventListener('click', () => {
      const settings = JSON.parse(localStorage.getItem('settings')) || {};
      settings.githubUsername = githubUsernameInput.value.trim();
      localStorage.setItem('settings', JSON.stringify(settings));
      alert(`GitHub username saved as "${settings.githubUsername}"`);
    });
  }
});
