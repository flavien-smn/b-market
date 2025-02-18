import {db} from "@/app/lib/db";
import {Order} from "@prisma/client";

interface OrderItemInput {
    articleId: string;
    quantity: number;
    price: number;
}

// ✅ Créer une commande avec ses `orderItems` en cascade
export async function createOrder(userId: string, status: string, orderItems: OrderItemInput[]): Promise<Order> {
    // Calcul du total basé sur les articles envoyés
    const total = orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return db.order.create({
        data: {
            userId,
            status,
            total, // ✅ Mise à jour automatique du total
            orderItems: {
                create: orderItems.map((item) => ({
                    articleId: item.articleId,
                    quantity: item.quantity,
                    price: item.price,
                })),
            },
        },
        include: {orderItems: true},
    });
}

export async function updateOrderStatus(orderId: string, newStatus: "pending" | "awaiting_payment" | "completed" | "cancelled") {
    return db.order.update({
        where: {id: orderId},
        data: {status: newStatus},
    });
}

export async function deleteOrder(id: string): Promise<void> {
    await db.order.delete({where: {id}});
}

export async function getAllOrders(): Promise<Order[]> {
    return db.order.findMany({
        include: {
            orderItems: {
                include: {
                    article: true // Inclure l'article pour chaque orderItem
                }
            },
            user: true // Inclure l'utilisateur
        }
    });
}

/**
 *  🔴 Unused but don't delete
 */
export async function getOrderById(id: string): Promise<Order | null> {
    return db.order.findUnique({
        where: {id}, include: {
            orderItems: {
                include: {
                    article: true // Inclure l'article pour chaque orderItem
                }
            }
        }
    });
}

export async function getOrdersByUserId(userId: string): Promise<Order[]> {
    return db.order.findMany({where: {userId}, include: {orderItems: true}});
}

export async function isExistOrderByID(id: string): Promise<boolean> {
    const existingOrder = await db.order.findUnique({
        where: {id},
    });
    return !!existingOrder;
}
