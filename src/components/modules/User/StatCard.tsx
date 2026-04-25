export const StatCard = ({ icon: Icon, label, value }) =>{
  return (
    <div className="flex flex-col items-center gap-2 rounded-lg bg-muted/60 border border-border py-5 px-2 text-center hover:bg-muted transition-colors cursor-default">
      <Icon className="w-4 h-4 text-primary" />
      <span className="text-xl font-bold text-foreground leading-none">{value}</span>
      <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium">{label}</span>
    </div>
  );
}