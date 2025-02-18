import {NextRequest, NextResponse} from "next/server";
import {createCategory, getAllCategory, isCategoryNameAlreadyExist} from "@/services/categoryService";

// 1. Récupérer tous les categories
export async function GET() {
    try {
        const categories = await getAllCategory();
        return NextResponse.json(categories, {status: 200});
    } catch (error) {
        console.error("Error fetching categories:", error);
        return NextResponse.json(
            {error: "Failed to fetch categories"},
            {status: 500},
        );
    }
}

// 2. Ajouter une categorie
export async function POST(req: NextRequest) {
    try {
        const {name} = await req.json();

        // Validation champs obligatoires
        if (!name) {
            return NextResponse.json(
                {error: "Le nom est requis"},
                {status: 400},
            );
        }

        // Vérifier si la catégorie existe
        const existingCategory = await isCategoryNameAlreadyExist(name);

        if (existingCategory) {
            return NextResponse.json({message: "Catégorie existe déjà "}, {status: 409});
        }

        const newCategory = await createCategory(name)

        return NextResponse.json(newCategory, {status: 201});
    } catch (error) {
        return NextResponse.json(
            {error: "Failed to create category, " + error},
            {status: 500},
        );
    }
}