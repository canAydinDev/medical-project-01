import { FaStar } from "react-icons/fa";

async function ModelRating({ modelId }: { modelId: string }) {
  const rating = 4.1;
  const count = 25;
  const className = `flex gap-1 items-center text-md mt-1 mb-4 `;
  const countValue = `   ${count} kişi oyladı`;
  return (
    <span className={className}>
      <FaStar className="w-3 h-3 text-amber-500" />
      <p className="text-amber-500">{rating}</p>
      <p className="text-myColor">{countValue}</p>
    </span>
  );
}

export default ModelRating;
