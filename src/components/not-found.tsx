import { Link } from "@tanstack/react-router";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";

export default function NotFoundComponent() {
  return (
    <div className="h-dvh w-md flex items-center justify-center m-auto">
      <Empty className="border">
        <EmptyHeader>
          <EmptyTitle>404 — Not Found</EmptyTitle>
          <EmptyDescription>
            The page you&apos;re looking for doesn&apos;t exist. Try searching
            for what you need below.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <EmptyDescription>
            Go back to <Link to="/">Homepage</Link>
          </EmptyDescription>
        </EmptyContent>
      </Empty>
    </div>
  );
}
