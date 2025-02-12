import PageTransition from "@/components/transition/PageTransition";
import TitleComponent from "@/components/LandingPage/TitleComponent";
import NosEngagement from "@/components/LandingPage/NosEngagement";
import Contact from "@/components/LandingPage/contact-section/Contact";
import NosValeurs from "@/components/LandingPage/NosValeurs";
import Faq from "@/components/LandingPage/Faq";

export default function Accueil() {
    return (
        <PageTransition>
            <section id="accueil">
                <div className="flex flex-col gap-10 px-4">
                    <div><TitleComponent/></div>
                    <div><NosValeurs/></div>
                    <div><NosEngagement/></div>
                    <div><Faq/></div>
                    <div><Contact/></div>
                </div>
            </section>
        </PageTransition>
    );
}