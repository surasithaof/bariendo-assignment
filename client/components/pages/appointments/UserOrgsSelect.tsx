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
import { UserOrganization } from "@/lib/types/user.type";

export function UserOrgsSelect({
  orgs,
  selectedOrg,
  onValueChange,
}: {
  orgs: UserOrganization[];
  selectedOrg?: UserOrganization;
  onValueChange: (value: string) => void;
}) {
  return (
    <Select
      value={selectedOrg?.id.toString()}
      onValueChange={(value) => onValueChange(value)}
    >
      <SelectTrigger>
        <SelectValue placeholder="Select organization" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Organizations</SelectLabel>
          {orgs.map((org) => (
            <SelectItem key={org.id} value={org.id.toString()}>
              {org.organization?.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
