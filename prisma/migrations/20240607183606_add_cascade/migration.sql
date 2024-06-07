-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UsersInWorkspace" (
    "userId" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,
    "assignedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedBy" TEXT NOT NULL,

    PRIMARY KEY ("userId", "workspaceId"),
    CONSTRAINT "UsersInWorkspace_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "UsersInWorkspace_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_UsersInWorkspace" ("assignedAt", "assignedBy", "userId", "workspaceId") SELECT "assignedAt", "assignedBy", "userId", "workspaceId" FROM "UsersInWorkspace";
DROP TABLE "UsersInWorkspace";
ALTER TABLE "new_UsersInWorkspace" RENAME TO "UsersInWorkspace";
PRAGMA foreign_key_check("UsersInWorkspace");
PRAGMA foreign_keys=ON;
