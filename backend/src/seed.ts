import bcrypt from "bcrypt";
import UserSchema, { User } from "./schemas/User";

const users: User[] = [
  {
    name: "Iftifar",
    email: "iftifar@example.com",
    password: "111",
    resetPasswordToken: undefined,
    resetPasswordExpiresAt: undefined,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "John",
    email: "john@example.com",
    password: "111",
    resetPasswordToken: undefined,
    resetPasswordExpiresAt: undefined,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

async function seedDB() {
  try {
    users.forEach(async (user: User) => {
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
