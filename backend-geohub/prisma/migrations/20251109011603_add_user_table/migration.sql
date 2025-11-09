-- CreateTable
CREATE TABLE "User" (
    "use_id" SERIAL NOT NULL,
    "use_email" VARCHAR(255) NOT NULL,
    "use_password" VARCHAR(255) NOT NULL,
    "use_name" VARCHAR(100) NOT NULL,
    "use_role" VARCHAR(20) NOT NULL DEFAULT 'user',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("use_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_use_email_key" ON "User"("use_email");
