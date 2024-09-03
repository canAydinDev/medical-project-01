import { FaStar } from "react-icons/fa";

async function ModelRatıing({ modelId }: { modelId: string }) {
  const rating = 4.1;
  const count = 25;
  const className = `flex gap-1 items-center text-md mt-1 mb-4`;
  const countValue = `${count} kişi oyladı`;
  return (
    <span className={className}>
      <FaStar className="w-3 h-3" />
      {rating}
      {countValue}
    </span>
  );
}

export default ModelRatıing;
