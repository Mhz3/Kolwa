import "dotenv/config";
import { db } from "../src/prisma/db";

async function main() {
  const facility = await db.orm.public.Facility.where({
    code: "DEMO-001",
  }).first();

  if (!facility) {
    throw new Error("DEMO-001 facility not found.");
  }

  const user = await db.orm.public.User.create({
    firstName: "Alex",
    lastName: "Rivera",
    email: "alex.rivera@example.com",
    role: "FACILITIES_MANAGER",
    department: "Facilities",
    facilityId: facility.id,
  });

  const asset = await db.orm.public.Asset.create({
    assetCode: "GEN-001",
    name: "Emergency Generator #1",
    category: "Emergency Power",
    location: "Central Plant",
    manufacturer: "Demo Manufacturer",
    facilityId: facility.id,
  });

  console.log("Created user:");
  console.log(user);

  console.log("Created asset:");
  console.log(asset);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
