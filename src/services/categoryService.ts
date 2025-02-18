import {db} from "@/app/lib/db";

export async function isCategoryNameAlreadyExist(categoryName: string): Promise<boolean> {
    const existingArticle = await db.category.findUnique({
        where: {name: categoryName},
    });
    return !!existingArticle;
}