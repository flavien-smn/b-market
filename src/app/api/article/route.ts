import { ArticleDTO } from "@/dto/articleDTO";
import { createArticle, getAllArticle, isArticleNameAlreadyExist } from "@/services/articleService";
import { isCategoryNameAlreadyExist } from "@/services/categoryService";
import { NextRequest, NextResponse } from "next/server";

// 1. Récupérer tous les articles
export async function GET() {
    try {
        const articles = await getAllArticle();
        return NextResponse.json(articles, { status: 200 });
    } catch (error) {
        console.error("Erreur lors de la récupération des articles :", error);
        return NextResponse.json(
            { message: "Échec de la récupération des articles" },
            { status: 500 }
        );
    }
}

// 2. Ajouter un article
export async function POST(req: NextRequest) {
    try {
        // Récupération du JSON
        const body = await req.json();
        const { name, image, description, price, unit, categoryName } = body;

        // Vérification si le corps de la requête est vide
        if (!body) {
            return NextResponse.json(
                { message: "Le corps de la requête est vide ou invalide" },
                { status: 400 }
            );
        }

        // Validation des champs obligatoires
        if (!name || !price || !categoryName || !unit) {
            console.error(!name, !price, !categoryName, !unit);
            return NextResponse.json(
                { message: "Le nom, le prix, l'unité et la catégorie sont requis" },
                { status: 400 }
            );
        }

        // Vérifier que le champ "price" est du type attendu (nombre)
        if (typeof price !== "number" || price <= 0) {
            return NextResponse.json(
                { message: "Le prix doit être un nombre positif" },
                { status: 400 }
            );
        }

        // Vérifier si un article avec le même nom existe déjà
        const existingArticle = await isArticleNameAlreadyExist(name)

        if (existingArticle) {
            return NextResponse.json(
                { message: `Un article portant le nom '${name}' existe déjà` },
                { status: 409 } // 409 Conflict
            );
        }

        // Vérifier si la catégorie existe
        const isCategoryNameExist = isCategoryNameAlreadyExist(categoryName);
        if (!isCategoryNameExist) {
            return NextResponse.json(
                { message: `La catégorie '${categoryName}' n'existe pas` },
                { status: 400 }
            );
        }

        // Création de l'article
        const newArticle: ArticleDTO = { name, image, price, unit, description, categoryName }
        await createArticle(newArticle);

        return NextResponse.json(newArticle, { status: 201 });
    } catch
    (error) {
        console.error("Échec de la création de l'article :", error);

        // Vérification de l'erreur pour un diagnostic plus précis
        if (error instanceof SyntaxError) {
            return NextResponse.json(
                { message: "Format JSON invalide" },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { message: "Échec de la création de l'article" },
            { status: 500 }
        );
    }
}
