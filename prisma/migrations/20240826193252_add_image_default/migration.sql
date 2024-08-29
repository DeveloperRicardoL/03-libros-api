-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Book" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL DEFAULT 'Sin titulo',
    "year" INTEGER NOT NULL,
    "publisher" TEXT NOT NULL,
    "image" TEXT NOT NULL DEFAULT 'Sin imagen',
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Book" ("createAt", "id", "image", "publisher", "title", "year") SELECT "createAt", "id", coalesce("image", 'Sin imagen') AS "image", "publisher", "title", "year" FROM "Book";
DROP TABLE "Book";
ALTER TABLE "new_Book" RENAME TO "Book";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
