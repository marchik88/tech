/**
 * Check current page location path
 * @param {*} path - path
 * @param {*} strict - include or equal
 * @param {*} router
 */
export const checkPath = (path, strict, router) => {
  if (strict) return router ? router.pathname === path : false;
  return router ? router.pathname.includes(path) : false;
};

export const isProfilePath = router => checkPath('profile', false, router);
export const isAdminPath = router => checkPath('admin', false, router);
export const isErrorPath = router => checkPath('_error', false, router);

export const langColorsSwither = (currentLang = 'ru', theme, lang, mt) =>
  theme === 'light'
    ? lang === currentLang
      ? mt('colors.langs_toggle.light')
      : mt('colors.langs_toggle.dark')
    : mt('colors.langs_toggle.light');
