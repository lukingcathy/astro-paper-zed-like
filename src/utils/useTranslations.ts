import { defaultLang, ui, uiArray } from "@/ui.i18n.ts";

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof (typeof ui)[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  };
}

export function useTranslationsArray(lang: keyof typeof uiArray) {
  return function tArray(key: keyof (typeof uiArray)[typeof defaultLang]) {
    return uiArray[lang][key] || uiArray[defaultLang][key];
  };
}
