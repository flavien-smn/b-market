import { orderDTO } from './order';
import { z } from 'zod';

export interface User {
	id: string;
	firstname: string;
	lastname: string;
	email: string;
	phone?: string | null;
	createdAt: Date;
	orders?: orderDTO[];
}

export interface UserPut {
	id: string;
	firstname: string;
	lastname: string;
	email: string;
	phone?: string | null;
}

export interface UserPost {
	firstname: string;
	lastname: string;
	email: string;
	phone?: string | null;
}

export interface UserDelete {
	id: string;
	firstname: string;
	lastname: string;
	email: string;
	phone?: string | null;
}

// types/user.ts
export const signUpSchema = z
	.object({
		firstname: z
			.string()
			.min(2, { message: 'Le prénom doit contenir au moins 2 caractères' }),
		lastname: z
			.string()
			.min(2, { message: 'Le nom doit contenir au moins 2 caractères' }),
		phone: z.string().optional(),
		email: z.string().email({ message: 'Adresse email invalide' }),
		confirmEmail: z.string().email({ message: 'Adresse email invalide' }),
		password: z.string().min(8, {
			message: 'Le mot de passe doit contenir au moins 8 caractères',
		}),
		confirmPassword: z.string(),
	})
	.refine(data => data.email === data.confirmEmail, {
		message: 'Les adresses email ne correspondent pas',
		path: ['confirmEmail'],
	})
	.refine(data => data.password === data.confirmPassword, {
		message: 'Les mots de passe ne correspondent pas',
		path: ['confirmPassword'],
	});

export const signInSchema = z.object({
	email: z.string().email({
		message: "L'adresse email est pas valide.",
	}),
	password: z.string().min(8, {
		message: 'Le mot de passe doit faire 8 caractères minimum.',
	}),
});
