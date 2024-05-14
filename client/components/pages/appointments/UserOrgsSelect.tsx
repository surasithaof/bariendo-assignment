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
import { UserOrganization } from "@/lib/types/user.type";

export function UserOrgsSelect({
  userOrgs,
  defaultValue,
  onValueChange,
  disabledSelect,
}: {
  userOrgs: UserOrganization[];
  defaultValue?: number;
  onValueChange: (value: string) => void;
  disabledSelect?: (org: UserOrganization) => boolean;
}) {
  return (
    <Select
      value={userOrgs.find((org) => org.id === defaultValue)?.id.toString()}
      onValueChange={(value) => onValueChange(value)}
    >
      <SelectTrigger>
        <SelectValue placeholder="Select organization" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Organizations</SelectLabel>
          {userOrgs.map((uo) => (
            <SelectItem
              key={uo.id}
              value={uo.id.toString()}
              disabled={disabledSelect && disabledSelect(uo)}
            >
              {uo.organization?.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
