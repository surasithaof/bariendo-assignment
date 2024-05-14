import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function HourSelect({
  defaultValue,
  onValueChange,
  disabledSelect,
}: {
  defaultValue?: string;
  onValueChange: (value: string) => void;
  disabledSelect?: (hour: number) => boolean;
}) {
  return (
    <Select value={defaultValue} onValueChange={onValueChange}>
      <SelectTrigger>
        <SelectValue placeholder="Select time" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Time</SelectLabel>
          {[0, ...Array(11)].map((_, i) => (
            <SelectItem
              key={`h-${i + 1}`}
              value={(i + 1).toString()}
              className="text-center"
              disabled={disabledSelect && disabledSelect(i + 1)}
            >
              {(i + 1).toString().padStart(2, "0")}:00
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default HourSelect;
