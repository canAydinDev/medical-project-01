import { FaHeart } from "react-icons/fa";
import { Button } from '../ui/button'

function FavouriteToggleButton({modelId}: {modelId: string}) {
  return (
    <Button size="icon" variant="outline" className="p-2 cursor-pointer">
      <FaHeart/>
    </Button>
  )
}

export default FavouriteToggleButton