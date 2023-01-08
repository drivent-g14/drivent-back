-- CreateTable
CREATE TABLE "UserActivities" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "activitiesId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserActivities_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserActivities" ADD CONSTRAINT "UserActivities_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserActivities" ADD CONSTRAINT "UserActivities_activitiesId_fkey" FOREIGN KEY ("activitiesId") REFERENCES "Activities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
