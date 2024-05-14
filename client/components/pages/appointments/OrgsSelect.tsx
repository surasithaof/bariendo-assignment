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
import { Organization } from "@/lib/types/org.type";

export function OrgsSelect({
  orgs,
  defaultValue,
  onValueChange,
  disabledSelect,
}: {
  orgs: Organization[];
  defaultValue?: number;
  onValueChange: (value: string) => void;
  disabledSelect?: (org: Organization) => boolean;
}) {
  return (
    <Select
      value={orgs.find((org) => org.id === defaultValue)?.id.toString()}
      onValueChange={(value) => onValueChange(value)}
    >
      <SelectTrigger>
        <SelectValue placeholder="Select organization" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Organizations</SelectLabel>
          {orgs.map((org) => (
            <SelectItem
              key={org.id}
              value={org.id.toString()}
              disabled={disabledSelect && disabledSelect(org)}
            >
              {org.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
