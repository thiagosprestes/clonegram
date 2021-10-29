-- CreateTable
CREATE TABLE "UserFollows" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "userFollowId" TEXT NOT NULL,

    CONSTRAINT "UserFollows_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserFollowers" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "userFollowerId" TEXT NOT NULL,

    CONSTRAINT "UserFollowers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserFollows" ADD CONSTRAINT "UserFollows_userFollowId_fkey" FOREIGN KEY ("userFollowId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFollowers" ADD CONSTRAINT "UserFollowers_userFollowerId_fkey" FOREIGN KEY ("userFollowerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
