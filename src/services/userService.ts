import { db } from "@/app/lib/db";

export async function softDeleteUser(userId: string): Promise<void> {
    await db.$transaction(async (tx) => {
        // 1. Marquer l'utilisateur comme supprimé
        await tx.user.update({
            where: { id: userId },
            data: {
                isDeleted: true,
                email: `deleted_${userId}@archived.com`, // Pour éviter les conflits d'email unique
                name: "Utilisateur supprimé",
                password: "" // Optionnel : vider le mot de passe pour plus de sécurité
            }
        });

        // 2. Supprimer son panier (grâce au onDelete: Cascade)
        if (await tx.cart.findFirst({ where: { userId } })) {
            await tx.cart.delete({
                where: { userId }
            });
        }
    });
}

