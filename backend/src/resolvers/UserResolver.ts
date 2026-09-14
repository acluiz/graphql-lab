import { Arg, Mutation, Query, Resolver } from "type-graphql";
import crypto from "crypto";

import { User } from "../models/User.js";

@Resolver()
export class UserResolver {
  private data: User[] = [];

  @Query(() => [User])
  async users(): Promise<User[]> {
    return this.data;
  }

  @Mutation(() => User)
  async createUser(@Arg("name", () => String) name: string): Promise<User> {
    const user = {
      id: crypto.randomUUID(),
      name: name,
    };

    this.data.push(user);

    return user;
  }
}
