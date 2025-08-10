-- CreateTable
CREATE TABLE "FormFields" (
    "id" TEXT NOT NULL,
    "formId" TEXT NOT NULL,
    "blockId" INTEGER NOT NULL,
    "blockName" TEXT NOT NULL,
    "blockIndex" INTEGER NOT NULL,
    "blockQuestion" TEXT NOT NULL,
    "blockPlaceholder" TEXT NOT NULL,
    "blockOptions" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FormFields_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FieldResponses" (
    "id" TEXT NOT NULL,
    "formFieldId" TEXT NOT NULL,
    "responsesId" TEXT NOT NULL,
    "answer" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FieldResponses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Responses" (
    "id" TEXT NOT NULL,
    "formId" TEXT NOT NULL,

    CONSTRAINT "Responses_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FieldResponses_formFieldId_key" ON "FieldResponses"("formFieldId");

-- CreateIndex
CREATE UNIQUE INDEX "FieldResponses_responsesId_key" ON "FieldResponses"("responsesId");

-- AddForeignKey
ALTER TABLE "FormFields" ADD CONSTRAINT "FormFields_formId_fkey" FOREIGN KEY ("formId") REFERENCES "File"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FieldResponses" ADD CONSTRAINT "FieldResponses_formFieldId_fkey" FOREIGN KEY ("formFieldId") REFERENCES "FormFields"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FieldResponses" ADD CONSTRAINT "FieldResponses_responsesId_fkey" FOREIGN KEY ("responsesId") REFERENCES "Responses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Responses" ADD CONSTRAINT "Responses_formId_fkey" FOREIGN KEY ("formId") REFERENCES "File"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
