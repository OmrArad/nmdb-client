import { UserRatingsProvider } from "@/app/components/context/userRatingContext";
import RatingsList from "./userRatings";

const RatingsPage = () => {
  return (
    <UserRatingsProvider>
      <div className="container mx-auto my-2 py-4 px-16">
        <RatingsList />
      </div>
    </UserRatingsProvider>
  );
};

export default RatingsPage;
