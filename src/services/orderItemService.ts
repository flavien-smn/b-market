import { db } from "@/app/lib/db";

export async function isArticleAlreadyUsedInOrder(id: string): Promise<Boolean> {
    const linkedOrderItems = await db.orderItem.findFirst({
        where: {
            articleId: id, // Vérifie si cet article est utilisé dans une commande
        },
    });
    return !!linkedOrderItems;
}

export async function getOrderItemsByOrderId(orderId: string) {
    const orderWithArticles = await db.order.findUnique({
        where: {
            id: orderId
        },
        include: {
            orderItems: {
                include: {
                    article: true
                }
            }
        }
    });

    if (!orderWithArticles) {
        return [];
    }

    return orderWithArticles.orderItems.map(item => ({
        ...item.article,
        quantity: item.quantity,
        price: item.price
    }));
}
