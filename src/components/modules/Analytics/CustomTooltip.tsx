/* eslint-disable @typescript-eslint/no-explicit-any */
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-xl px-4 py-3 shadow-xl text-sm">
        <p className="font-semibold text-foreground mb-1">{label}</p>
        {payload.map((p: any) => (
          <p key={p.name} className="text-muted-foreground">
            <span className="text-foreground font-medium">
              {p.name === "revenue" ? `৳${p.value.toLocaleString()}` : p.value.toLocaleString()}
            </span>{" "}
            {p.name}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default CustomTooltip;
