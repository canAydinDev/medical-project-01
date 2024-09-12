"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import { LuShare2 } from "react-icons/lu";

import {
  TwitterShareButton,
  EmailShareButton,
  LinkedinShareButton,
  TwitterIcon,
  EmailIcon,
  LinkedinIcon,
} from "react-share";
type ShareButtonProps = {
  modelId: string;
  name: string;
};

function ShareButton({ modelId, name }: ShareButtonProps) {
  const url = process.env.NEXT_PUBLIC_WEBSITE_URL;
  return <div>SHAREbUTTON</div>;
}

export default ShareButton;
