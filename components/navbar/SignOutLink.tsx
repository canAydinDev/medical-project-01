"use client";
import { SignOutButton } from "@clerk/nextjs";
import { useToast } from "../ui/use-toast";
import Link from "next/link";

function SignOutLink() {
  const { toast } = useToast();
  const handleLogout = () => {
    toast({ description: "Logout oldunuz..." });
  };
  return (
    <SignOutButton>
      <Link
        href="/"
        className="w-full text-left capitalize"
        onClick={handleLogout}
      >
        çıkış
      </Link>
    </SignOutButton>
  );
}
export default SignOutLink;
