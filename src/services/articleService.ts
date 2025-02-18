import {db} from "@/app/lib/db";
import {Article} from "@prisma/client";
import {ArticleDTO} from "@/dto/articleDTO";

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

export async function updateArticle(id: string, articleDTO: ArticleDTO): Promise<Article> {
    return db.article.update({
        where: {id},
        data: {
            name: articleDTO.name,
            image: articleDTO.image,
            price: articleDTO.price,
            unit: articleDTO.unit,
            description: articleDTO.description,
            category: {
                connect: {name: articleDTO.categoryName}
            },
        },
    });
}

export async function deleteArticle(id: string): Promise<Article> {
    return db.article.delete({
        where: {id},
    });
}

export async function getAllArticle(): Promise<Article[]> {
    return db.article.findMany();
}

export async function getArticleById(id: string): Promise<Article | null> {
    return db.article.findUnique({
        where: {id},
    });
}

export async function isArticleNameAlreadyExist(name: string): Promise<boolean> {
    const existingArticle = await db.article.findUnique({
        where: {name},
    });
    return !!existingArticle;
}

export async function isArticleAlreadyExist(id: string, name: string): Promise<Boolean> {
    const otherArticle = await db.article.findFirst({
        where: {
            name,
            id: {not: id}, // Vérifie que l'article trouvé n'est pas celui qu'on met à jour
        },
    });
    return !!otherArticle;
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