import { IoMdMedical } from "react-icons/io";
import { Button } from "../ui/button";
import Link from "next/link";


function Logo() {
  return (
    <Button  >
      <Link href="/">
        <IoMdMedical className="w-6 h-6"/>
      </Link>
    </Button>
  )
}

export default Logo