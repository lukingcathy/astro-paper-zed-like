export function getCurrentPage(currentUrl: string): string {
  return currentUrl.endsWith("/") && currentUrl !== "/"
    ? currentUrl.slice(0, -1)
    : currentUrl;
}

export function isActivePage(currentPage: string, path: string): boolean {
  const currentPathArray = currentPage.split("/").filter(p => p.trim());
  const pathArray = path.split("/").filter(p => p.trim());

  return currentPage === path || currentPathArray[0] === pathArray[0];
}
