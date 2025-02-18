import { db } from "@/app/lib/db";

export async function isArticleAlreadyUsedInOrder(id: string): Promise<Boolean> {
    const linkedOrderItems = await db.orderItem.findFirst({
        where: {
            articleId: id, // Vérifie si cet article est utilisé dans une commande
        },
    });
    return !!linkedOrderItems;
}