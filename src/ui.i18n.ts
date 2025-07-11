import { SITE } from "@/config";

export const languages = {
  en: "English",
  zh: "中文",
};

export const defaultLang = SITE.lang ?? "en";

export const ui = {
  en: {
    "nav.post": "Posts",
    "nav.tag": "Tags",
    "nav.about": "About",
    "nav.search": "Search",
    "nav.archive": "Archive",
    "nav.goToTheHomePage": "Go to the home page",
    "nav.togglesLightAndDark": "Toggles light & dark",
    "nav.closeMenu": "Close Menu",
    "nav.openMenu": "Open Menu",
    "nav.turnDarkModeOn": "Turn Dark Mode On",
    "nav.turnLightModeOn": "Turn Light Mode On",
  },
  zh: {
    "nav.post": "文章",
    "nav.tag": "标签",
    "nav.about": "关于",
    "nav.search": "搜索",
    "nav.archive": "归档",
    "nav.goToTheHomePage": "回到首页",
    "nav.togglesLightAndDark": "转换亮色或者暗色模式",
    "nav.closeMenu": "关闭菜单",
    "nav.openMenu": "打开菜单",
    "nav.turnDarkModeOn": "打开暗色模式",
    "nav.turnLightModeOn": "打开亮色模式",
  },
};
