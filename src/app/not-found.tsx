import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <h2 className="text-4xl font-bold">404 | Not Found</h2>
      <p>Could not find requested resource</p>
      <Button asChild className=" ml-4 cursor-pointer" variant="default">
        <Link href="/">Return Home</Link>
      </Button>
    </div>
  );
}
