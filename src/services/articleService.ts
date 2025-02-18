import {db} from "@/app/lib/db";
import {Article} from "@prisma/client";
import {ArticleDTO} from "@/dto/articleDTO";

export async function getAllArticle(): Promise<Article[]> {
    return db.article.findMany();
}


export async function createArticle(article: ArticleDTO): Promise<Article> {
    return db.article.create({
        data: {
            name: article.name,
            image: article.image || "", // Fournir une valeur par défaut pour éviter l'erreur
            price: article.price,
            unit: article.unit,
            description: article.description || "", // Fournir une valeur par défaut
            category: {
                connect: {name: article.categoryName}, // Associer à une catégorie existante
            },
        },
    });
}


export async function isArticleNameAlreadyExist(name: string): Promise<boolean> {
    const existingArticle = await db.article.findUnique({
        where: {name},
    });
    return !!existingArticle;
}

export async function hasArticlesInCategory(categoryId: string): Promise<boolean> {
    const count = await db.article.count({
        where: {
            category: {
                id: categoryId
            }
        }
    });
    return count > 0;
}