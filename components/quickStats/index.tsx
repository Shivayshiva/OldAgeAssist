export function QuickStats() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="bg-card border border-border rounded-lg p-4 text-center">
        <p className="text-2xl font-bold text-primary">2.5K</p>
        <p className="text-xs text-muted-foreground mt-1">Active Volunteers</p>
      </div>
      <div className="bg-card border border-border rounded-lg p-4 text-center">
        <p className="text-2xl font-bold text-accent">48</p>
        <p className="text-xs text-muted-foreground mt-1">Active Projects</p>
      </div>
      <div className="bg-card border border-border rounded-lg p-4 text-center">
        <p className="text-2xl font-bold text-primary">12K+</p>
        <p className="text-xs text-muted-foreground mt-1">Hours Contributed</p>
      </div>
    </div>
  );
}