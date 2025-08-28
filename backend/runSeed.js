#!/usr/bin/env node

const { seedDatabase } = require("./seedData");

console.log("🌱 Starting database seeding...");
console.log(
  "This will clear all existing data and insert mock data for testing."
);
console.log(
  "Make sure your MongoDB server is running and your .env file is configured.\n"
);

// Ask for confirmation
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(
  "Do you want to continue? This will DELETE all existing data! (yes/no): ",
  async (answer) => {
    if (answer.toLowerCase() === "yes" || answer.toLowerCase() === "y") {
      console.log("\n🚀 Starting seeding process...\n");
      try {
        await seedDatabase();
        console.log("\n✅ Database seeded successfully!");
        console.log("\n📝 Test Accounts:");
        console.log("   Email: john@example.com, Password: password123");
        console.log("   Email: jane@example.com, Password: password123");
        console.log("   Email: mike@example.com, Password: password123");
        console.log(
          "\n🎯 You can now test the application with this mock data!"
        );
      } catch (error) {
        console.error("\n❌ Error seeding database:", error.message);
        process.exit(1);
      }
    } else {
      console.log("\n❌ Seeding cancelled.");
    }
    rl.close();
  }
);
