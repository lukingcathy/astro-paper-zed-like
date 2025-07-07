export const SITE = {
  website: "https://astro-paper-zed-like.cathyluking.workers.dev", // replace this with your deployed domain
  author: "lukingcathy",
  profile: "https://github.com/lukingcathy",
  desc: "A minimal, responsive and SEO-friendly Astro blog theme.",
  title: "AstroPaper",
  ogImage: "astropaper-og.jpg",
  lightAndDarkMode: true,
  postPerIndex: 6,
  postPerPage: 6,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
  showArchives: true,
  showBackButton: true, // show back button in post detail
  showShareLinks: false,
  editPost: {
    enabled: true,
    text: "Suggest Changes",
    url: "https://github.com/lukingcathy/astro-paper-zed-like/edit/main/",
  },
  dynamicOgImage: true,
  lang: "en", // HTML lang code. Set this empty and default will be "en"
  timezone: "Asia/Shanghai", // Default global timezone (IANA format) https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
} as const;
