import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';

export async function DELETE(
	req: NextRequest,
	{ params }: { params: Promise<{ id: string }> },
) {
	try {
		const session = await auth();
		if (!session || !session.user.isAdmin) {
			return NextResponse.json(
				{ message: 'action non autorisée' },
				{ status: 403 },
			);
		}
		const userId = (await params).id;

		const existingUser = await prisma.user.findUnique({
			where: { id: userId },
		});
		if (!existingUser) {
			return NextResponse.json(
				{ message: 'Utilisateur introuvable.' },
				{ status: 404 },
			);
		}

		await prisma.user.delete({ where: { id: userId } });

		return NextResponse.json(
			{ message: 'Utilisateur supprimé avec succès.' },
			{ status: 200 },
		);
	} catch (error) {
		console.error('Erreur lors de la suppression de l’utilisateur:', error);
		return NextResponse.json({ message: 'Erreur serveur' }, { status: 500 });
	}
}

export async function PUT(
	req: NextRequest,
	{ params }: { params: Promise<{ id: string }> },
) {
	try {
		const userId = (await params).id;
		const { firstname, lastname, email, phone } = await req.json();

		if (!firstname || !lastname || !email) {
			return NextResponse.json(
				{ message: 'Les champs "nom" et "email" sont requis.' },
				{ status: 400 },
			);
		}

		const updatedUser = await prisma.user.update({
			where: { id: userId },
			data: { firstname, lastname, email, phone },
		});

		return NextResponse.json(updatedUser, { status: 200 });
	} catch (error) {
		console.error('Erreur lors de la mise à jour de l’utilisateur:', error);
		return NextResponse.json({ message: 'Erreur serveur' }, { status: 500 });
	}
}
