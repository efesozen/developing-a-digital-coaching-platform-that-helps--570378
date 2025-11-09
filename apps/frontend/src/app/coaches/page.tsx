'use client';

import { useCoaches } from '@/features/coaches/hooks/use-coaches';

export default function CoachProfilesPage() {
  const { data: coaches, isLoading } = useCoaches();

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Coach Profiles</h1>
      <p className="text-muted-foreground mb-6">Browse and view detailed profiles of certified coaches.</p>
      
      <div className="grid gap-4">
        {coaches?.map((coach: any) => (
          <div key={coach.id} className="border rounded p-4">
            <pre>{JSON.stringify(coach, null, 2)}</pre>
          </div>
        ))}
      </div>
    </div>
  );
}
