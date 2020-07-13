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

export const isAdminPath = router => checkPath('admin', false, router);
export const isErrorPath = router => checkPath('_error', false, router);

/**
 * Find current path and set equal menu item active
 * @param {*} pathList - all menu items list
 * @param {*} setActive
 * @param {*} router
 */
export const setActiveMenu = (pathList, setActive, router) => {
  pathList.forEach(({ link, label }) => {
    if (checkPath(link, true, router)) {
      setActive(label);
    }
  });
};
