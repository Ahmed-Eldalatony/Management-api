import { Category } from "../utils/enum";
import { UserDto } from "./UserDto";
export interface TaskDto {
  _id: string;
  title: string;
  description: string;
  checked: boolean;
  category: Category;
  user: UserDto;
}
