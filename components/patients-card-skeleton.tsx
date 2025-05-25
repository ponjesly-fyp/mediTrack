import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function PatientCardSkeleton() {
  return Array.from({ length: 8 }).map((_, i) => (
    <Card key={i} className="h-full border-[1px]">
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex flex-row gap-1 items-center">
              <Skeleton className="w-4 h-4 rounded-full" />
              <Skeleton className="w-24 h-5" />
            </div>
            <Skeleton className="w-20 h-4 mt-2" />
            <Skeleton className="w-28 h-4 mt-2" />
          </div>
          <Skeleton className="w-2 h-2 rounded-full" />
        </div>
      </CardContent>
    </Card>
  ));
}
