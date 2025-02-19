'use server'

import { deleteOrder, isExistOrderByID } from "@/services/orderService";
import { NextRequest, NextResponse } from "next/server";


// 🔴 DELETE → Supprimer une commande avec ses `OrderItems`
export async function DELETE(req: NextRequest, context: { params: { id: string } }) {
    try {
        // L'ID est directement accessible depuis params
        const params = await context.params;


        if (!params.id) {
            return NextResponse.json({ message: "L'ID de la commande est requis" }, { status: 400 });
        }

        const orderExist = await isExistOrderByID(params.id);

        if (!orderExist) {
            return NextResponse.json({ message: "Commande introuvable" }, { status: 404 });
        }

        await deleteOrder(params.id);
        return NextResponse.json({ message: "Commande supprimée avec succès" }, { status: 200 });
    } catch (error) {
        // Modification de la gestion d'erreur
        const errorMessage = error instanceof Error ? error.message : "Erreur inconnue";
        console.error("Erreur lors de la suppression de la commande :", errorMessage);

        return NextResponse.json(
            { message: "Erreur serveur lors de la suppression", error: errorMessage },
            { status: 500 }
        );
    }
}