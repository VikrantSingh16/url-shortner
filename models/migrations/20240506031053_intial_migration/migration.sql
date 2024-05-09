-- CreateTable
CREATE TABLE "shortUrlSchema" (
    "id" SERIAL NOT NULL,
    "shortURL" TEXT NOT NULL,
    "URL" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "shortUrlSchema_pkey" PRIMARY KEY ("id")
);
