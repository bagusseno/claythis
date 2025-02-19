-- DropForeignKey
ALTER TABLE "Menu" DROP CONSTRAINT "Menu_parent_id_fkey";

-- AddForeignKey
ALTER TABLE "Menu" ADD CONSTRAINT "Menu_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "Menu"("id") ON DELETE CASCADE ON UPDATE CASCADE;
