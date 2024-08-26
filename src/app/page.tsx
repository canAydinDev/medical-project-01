import {Button} from "@/components/ui/button";

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl text-muted-foreground">Home Page</h1>
      <Button variant="outline" size="lg" className="capitalize m-8">
        Click me
      </Button>
    </div>
  );
}
