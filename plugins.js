// plugins.js
// This file ensures Hackatime and GitHub integrations work consistently
// by exposing refresh functions globally and wiring them to settings changes.

(function () {
  // Expose refresh functions from app.js to global scope if not already
  if (typeof window.refreshHackatime !== 'function') {
    window.refreshHackatime = function (username, apiKey) {
      console.warn('refreshHackatime not defined yet. Did you load app.js first?');
    };
  }

  if (typeof window.refreshGithub !== 'function') {
    window.refreshGithub = function (username) {
      console.warn('refreshGithub not defined yet. Did you load app.js first?');
    };
  }

  // Helper: load settings from localStorage
  function getSettings() {
    return JSON.parse(localStorage.getItem('settings')) || {};
  }

  // Helper: apply integrations immediately when settings change
  function applyIntegrations() {
    const s = getSettings();

    if (s.hackatimeUsername && s.hackatimeKey && typeof window.refreshHackatime === 'function') {
      window.refreshHackatime(s.hackatimeUsername, s.hackatimeKey);
    }

    if (s.githubUsername && typeof window.refreshGithub === 'function') {
      window.refreshGithub(s.githubUsername);
    }
  }

  // Run integrations once DOM is ready
  document.addEventListener('DOMContentLoaded', () => {
    applyIntegrations();

    // Listen for storage changes (e.g. when settings.js saves new values)
    window.addEventListener('storage', (e) => {
      if (e.key === 'settings') {
        applyIntegrations();
      }
    });
  });
})();
