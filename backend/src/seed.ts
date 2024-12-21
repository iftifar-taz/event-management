import bcrypt from "bcrypt";
import UserSchema, { IUser } from "./schemas/User";

const users: Partial<IUser>[] = [
  {
    name: "Iftifar",
    email: "iftifar@example.com",
    password: "111",
    resetPasswordToken: undefined,
    resetPasswordExpiresAt: undefined,
  },
  {
    name: "John",
    email: "john@example.com",
    password: "111",
    resetPasswordToken: undefined,
    resetPasswordExpiresAt: undefined,
  },
];

async function seedDB() {
  try {
    users.forEach(async (user: Partial<IUser>) => {
      user.password = await bcrypt.hash(user.password!, 10);
    });
    const userCount = await UserSchema.countDocuments();
    if (userCount === 0) {
      console.log("No users found. Seeding data...");
      await UserSchema.insertMany(users);
      console.log("Initial data seeded successfully.");
    } else {
      console.log("Database already contains users. Skipping seeding.");
    }
  } catch (err) {
    console.error("Error seeding data:", err);
  }
}

export default seedDB;
