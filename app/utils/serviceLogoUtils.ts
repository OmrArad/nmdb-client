export const getLogoForService = (serviceName: string) => {
  switch (serviceName) {
    case "Amazon Prime Video":
      return "/logos/amazon_prime.svg.png";
    case "Apple TV Plus":
      return "/logos/apple_tv_plus.svg.png";
    case "Disney Plus":
      return "/logos/disney_plus.svg.png";
    case "Hulu":
      return "/logos/hulu.svg.png";
    case "Netflix":
      return "/logos/netflix.svg.png";
    case "Max":
      return "/logos/max.svg.png";
    case "Paramount Plus":
      return "/logos/paramount_plus.svg.png";
    case "fuboTV":
      return "/logos/fubo.png";
    case "Discovery Plus":
      return "/logos/discovery_plus.svg.png";
    case "Crunchyroll":
      return "/logos/crunchyroll.svg.png";
    case "ESPN Plus":
      return "/logos/espn_plus.svg.png";
    case "Showtime":
      return "/logos/showtime.svg.png";
    case "Sling TV":
      return "/logos/sling_tv.svg.png";
    case "Starz":
      return "/logos/starz.svg.png";
    case "YouTube TV":
      return "/logos/youtube_tv.svg.png";
    default:
      return null;
  }
};
