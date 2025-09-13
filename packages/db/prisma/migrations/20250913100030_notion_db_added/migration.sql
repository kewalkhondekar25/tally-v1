-- CreateTable
CREATE TABLE "NotionDb" (
    "id" TEXT NOT NULL,
    "formId" TEXT NOT NULL,
    "notionDbId" TEXT NOT NULL,
    "notionDbUrl" TEXT NOT NULL,

    CONSTRAINT "NotionDb_pkey" PRIMARY KEY ("id")
);
