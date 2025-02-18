import { db } from "@/app/lib/db";

export async function isArticleAlreadyUsedInCart(id: string): Promise<Boolean> {
    const linkedCartItems = await db.cartItem.findFirst({
        where: {
            articleId: id, // Vérifie si l'article est présent dans un panier
        },
    });
    return !!linkedCartItems;
}