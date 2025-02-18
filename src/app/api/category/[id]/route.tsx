import { hasArticlesInCategory } from "@/services/articleService";
import { deleteCategory, findCategoryByName, getCategoryById, updateCategory } from "@/services/categoryService";
import { NextResponse } from "next/server";


export async function DELETE(req: Request, context: { params: { id: string } }) {

    const params = await context.params;

    if (!params.id) {
        return NextResponse.json({ message: "ID de catégorie manquant" }, { status: 400 });
    }

    const id = String(params.id);

    try {
        const existingCategory = await getCategoryById(id);

        if (!existingCategory) {
            return NextResponse.json({ message: "Catégorie non trouvée" }, { status: 404 });
        }

        const hasArticles = await hasArticlesInCategory(id);
        if (hasArticles) {
            return NextResponse.json(
                { message: "Impossible de supprimer cette catégorie : des articles y sont encore liés." },
                { status: 409 }
            );
        }

        await deleteCategory(id);
        return NextResponse.json({ message: "Catégorie supprimée avec succès" }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: "Erreur interne lors de la suppression" }, { status: 500 });
    }
}

// 4. Mettre à jour une catégorie par ID
export async function PUT(req: Request, context: { params: { id: string } }) {
    const params = await context.params;
    try {
        const { id } = params;
        const { name } = await req.json();

        // Validation : vérifier si le champ "name" est fourni
        if (!name) {
            return NextResponse.json(
                { message: "Le nom est requis." },
                { status: 400 }
            );
        }

        const existingCategory = await getCategoryById(id);

        if (!existingCategory) {
            return NextResponse.json(
                { message: "Catégorie introuvable." },
                { status: 404 }
            );
        }

        const duplicateCategory = await findCategoryByName(name, id);

        if (duplicateCategory) {
            return NextResponse.json(
                { message: "Une catégorie avec ce nom existe déjà." },
                { status: 409 }
            );
        }
        // Mise à jour de la catégorie
        const updatedCategory = await updateCategory(id, name);

        return NextResponse.json(updatedCategory, { status: 200 });
    } catch (error) {
        console.error("Erreur lors de la mise à jour de la catégorie", error);
        return NextResponse.json(
            { message: "Erreur serveur lors de la mise à jour." },
            { status: 500 }
        );
    }
}