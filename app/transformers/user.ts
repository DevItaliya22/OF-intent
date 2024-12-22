import { Transformer } from "@intentjs/core";
import { UserModel } from "app/models/userModel";

export class UserTransformer extends Transformer {
  async transform(user: UserModel[]): Promise<Record<string, any> | null> {
     const transformedUsers = user.map((user) => {
      return {
        id: user.id,
        name: `${user.firstName} ${user.lastName}`, // Combine firstName and lastName
        email: user.email,
        created_at: user.createdAt, // Standardized key for creation date
        updated_at: user.updatedAt, // Standardized key for update date
      };
    });

    return { data: transformedUsers };
  }
}
