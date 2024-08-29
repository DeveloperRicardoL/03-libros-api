/*
  Warnings:

  - You are about to drop the column `dateOfBirth` on the `author` table. All the data in the column will be lost.
  - Added the required column `birthdate` to the `author` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_author" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "nationality" TEXT NOT NULL,
    "birthdate" DATETIME NOT NULL
);
INSERT INTO "new_author" ("firstName", "id", "lastName", "nationality") SELECT "firstName", "id", "lastName", "nationality" FROM "author";
DROP TABLE "author";
ALTER TABLE "new_author" RENAME TO "author";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
