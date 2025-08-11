import { prisma } from '@/lib/prisma';
import { CartGetDto, CartItem } from '@/types/cart';

export async function getCartByUserId(
	userId: string,
): Promise<CartGetDto | null> {
	try {
		const cartClient = await prisma.cart.findUnique({
			where: { userId },
			include: {
				cartItems: {
					include: {
						article: {
							select: {
								id: true,
								name: true,
								price: true,
								image: true,
								unit: true,
							},
						},
					},
					orderBy: {
						createdAt: 'desc',
					},
				},
			},
		});

		if (!cartClient) {
			return null;
		}

		return {
			id: cartClient.id,
			userId: cartClient.userId,
			cartItems: cartClient.cartItems.map(cartItem => ({
				article: {
					id: cartItem.article.id,
					name: cartItem.article.name,
					price: cartItem.article.price,
					image: cartItem.article.image,
					unit: cartItem.article.unit,
				},
				quantity: cartItem.quantity,
			})),
		};
	} catch (error) {
		console.error(
			`[getCartByUserId] Erreur lors de la récupération du panier avec user ID ${userId}`,
			error,
		);
		throw new Error('Impossible de récupérer le panier.');
	}
}

export async function clearCartByUserId(
	userId: string,
): Promise<CartGetDto | null> {
	try {
		const cart = await prisma.cart.findUnique({
			where: { userId },
		});

		if (!cart) {
			return null;
		}

		return await prisma.cart.update({
			where: { id: cart.id }, // Utilisez l'ID unique du panier
			data: {
				cartItems: {
					deleteMany: {}, // Supprime tous les articles du panier
				},
			},
			include: {
				cartItems: {
					include: {
						article: {
							select: {
								id: true,
								name: true,
								price: true,
								image: true,
								unit: true,
							},
						},
					},
				},
			},
		});
	} catch (error) {
		console.error(
			`[clearCartByUserId] Erreur lors de la suppression du panier avec user ID ${userId}`,
			error,
		);
		throw new Error('Impossible de vider le panier.');
	}
}

export async function replaceCartByUserId(
	userId: string,
	cartItems: CartItem[],
): Promise<CartGetDto | null> {
	try {
		return await prisma.$transaction(async tx => {
			const cart = await tx.cart.findUnique({
				where: { userId },
			});

			if (!cart) {
				return null;
			}

			await tx.cartItem.deleteMany({
				where: { cartId: cart.id },
			});

			await tx.cartItem.createMany({
				data: cartItems.map((item, index) => ({
					cartId: cart.id,
					articleId: item.article.id!,
					quantity: item.quantity,
					createdAt: new Date(Date.now() - index * 1000),
				})),
			});

			return await getCartByUserId(userId);
		});
	} catch (error) {
		console.error(
			`[replaceCartByUserId] Erreur lors de la mise à jour du panier avec user ID ${userId}`,
			error,
		);
		throw new Error('Impossible de mettre à jour le panier.');
	}
}
