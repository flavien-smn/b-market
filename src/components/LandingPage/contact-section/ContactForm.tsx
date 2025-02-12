"use client";

import React, {useState} from "react";
import {Button} from "@/components/ui/button";

const ContactForm: React.FC = () => {
    // Gestion de l'état du formulaire
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const [submitted, setSubmitted] = useState(false);

    // Fonction pour gérer les changements dans les champs du formulaire
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Fonction pour soumettre le formulaire
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <div className="relative h-full">
            {submitted ? (
                <>
                    {/* Message de remerciement centré */}
                    <p className="text-center text-xl font-bold text-green-500">
                        Merci pour votre message ! Nous vous contacterons bientôt.
                    </p>
                </>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium">
                            Nom
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2"
                        />
                    </div>

                    <div>
                        <label htmlFor="message" className="block text-sm font-medium">
                            Message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            rows={4}
                            required
                            value={formData.message}
                            onChange={handleChange}
                            className="mt-1 w-full h-full rounded-md border border-gray-300 px-4 py-2"
                        ></textarea>
                    </div>
                    <div>
                        <Button type="submit">Envoyer</Button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default ContactForm;