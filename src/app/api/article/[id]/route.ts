import { ArticleDTO } from "@/dto/articleDTO";
import { deleteArticle, getArticleById, isArticleAlreadyExist, updateArticle } from "@/services/articleService";
import { isArticleAlreadyUsedInCart } from "@/services/cartItemService";
import { getCategoryByName } from "@/services/categoryService";
import { isArticleAlreadyUsedInOrder } from "@/services/orderItemService";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

interface ArticleUpdateProps {
    params: { id: string }
}

// Récupérer un article par ID
export async function GET(_req: NextRequest, { params }: ArticleUpdateProps) {
    try {
        const { id } = params;

        // Vérification si l'ID est valide
        if (!id) {
            return NextResponse.json({ message: "L'ID de l'article est requis" }, { status: 400 });
        }

        // Recherche de l'article
        const article = await getArticleById(id);

        // Vérification si l'article existe
        if (!article) {
            return NextResponse.json({ message: "Article not found" }, { status: 404 });
        }

        return NextResponse.json(article, { status: 200 });
    } catch (error) {
        console.error("Failed to fetch article:", error);
        return NextResponse.json({ message: "Failed to fetch article" }, { status: 500 });
    }
}


// 2. Mettre à jour un article par ID

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = await params; // ✅ Correction : accès direct à `params`
        const body = await req.json();

        if (!id) {
            return NextResponse.json({ message: "L'ID de l'article est requis" }, { status: 400 });
        }

        // Recherche de l'article
        const existingArticle = await getArticleById(id);

        // Vérifier si l'article existe
        if (!existingArticle) {
            return NextResponse.json({ message: "Article introuvable" }, { status: 404 });
        }

        // Validation des champs autorisés
        const { name, image, description, price, unit, categoryName } = body;
        if (price !== undefined && (typeof price !== "number" || price <= 0)) {
            console.error(`❌ Le prix doit être un nombre positif`);
            return NextResponse.json({ message: "Le prix doit être un nombre positif" }, { status: 400 });
        }

        // Vérifier si une catégorie valide est fournie
        let category;
        if (categoryName) {
            category = await getCategoryByName(categoryName);

            if (!category) {
                console.error(`❌ La catégorie '${categoryName}' n'existe pas`);
                return NextResponse.json({ message: `La catégorie '${categoryName}' n'existe pas` }, { status: 400 });
            }
        }

        // Vérifier si un autre article avec le même nom existe déjà
        if (name && name !== existingArticle.name) {
            const articleWithSameName = await isArticleAlreadyExist(id, name);

            if (articleWithSameName) {
                console.error(`❌ Le nom '${name}' existe déjà sur un autre article`);
                return NextResponse.json(
                    { message: `Le nom '${name}' existe déjà sur un autre article` },
                    { status: 409 } // 409 Conflict
                );
            }
        }

        // Mettre à jour l'article
        const articleDTO: ArticleDTO = { name, image, price, unit, description, categoryName }
        const updatedArticle = await updateArticle(id, articleDTO);

        return NextResponse.json(updatedArticle, { status: 200 });
    } catch (error) {
        console.error("Erreur lors de la mise à jour de l'article:", error);

        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            return NextResponse.json({ message: "Erreur de base de données" }, { status: 500 });
        }

        return NextResponse.json({ message: "Erreur serveur lors de la mise à jour." }, { status: 500 });
    }
}


export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = await params;

        // 1️⃣ Vérification de l'ID
        if (!id) {
            console.error("❌ ID manquant !");
            return NextResponse.json({ message: "L'ID de l'article est requis" }, { status: 400 });
        }

        // 2️⃣ Vérifier si l'article existe
        const existingArticle = await getArticleById(id);
        if (!existingArticle) {
            console.error("❌ Article introuvable !");
            return NextResponse.json({ message: "Article introuvable" }, { status: 404 });
        }

        // 3️⃣ Vérifier si l'article est utilisé dans une commande via OrderItem
        const linkedOrderItems = await isArticleAlreadyUsedInOrder(id);
        if (linkedOrderItems) {
            return NextResponse.json(
                { message: "Impossible de supprimer l'article : Il est utilisé dans une commande." },
                { status: 400 }
            );
        }

        // 4️⃣ Vérifier si l'article est dans un panier
        const linkedCartItems = await isArticleAlreadyUsedInCart(id);
        if (linkedCartItems) {
            return NextResponse.json(
                { message: "Impossible de supprimer l'article : Il est présent dans un panier." },
                { status: 400 }
            );
        }

        // 4️⃣ Suppression de l'article
        await deleteArticle(id);

        return NextResponse.json({ message: "Article supprimé avec succès" }, { status: 200 });

    } catch (error) {
        console.error("Erreur lors de la suppression de l'article:", error);

        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2025") {
                return NextResponse.json({ message: "Article introuvable" }, { status: 404 });
            }
            return NextResponse.json({ message: "Erreur de base de données" }, { status: 500 });
        }

        return NextResponse.json({ message: "Erreur serveur lors de la suppression." }, { status: 500 });
    }
}
