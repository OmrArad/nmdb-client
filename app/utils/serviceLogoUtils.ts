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
    default:
      return null;
  }
};
