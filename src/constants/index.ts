import { FAQItem } from '@/types/faq';
import {
	ChefHat,
	Clock,
	HandPlatter,
	ShoppingBag,
	Sparkles,
	Truck,
} from 'lucide-react';

import CartSummaryStep from '@/components/site/checkout/steps/cart-summary-step';
import InfoOrderStep from '@/components/site/checkout/steps/info-order-step';
import ConfirmationOrderStep from '@/components/site/checkout/steps/confirmation-order-step';

export const CHECKOUT_STEPS = [
	{
		key: 'cart',
		title: 'Panier',
		component: CartSummaryStep,
		icon: 'shopping-bag',
	},
	{
		key: 'information',
		title: 'Informations de commande',
		component: InfoOrderStep,
		icon: 'file-box',
	},
	// {
	// 	key: 'recapOrder',
	// 	title: 'Recapitulatif de la commande',
	// 	component: RecapOrderStep,
	// 	icon: 'credit-card',
	// },
	// {
	// 	key: 'payment',
	// 	title: 'Paiement',
	// 	component: PaymentFormStep,
	// 	icon: 'credit-card',
	// },
	{
		key: 'confirmation',
		title: 'Confirmation',
		component: ConfirmationOrderStep,
		icon: 'check-check',
	},
] as const;

export const GENERAL_INFO = {
	address: '39 Avenue du Vercors, 38600 Fontaine',
	phone: '04 38 86 15 65',
	email: 'bouissailyass@gmail.com',
	openingHours: [
		{
			days: 'Mardi - Dimanche',
			hours: ['9h00 - 13h00', '15h00 - 19h30'],
		},
		{
			days: 'Lundi',
			hours: ['Fermé'],
		},
	],
};

export const LES_VALEURS = [
	{
		id: 1,
		icon: ChefHat,
		title: 'Savoir-faire',
		description:
			'Un savoir-faire unique dans la préparation des viandes, géré par un boucher expérimenté',
	},
	{
		id: 2,
		icon: Sparkles,
		title: 'Qualité',
		description:
			"Sélection rigoureuse des meilleures viandes, volaille de Drôme et bovin d'Allier.",
	},
	{
		id: 3,
		icon: HandPlatter,
		title: 'Service',
		description:
			'Conseils personnalisés et préparations sur mesure, adaptés à vos besoins.',
	},
];

export const MENU_ITEMS = [
	{ label: 'Accueil', href: '/' },
	{ label: 'Nos Produits', href: '/products' },
	{ label: 'Recettes', href: '/recipes' },
	{ label: 'Événements', href: '/events' },
	{ label: 'Contact', href: '/contact' },
];

export const PRODUCTS = [
	{
		image: 'https://images.unsplash.com/photo-1603048297172-c92544798d5a?auto=format&fit=crop&w=800&q=80',
		title: 'Viande Fraîche',
		description: 'Bœuf, veau et agneau de première qualité',
	},
	{
		image: 'https://images.unsplash.com/photo-1608039829572-78524f79c4c7?auto=format&fit=crop&w=800&q=80',
		title: 'Volaille',
		description: 'Poulet, dinde et autres volailles halal',
	},
	{
		image: 'https://images.unsplash.com/photo-1591674061999-e5ea4778945d?auto=format&fit=crop&w=800&q=80',
		title: 'Préparations Maison',
		description: 'Merguez, kefta et autres spécialités',
	},
];

export const CLICK_COLLECT_STEPS = [
	{
		icon: ShoppingBag,
		title: '1. Commandez',
		description: 'Sélectionnez vos produits en ligne',
	},
	{
		icon: Clock,
		title: '2. Choisissez',
		description: 'Sélectionnez votre créneau de retrait',
	},
	{
		icon: Truck,
		title: '3. Retirez',
		description: 'Récupérez votre commande en magasin',
	},
];

export const eventTypes = [
	{
		id: '1',
		title: 'Mariages',
		description: 'Viande de qualité supérieure pour votre jour spécial',
		image: '/images/mariage.webp',
		features: [
			'Découpes sur mesure selon vos besoins',
			"Livraison le jour de l'événement",
			'Conseils personnalisés sur les quantités',
			'Viande halal',
		],
	},
	{
		id: '2',
		title: 'Fêtes religieuses',
		description: "Viande halal pour l'Aïd et autres célébrations religieuses",
		image: '/images/religieux.webp',
		features: [
			'Viande halal certifiée',
			"Découpe de moutons entiers pour l'Aïd al-Adha",
			'Préparation selon les traditions',
			"Réservation à l'avance pour garantir la disponibilité",
		],
	},
	{
		id: '3',
		title: "Événements d'entreprise",
		description: 'Solutions pour vos réceptions et événements professionnels',
		image: '/images/afterwork.webp',
		features: [
			'Grandes quantités disponibles',
			'Options de livraison pour les entreprises',
			'Facturation simplifiée',
			'Devis personnalisés selon vos besoins',
		],
	},
	{
		id: '4',
		title: 'Célébrations familiales',
		description: 'Pour vos réunions de famille et fêtes entre amis',
		image: '/images/famille.webp',
		features: [
			"Portions adaptées à votre nombre d'invités",
			'Préparations spéciales sur demande',
			'Conseils de cuisson offerts',
			'Options économiques disponibles',
		],
	},
];
export const FAQ_DATA: FAQItem[] = [
	{
		question: 'Quels modes de paiement acceptez-vous ?',
		answer:
			'Les paiements en ligne ne sont malheureusement pas disponibles pour le moment. Sur place, nous acceptons les paiements par carte bancaire, carte restaurant, espèces et chèques. Pour les commandes importantes ou sur mesure, un acompte peut être demandé.',
	},
	{
		question: 'Est-il possible de retourner un produit ?',
		answer:
			"En vertu de l'Article L121-20-2 du code de la consommation, le droit de rétractation ne s'applique pas pour les livraisons de produits frais périssables. En conséquence, une demande d'annulation de commande pour le non-respect du créneau horaire de livraison prévu n'est pas recevable.",
	},
	{
		question: 'Puis-je annuler ma commande ?',
		answer:
			"Oui, vous pouvez annuler votre commande avant qu'elle ne soit expédiée. Après l'expédition, il faudra procéder à un retour une fois l'article reçu.",
	},
	{
		question: "Quels sont les horaires d'ouverture de la boucherie ?",
		answer:
			"Nous sommes ouverts du lundi au samedi, de 8h00 à 19h00, et fermés le dimanche. Pendant les jours fériés, nos horaires peuvent varier. Consultez notre site ou contactez-nous pour plus d'informations.",
	},
	{
		question: "Est-il possible de passer des commandes à l'avance ?",
		answer:
			"Oui, vous pouvez passer vos commandes à l'avance en ligne via notre système de click-and-collect ou par téléphone. Il suffit de préciser les produits souhaités et la quantité. Vous pourrez récupérer votre commande à la boucherie à l'heure convenue.",
	},
	{
		question: 'Livrez-vous à domicile ?',
		answer:
			'Actuellement, nous proposons uniquement un service de click-and-collect. Vous pouvez passer votre commande en ligne et venir la récupérer directement à la boucherie. La livraison à domicile pourrait être disponible prochainement.',
	},
	{
		question: 'Quels types de viande proposez-vous ?',
		answer:
			"Nous proposons une large gamme de viandes, dont du bœuf, du veau, de l'agneau, du poulet etc. Nous avons également des spécialités comme des paupiette de veau maison, des brochettes et des plats préparés.",
	},
	{
		question: "Les viandes sont-elles d'origine locale ?",
		answer:
			"Nous travaillons avec des éleveurs locaux et régionaux pour garantir des produits de qualité et d'origine contrôlée. La majorité de nos viandes provient de fermes environnantes qui respectent des normes strictes en matière de bien-être animal.",
	},
	{
		question: 'Faites-vous des produits halal ?',
		answer:
			"Nous proposons de la viande halal, préparée selon les règles strictes de l'abattage rituel. Si vous avez des besoins spécifiques, n'hésitez pas à nous le signaler lors de votre commande.",
	},
	{
		question: 'Comment savoir si un produit est disponible ?',
		answer:
			'Vous pouvez consulter la disponibilité des produits directement sur notre site lors de la commande en ligne, ou nous appeler pour vérifier. Notre boucher met régulièrement à jour les produits en stock.',
	},
	{
		question: 'Proposez-vous des offres spéciales ou des réductions ?',
		answer:
			'Nous pouvons proposer des offres spéciales sur certains produits. Suivez-nous sur les réseaux sociaux ou inscrivez-vous à notre newsletter pour être informé de nos promotions.',
	},
	{
		question:
			'Puis-je vous contacter pour des conseils sur la préparation ou la cuisson ?',
		answer:
			'Bien sûr ! Nous sommes heureux de partager des conseils sur la préparation et la cuisson de nos viandes. Demandez nous lors de votre visite.',
	},
];

export const FAQ_DATA_EVENTS: { question: string; answer: string }[] = [
	{
		question: "Combien de temps à l'avance dois-je réserver ?",
		answer:
			"Nous recommandons de réserver au moins 2 semaines à l'avance pour les petits événements et 1 mois pour les grands événements comme les mariages.",
	},
	{
		question: 'Proposez-vous de la viande halal ?',
		answer:
			'Oui, toute notre viande est halal et certifiée selon les normes religieuses.',
	},
	{
		question: 'Livrez-vous à domicile ?',
		answer:
			'Actuellement, nous proposons uniquement un service de click-and-collect. Vous pouvez passer votre commande en ligne et venir la récupérer directement à la boucherie. La livraison à domicile pourrait être disponible prochainement.',
	},
	{
		question: 'Quelle quantité commander pour mon événement ?',
		answer:
			"Nous vous conseillons sur les quantités en fonction du nombre d'invités et du type d'événement. Contactez-nous pour une estimation personnalisée.",
	},
	{
		question: 'Puis-je modifier ma commande après confirmation ?',
		answer:
			"Oui, vous pouvez modifier votre commande jusqu'à 48 heures avant la date de livraison.",
	},
	{
		question: 'Quels modes de paiement acceptez-vous ?',
		answer:
			'Nous acceptons les paiements par carte bancaire, espèces et virement bancaire.',
	},
];
