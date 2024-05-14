import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Doctor } from "@/lib/types/doctor.type";

export function DoctorSelect({
  doctors,
  defaultValue,
  onValueChange,
  disabledSelect,
}: {
  doctors: Doctor[];
  defaultValue?: string;
  onValueChange: (value: string) => void;
  disabledSelect?: (org: Doctor) => boolean;
}) {
  return (
    <Select
      value={doctors
        .find((d) => d.id.toString() === defaultValue)
        ?.id.toString()}
      onValueChange={(value) => onValueChange(value)}
    >
      <SelectTrigger>
        <SelectValue placeholder="Select Doctor" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Doctors</SelectLabel>
          {doctors.map((d) => (
            <SelectItem
              key={d.id}
              value={d.id.toString()}
              disabled={disabledSelect && disabledSelect(d)}
            >
              {d.userOrganization.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
