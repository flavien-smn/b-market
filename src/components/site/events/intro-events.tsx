export function IntroEvent() {

    return (
        <>
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-6">
                        Votre partenaire pour tous vos événements
                    </h2>
                    <p className="text-lg text-muted-foreground mb-8">
                        Depuis plus de 15 ans, notre boucherie fournit de la viande de
                        qualité pour les événements les plus importants de
                        votre vie. Que ce soit pour un mariage, une fête religieuse ou une
                        célébration familiale, nous vous garantissons fraîcheur, qualité
                        et service personnalisé.
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                        <div className="bg-background p-4 rounded-lg shadow-sm">
                            <p className="text-3xl font-bold text-primary mb-2">50+</p>
                            <p className="text-sm text-muted-foreground">
                                Événements servis
                            </p>
                        </div>
                        <div className="bg-background p-4 rounded-lg shadow-sm">
                            <p className="text-3xl font-bold text-primary mb-2">100%</p>
                            <p className="text-sm text-muted-foreground">
                                Satisfaction client
                            </p>
                        </div>
                        <div className="bg-background p-4 rounded-lg shadow-sm">
                            <p className="text-3xl font-bold text-primary mb-2">15+</p>
                            <p className="text-sm text-muted-foreground">
                                Années d'expérience
                            </p>
                        </div>
                        <div className="bg-background p-4 rounded-lg shadow-sm">
                            <p className="text-3xl font-bold text-primary mb-2">48h</p>
                            <p className="text-sm text-muted-foreground">
                                Délai de livraison
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}