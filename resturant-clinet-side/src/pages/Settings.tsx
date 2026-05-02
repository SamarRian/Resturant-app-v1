import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { ImageIcon, Plus, X } from "lucide-react";
import { TypographyH2, TypographyP } from "@/components/Typography/Typography";

export default function Settings() {
  const [businessName, setBusinessName] = useState("");
  const [logo, setLogo] = useState(/** @type {File|null} */ null);
  const [logoPreview, setLogoPreview] = useState(
    /** @type {string|null} */ null
  );
  const [deliveryCharge, setDeliveryCharge] = useState("");
  const [freeRange, setFreeRange] = useState("");
  const [phoneNumbers, setPhoneNumbers] = useState([""]);
  const fileInputRef = useRef(null);

  // ── Logo ──────────────────────────────────────────────────────────────────

  function handleLogoChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.error("File too large — max 2 MB");
      return;
    }

    setLogo(file);
    const reader = new FileReader();
    reader.onload = (ev) => setLogoPreview(ev.target?.result);
    reader.readAsDataURL(file);
  }

  // ── Phone numbers ─────────────────────────────────────────────────────────

  function addPhone() {
    setPhoneNumbers((prev) => [...prev, ""]);
  }

  function updatePhone(index, value) {
    setPhoneNumbers((prev) => prev.map((p, i) => (i === index ? value : p)));
  }

  function removePhone(index) {
    setPhoneNumbers((prev) => prev.filter((_, i) => i !== index));
  }

  // ── Submit / Reset ────────────────────────────────────────────────────────

  function handleSave() {
    if (!businessName.trim()) {
      toast.error("Please enter a business name");
      return;
    }

    const payload = {
      businessName: businessName.trim(),
      logo,
      deliveryChargePerKm:
        deliveryCharge === "" ? null : Number(deliveryCharge),
      freeDeliveryRange: freeRange === "" ? null : Number(freeRange),
      phoneNumbers: phoneNumbers.filter((p) => p.trim() !== ""),
    };

    console.log("Saving settings:", payload);
    // TODO: replace with your API call, e.g.:
    // await fetch("/api/settings", { method: "POST", body: JSON.stringify(payload) })

    toast.success("Settings saved successfully");
  }

  function handleReset() {
    setBusinessName("");
    setLogo(null);
    setLogoPreview(null);
    setDeliveryCharge("");
    setFreeRange("");
    setPhoneNumbers([""]);
    if (fileInputRef.current) fileInputRef.current.value = "";
    toast.success("Settings Reset Successfully");
  }

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="px-4 sm:py-2 md:py-6">
      <div>
        <TypographyH2 className={"mb-2 p-0"}>Settings</TypographyH2>
        <TypographyP className="mb-2">
          {" "}
          Configure your business information and delivery preferences
        </TypographyP>
      </div>
      <Card>
        <CardHeader></CardHeader>

        <CardContent className="space-y-6">
          {/* ── Business Name ── */}
          <div className="space-y-2">
            <Label htmlFor="business-name">Business name</Label>
            <Input
              id="business-name"
              type="text"
              placeholder="e.g. Sunrise Grocers"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
            />
          </div>

          {/* ── Logo Upload ── */}
          <div className="space-y-2">
            <Label>App logo</Label>
            <div
              className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-muted-foreground/40 bg-muted/30 px-4 py-6 transition-colors hover:border-primary/50 hover:bg-muted/50"
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleLogoChange}
              />
              {logoPreview ? (
                <>
                  <img
                    src={logoPreview}
                    alt="Logo preview"
                    className="h-16 w-16 rounded-lg border bg-white object-contain"
                  />
                  <p className="text-sm text-muted-foreground">{logo?.name}</p>
                  <p className="text-xs text-muted-foreground">
                    Click to change
                  </p>
                </>
              ) : (
                <>
                  {/* Upload icon */}
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border bg-background">
                    <ImageIcon className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <p className="text-sm font-medium">Click to upload logo</p>
                  <p className="text-xs text-muted-foreground">
                    PNG, JPG, SVG — max 2 MB
                  </p>
                </>
              )}
            </div>
          </div>

          <Separator />

          {/* ── Delivery Charges ── */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="delivery-charge">Delivery charge per km</Label>
              <div className="relative">
                <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-sm text-muted-foreground">
                  $
                </span>
                <Input
                  id="delivery-charge"
                  type="number"
                  min={0}
                  step={0.01}
                  placeholder="0.00"
                  className="pl-7 font-mono"
                  value={deliveryCharge}
                  onChange={(e) => setDeliveryCharge(e.target.value)}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Charged per kilometer of distance
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="free-range">Free delivery range</Label>
              <div className="relative">
                <Input
                  id="free-range"
                  type="number"
                  min={0}
                  step={0.1}
                  placeholder="5.0"
                  className="pr-10 font-mono"
                  value={freeRange}
                  onChange={(e) => setFreeRange(e.target.value)}
                />
                <span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-xs text-muted-foreground">
                  km
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Orders within this range are free
              </p>
            </div>
          </div>

          <Separator />

          {/* ── Phone Numbers ── */}
          <div className="space-y-2">
            <Label>Phone numbers</Label>
            <div className="space-y-2">
              {phoneNumbers.map((phone, index) => (
                <div key={index} className="flex items-center gap-2">
                  {/* Badge */}
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                    {index + 1}
                  </span>

                  <Input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={phone}
                    onChange={(e) => updatePhone(index, e.target.value)}
                  />

                  {/* Remove button — always show so first can also be cleared */}
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="shrink-0 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                    onClick={() => {
                      if (phoneNumbers.length === 1) {
                        updatePhone(0, "");
                      } else {
                        removePhone(index);
                      }
                    }}
                    aria-label="Remove phone number"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>

            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-1 gap-1.5"
              onClick={addPhone}
            >
              <Plus className="h-4 w-4" />
              Add phone number
            </Button>

            <p className="text-xs text-muted-foreground">
              Add all contact numbers for your business
            </p>
          </div>

          <Separator />

          {/* ── Footer Actions ── */}
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={handleReset}>
              Reset
            </Button>
            <Button type="button" onClick={handleSave}>
              Save settings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
