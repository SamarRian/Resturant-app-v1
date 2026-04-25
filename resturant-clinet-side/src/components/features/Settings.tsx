import { Field, FieldLabel } from "../ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

function Settings() {
  return (
    <Field>
      <FieldLabel className="font-bold" htmlFor="form-country">
        Display in POS
      </FieldLabel>
      <Select defaultValue="yes">
        <SelectTrigger id="Pos-select">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="yes">Yes</SelectItem>
          <SelectItem value="no">No</SelectItem>
        </SelectContent>
      </Select>
    </Field>
  );
}

export default Settings;
