import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

export const AddressCard = ({ address }) =>{
  return (
    <div className={`relative rounded-lg border p-5 transition-all ${address.default ? "border-primary bg-primary/5 dark:bg-primary/10" : "border-border bg-card hover:border-primary/40"}`}>
      {address.default && (
        <span className="absolute top-3 right-3 text-[11px] font-semibold bg-primary text-primary-foreground px-2.5 py-0.5 rounded-full">Default</span>
      )}
      <div className="flex items-center gap-2 mb-3">
        <MapPin className="w-3.5 h-3.5 text-primary" />
        <span className="text-xs font-semibold text-primary uppercase tracking-wider">{address.label}</span>
      </div>
      <p className="text-sm font-semibold text-foreground">{address.name}</p>
      <p className="text-sm text-muted-foreground mt-0.5">{address.line}</p>
      <p className="text-sm text-muted-foreground">{address.city}</p>
      <p className="text-sm text-muted-foreground mt-0.5">{address.phone}</p>
      <div className="flex gap-2 mt-4">
        <Button variant="outline" size="sm" className="text-xs h-8 rounded-md">Edit</Button>
        {!address.default && (
          <Button variant="ghost" size="sm" className="text-xs h-8 rounded-md text-primary hover:text-primary hover:bg-primary/10">
            Set as Default
          </Button>
        )}
      </div>
    </div>
  );
}
