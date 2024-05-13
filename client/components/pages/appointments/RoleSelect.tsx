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
import { UserRole } from "@/lib/types/auth.enum";

export function RoleSelect({
  selectedRole,
  onValueChange,
}: {
  selectedRole?: UserRole;
  onValueChange: (value: string) => void;
}) {
  return (
    <Select
      value={selectedRole}
      onValueChange={(value) => onValueChange(value)}
    >
      <SelectTrigger>
        <SelectValue placeholder="Select your role" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Organizations</SelectLabel>
          <SelectItem key={UserRole.Doctor} value={UserRole.Doctor}>
            {UserRole.Doctor}
          </SelectItem>
          <SelectItem key={UserRole.Patient} value={UserRole.Patient}>
            {UserRole.Patient}
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
