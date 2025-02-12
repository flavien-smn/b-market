"use client";

import AnimatedButton from "@/components/ui/animated-button";
import {ArrowRight} from "lucide-react";

export default function NosEngagement() {
    return (
        <section id="engagement" className="text-center">
            <h3 className="mb-8 text-3xl font-bold">Notre Engagement</h3>
            <p className="mx-auto mb-8 max-w-3xl text-xl text-gray-700 dark:text-gray-200">
                Chez Boucherie Bouissa, nous nous engageons à vous offrir des produits de la plus haute
                qualité, issus d&#39;élevages locaux et respectueux du bien-être animal. Notre passion pour
                la boucherie se reflète dans chaque coupe, chaque préparation, pour votre plus grand plaisir
                gustatif.
            </p>
            <a href="/produits" aria-label="Découvrir nos produits">
                <AnimatedButton Icon={ArrowRight}>
                    <span>Découvrez Nos Produits</span>
                </AnimatedButton>
            </a>
        </section>
    );
}
