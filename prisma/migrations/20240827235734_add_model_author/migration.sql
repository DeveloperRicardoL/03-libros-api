-- CreateTable
CREATE TABLE "author" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "nationality" TEXT NOT NULL,
    "dateOfBirth" DATETIME NOT NULL
);
