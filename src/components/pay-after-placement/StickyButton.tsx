import { Button } from "../ui/button";

const StickyButton = () => {
  return (
    <div className="fixed -left-20 top-1/2 z-50">
      <Button className="rotate-90 bg-purple-500 text-white font-semibold">
        No Placement-No Fees
      </Button>
    </div>
  );
};

export default StickyButton;
