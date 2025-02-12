"use client";

import {Mail, MapPin, Phone} from "lucide-react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import React, {useEffect, useRef, useState} from "react";
import dynamic from 'next/dynamic';
import ContactForm from "@/components/LandingPage/contact-section/ContactForm";

// Charger BoucherieMap uniquement côté client
const BoucherieMap = dynamic(() => import('@/components/LandingPage/contact-section/BoucherieMap'), {ssr: false});

export default function Contact() {
    const mapContainerRef = useRef<HTMLDivElement | null>(null); // Référence pour la carte
    const [mapSize, setMapSize] = useState({width: 0, height: 0});

    useEffect(() => {
        // Mesurer la taille de la div contenant la carte
        if (mapContainerRef.current) {
            const {width, height} = mapContainerRef.current.getBoundingClientRect();
            setMapSize({width, height});
        }
    }, []);
    return (
        <section ref={mapContainerRef} id="contact">
            <div className="">
                <h1 className="mb-8 text-center text-3xl font-bold">Contactez-nous</h1>
                <div className="grid h-full grid-cols-1 gap-8 md:grid-cols-2">
                    <Card className="flex h-full flex-col shadow-lg transition-transform duration-300 hover:scale-105">
                        <CardHeader>
                            <CardTitle className="text-xl font-semibold">Où nous trouver</CardTitle>
                        </CardHeader>
                        <CardContent className="grow">
                            <div
                                className="aspect-video w-full overflow-hidden rounded-lg border-2">
                                <div className="flex h-full items-center justify-center">
                                    {/* Ajouter la prop key pour forcer la réinitialisation */}
                                    <BoucherieMap key={mapSize.width + mapSize.height} height={mapSize.height}/>
                                </div>
                            </div>

                            <div className="mt-4 space-y-2">
                                <div className="flex items-center gap-2">
                                    <MapPin/>
                                    <span className="text-sm">39 Av. du Vercors, 38600 Fontaine</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Phone/>
                                    <a href="tel:0438861565" className="text-sm hover:underline">
                                        04 38 86 15 65
                                    </a>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Mail/>
                                    <a href="mailto:boucheriebouissa@gmail.com" className="text-sm hover:underline">
                                        boucheriebouissa@gmail.com
                                    </a>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Card pour le formulaire avec les confettis */}
                    <div>
                        <Card
                            className="flex h-full flex-col shadow-lg transition-transform duration-300 hover:scale-105">
                            <CardHeader>
                                <CardTitle className="text-xl font-semibold">Envoyez-nous un message</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ContactForm/>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    );
}
