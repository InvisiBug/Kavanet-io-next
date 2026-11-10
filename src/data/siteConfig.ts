export const siteConfig = {
  name: "Kavanet.io",
  role: "Builder of projects, systems, and simulations",
  headline: "A living portfolio of what I build and learn",
  subheadline: "Explore personal projects, community builds, and system simulations. Each project page is authored in markdown so it is easy to maintain and expand.",
  navBar: {
    socialLinks: [
      { name: "github", label: "GitHub", url: "https://github.com/invisibug" },
      { name: "linkedin", label: "LinkedIn", url: "https://www.linkedin.com/in/matthewjkavanagh/" },
      { name: "instagram", label: "Instagram", url: "https://instagram.com/em.brrrr" },
      { name: "etsy", label: "Etsy", url: "https://www.etsy.com/shop/EmBrrrr" },
    ],
    pageLinks: [
      { to: "/personal", label: "Personal Projects" },
      { to: "/community", label: "Community Projects" },
      { to: "/simulations", label: "System Simulations" },
      { to: "/about", label: "About / CV" },
    ],
    otherSites: [
      {
        label: "Winter Flow Space",
        url: "https://winterflowspace.com",
      },
      {
        label: "Twiddlesticks",
        url: "https://twiddlesticks.co.uk",
      },
    ],
  },
  options: {
    featuredProjectsLimit: 4,
    homeScreenFeaturedRandom: true,
    categoryPageShowOnlyFeatured: false,
  },
};
