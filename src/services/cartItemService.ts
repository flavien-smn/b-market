import { Cart, CartItem } from '@prisma/client';
import { prisma } from '@/lib/prisma';

export async function addOrUpdateCartItem(
	userId: string,
	articleId: string,
	quantity: number,
): Promise<CartItem> {
	// Validation de la quantité
	if (quantity < 0 || quantity > 99) {
		throw new Error('La quantité doit être comprise entre 0 et 99');
	}

	// Vérification que l'article existe
	const article = await prisma.article.findUnique({
		where: { id: articleId },
	});

	if (!article) {
		throw new Error('Article introuvable');
	}

	try {
		const cart = await getOrCreateCart(userId);
		const item = await getCartItem(cart.id, articleId);

		if (item) {
			return await updateCartItemQuantity(item.id, quantity);
		} else {
			return await addCartItemToCart(cart.id, articleId, quantity);
		}
	} catch (error) {
		throw new Error("Erreur lors de la modification d'un panier");
	}
}

async function addCartItemToCart(
	cartId: string,
	articleId: string,
	quantity: number,
) {
	return await prisma.cartItem.create({
		data: {
			cartId,
			articleId,
			quantity,
		},
	});
}

async function getOrCreateCart(userId: string): Promise<Cart> {
	const existingCart = await prisma.cart.findUnique({
		where: { userId },
	});
	if (existingCart) return existingCart;

	return await prisma.cart.create({
		data: {
			userId,
			cartItems: {
				create: [],
			},
		},
	});
}

async function getCartItem(cartId: string, articleId: string) {
	return await prisma.cartItem.findUnique({
		where: {
			cartId_articleId: {
				cartId,
				articleId,
			},
		},
	});
}

async function updateCartItemQuantity(itemId: string, quantity: number) {
	return await prisma.cartItem.update({
		where: { id: itemId },
		data: {
			quantity,
		},
	});
}

export async function removeCartItemByUserId(
	userId: string,
	articleId: string,
): Promise<Cart | null> {
	try {
		const cart = await getOrCreateCart(userId);
		const item = await getCartItem(cart.id, articleId);

		if (!item) return null;

		return await prisma.cart.update({
			where: { id: cart.id },
			data: {
				cartItems: {
					delete: { id: item.id },
				},
			},
		});
	} catch (error) {
		throw new Error("Erreur lors de la suppression de l'article du panier");
	}
}
