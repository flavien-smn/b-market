"use client";
import { motion } from "framer-motion";
import { Card, CardContent } from '@/components/ui/card';
import {lesValeurs} from "@/data/LesValeurs";

const springTransition = {
    type: 'spring',
    stiffness: 40
};

const cardVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: (i: number) => ({
        opacity: 1,
        x: 0,
        transition: {
            delay: i * 0.2,
            ...springTransition
        }
    })
};

export default function NosValeurs() {
    return (
        <div className="text-center">
            <h3 className="mb-8 text-3xl font-bold">Nos Valeurs</h3>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                {lesValeurs.map((value, index) => (
                    <motion.div
                        key={value.id}
                        custom={index}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={cardVariants}
                    >
                        <Card
                            className="min-h-full shadow-lg transition-transform duration-300 hover:scale-105"
                            role="region"
                            aria-labelledby={`card-title-${value.id}`}
                        >
                            <CardContent className="p-6">
                                <h4 id={`card-title-${value.id}`} className="mb-2 text-xl font-semibold">
                                    {value.title}
                                </h4>
                                <p>{value.description}</p>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
