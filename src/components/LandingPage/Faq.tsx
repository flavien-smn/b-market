"use client";

import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import PageTransition from "@/components/transition/PageTransition";

// Définition du type pour la FAQ
interface FAQItem {
    question: string;
    answer: string;
}

// Données FAQ en respectant le type défini
const faqData: FAQItem[] = [
    {
        question: "Comment puis-je passer une commande ?",
        answer: "Vous pouvez passer une commande directement via notre site en sélectionnant les produits que vous souhaitez acheter et en suivant le processus de commande. Vous avez également la possibilité de passer une commande par téléphone ou en personne à la boucherie."
    },
    {
        question: "Quels modes de paiement acceptez-vous ?",
        answer: "Les paiements en ligne ne sont malheureusement pas disponibles pour le moment. Sur place, nous acceptons les cartes de crédit, les cartes de débit, l'espèce et les tickets restaurants."
    },
    {
        question: "Est-il possible de retourner un produit ?",
        answer: "En vertu de l'Article L121-20-2 du code de la consommation, le droit de rétractation ne s'applique pas pour les livraisons de produits frais périssables. En conséquence, une demande d'annulation de commande pour le non-respect du créneau horaire de livraison prévu n'est pas recevable."
    },
    {
        question: "Comment puis-je suivre ma commande ?",
        answer: "Après avoir passé une commande, vous recevrez un email avec un numéro de suivi et des instructions pour suivre votre commande."
    },
    {
        question: "Puis-je annuler ma commande ?",
        answer: "Oui, vous pouvez annuler votre commande avant qu'elle ne soit expédiée. Après l'expédition, il faudra procéder à un retour une fois l'article reçu."
    },
    {
        question: "Quels sont les horaires d'ouverture de la boucherie ?",
        answer: "Nous sommes ouverts du lundi au samedi, de 8h00 à 19h00, et fermés le dimanche. Pendant les jours fériés, nos horaires peuvent varier. Consultez notre site ou contactez-nous pour plus d'informations."
    },
    {
        question: "Est-il possible de passer des commandes à l'avance ?",
        answer: "Oui, vous pouvez passer vos commandes à l'avance en ligne via notre système de click-and-collect ou par téléphone. Il suffit de préciser les produits souhaités et la quantité. Vous pourrez récupérer votre commande à la boucherie à l'heure convenue."
    },
    {
        question: "Livrez-vous à domicile ?",
        answer: "Actuellement, nous proposons uniquement un service de click-and-collect. Vous pouvez passer votre commande en ligne et venir la récupérer directement à la boucherie. La livraison à domicile pourrait être disponible prochainement."
    },
    {
        question: "Quels types de viande proposez-vous ?",
        answer: "Nous proposons une large gamme de viandes, dont du bœuf, du veau, de l'agneau, du poulet etc. Nous avons également des spécialités comme des paupiette de veau maison, des brochettes et des plats préparés."
    },
    {
        question: "Les viandes sont-elles d'origine locale ?",
        answer: "Nous travaillons avec des éleveurs locaux et régionaux pour garantir des produits de qualité et d'origine contrôlée. La majorité de nos viandes provient de fermes environnantes qui respectent des normes strictes en matière de bien-être animal."
    },
    {
        question: "Faites-vous des produits halal ?",
        answer: "Nous proposons de la viande halal, préparée selon les règles strictes de l'abattage rituel. Si vous avez des besoins spécifiques, n'hésitez pas à nous le signaler lors de votre commande."
    },
    {
        question: "Comment savoir si un produit est disponible ?",
        answer: "Vous pouvez consulter la disponibilité des produits directement sur notre site lors de la commande en ligne, ou nous appeler pour vérifier. Notre boucher met régulièrement à jour les produits en stock."
    },
    {
        question: "Proposez-vous des offres spéciales ou des réductions ?",
        answer: "Nous pouvons proposer des offres spéciales sur certains produits. Suivez-nous sur les réseaux sociaux ou inscrivez-vous à notre newsletter pour être informé de nos promotions."
    },
    {
        question: "Comment se déroule le click-and-collect ?",
        answer: "Le click-and-collect est simple : passez votre commande en ligne, choisissez votre créneau horaire, et venez la récupérer à la boucherie à l'heure convenue. Vous pourrez payer directement sur place."
    },
    {
        question: "Acceptez-vous les paiements par carte ?",
        answer: "Oui, nous acceptons les paiements par carte bancaire, espèces et chèques. Pour les commandes importantes ou sur mesure, un acompte peut être demandé."
    },
    {
        question: "Puis-je vous contacter pour des conseils sur la préparation ou la cuisson ?",
        answer: "Bien sûr ! Nous sommes heureux de partager des conseils sur la préparation et la cuisson de nos viandes. Demandez nous lors de votre visite."
    }
];

export default function Faq() {
    return (
        <PageTransition>
            <section id="faq">
                <div className="px-6">
                    <h1 className="mb-8 text-center text-3xl font-bold">Foire aux questions</h1>
                    <div>
                        <Accordion type="single" collapsible>
                            {faqData.map((item, index) => (
                                <AccordionItem key={index} value={`item-${index}`}>
                                    <AccordionTrigger className="text-2xl">{item.question}</AccordionTrigger>
                                    <AccordionContent>
                                        <p className="text-lg">{item.answer}</p>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </div>
            </section>
        </PageTransition>
    );
}
