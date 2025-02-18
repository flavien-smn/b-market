import {db} from "@/app/lib/db";
import {Category} from "@prisma/client";

export async function findCategoryByName(name: string, excludeId?: string): Promise<Category | null> {
    return db.category.findFirst({
        where: {
            name,
            ...(excludeId && { NOT: { id: excludeId } })
        },
    });
}

export async function isCategoryNameAlreadyExist(categoryName: string): Promise<boolean> {
    const category = await findCategoryByName(categoryName);
    return !!category;
}

export async function getAllCategory(): Promise<Category[]> {
    return db.category.findMany();
}

export async function getCategoryById(id: string): Promise<Category | null> {
    return db.category.findUnique({
        where: { id }
    });
}

export async function createCategory(name: string): Promise<Category> {
    return db.category.create({
        data: { name }
    });
}

export async function updateCategory(id: string, name: string): Promise<Category> {
    return db.category.update({
        where: { id },
        data: { name }
    });
}

export async function deleteCategory(id: string): Promise<Category> {
    return db.category.delete({
        where: { id }
    });
}