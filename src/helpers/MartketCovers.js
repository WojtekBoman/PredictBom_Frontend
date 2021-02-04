import sportBackground from "../img/sportBackground.png";
import celebryciBackground from "../img/celebryciBackground.jpg";
import politykaBackground from "../img/politykaBackground.jpg";
import gospodarkaBackground from "../img/gospodarkaBackground.jpg";
import inneBackground from "../img/inneBackground.png";

const setMarketCover = (category) => {
  switch (category) {
    case "SPORT":
      return sportBackground;
    case "CELEBRITIES":
      return celebryciBackground;
    case "POLICY":
      return politykaBackground;
    case "ECONOMY":
      return gospodarkaBackground;
    case "OTHER":
      return inneBackground;
    default:
      return inneBackground;
  }
};

export const displayMarketCover = (cover, category) => {
  return cover
    ? `data:image/jpeg;base64,${cover.data}`
    : setMarketCover(category);
};
