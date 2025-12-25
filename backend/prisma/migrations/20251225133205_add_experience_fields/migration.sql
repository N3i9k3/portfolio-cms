/*
  Warnings:

  - Added the required column `company` to the `Experience` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Experience` table without a default value. This is not possible if the table is not empty.
  - Added the required column `duration` to the `Experience` table without a default value. This is not possible if the table is not empty.
  - Added the required column `message` to the `Testimonial` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Experience" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "role" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "description" TEXT NOT NULL
);
INSERT INTO "new_Experience" ("id", "role") SELECT "id", "role" FROM "Experience";
DROP TABLE "Experience";
ALTER TABLE "new_Experience" RENAME TO "Experience";
CREATE TABLE "new_Testimonial" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "message" TEXT NOT NULL
);
INSERT INTO "new_Testimonial" ("id", "name") SELECT "id", "name" FROM "Testimonial";
DROP TABLE "Testimonial";
ALTER TABLE "new_Testimonial" RENAME TO "Testimonial";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
