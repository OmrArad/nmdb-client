import { RatingsProvider } from "@/app/context/userRatingContext";
import RatingsList from "./userRatings";

const RatingsPage = () => {
  return (
    <RatingsProvider>
      <div className="container mx-auto my-2 py-4 px-16">
        <RatingsList />
      </div>
    </RatingsProvider>
  );
};

export default RatingsPage;
