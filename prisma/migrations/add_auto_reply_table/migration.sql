CREATE TABLE "AutoReply" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  "integrationId" TEXT,
  "mediaId" TEXT NOT NULL,
  "targetText" TEXT NOT NULL,
  "replyText" TEXT NOT NULL,
  "media_url" TEXT NOT NULL,
  "media_type" TEXT NOT NULL,
  "alwaysReply" BOOLEAN NULL DEFAULT false
  "createdAt" TIMESTAMP DEFAULT now(),
  "updatedAt" TIMESTAMP DEFAULT now(),
  CONSTRAINT "AutoReply_integrationId_fkey" FOREIGN KEY ("integrationId") REFERENCES "Integration"("id") ON DELETE SET NULL
);
