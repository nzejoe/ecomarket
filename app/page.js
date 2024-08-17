import HomeHero from "@/common/components/home/HomeHero";
import TopCategories from "@/common/components/home/TopCategories";
import TopSelling from "@/common/components/home/TopSelling";

export default function Home() {
    return (
        <main className="">
            <HomeHero />
            <TopCategories />
            <TopSelling />
        </main>
    );
}
