-- AddForeignKey
ALTER TABLE "UserFollows" ADD CONSTRAINT "UserFollows_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
