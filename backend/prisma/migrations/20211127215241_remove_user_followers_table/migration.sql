/*
  Warnings:

  - You are about to drop the `UserFollowers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserFollowers" DROP CONSTRAINT "UserFollowers_userFollowerId_fkey";

-- DropTable
DROP TABLE "UserFollowers";
