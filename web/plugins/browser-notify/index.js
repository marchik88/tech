const notify = {
  permissions: () => {},
  play: ({
    title = 'Привет от НМЗ',
    body = 'Стартовал новый рабочий день :)',
    icon = '/project_logo.svg',
    vibrate = [200, 100, 200],
  }) => {
    if (global.window) {
      new global.window.Notification(title, {
        body,
        icon,
        vibrate,
      });
    }
    let audio = new Audio('/sounds/notify.mp3');
    audio.play();
  },
};

export default {
  config: {
    name: 'browserNotify',
    version: '0.0.1',
    type: 'private',
  },
  notify,
};
