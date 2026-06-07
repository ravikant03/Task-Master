import Hero from "../components/Hero.jsx";
import Features from "../components/Features.jsx";
import MyTasksPreview from "../components/MyTasksPreview.jsx";

const HomePage = () => {
  return (
    <>
      <section className="py-16">
        <div className="min-h-screen flex flex-col">
          <main className="flex-1">
            <Hero />
            <Features />
            <MyTasksPreview />
          </main>
        </div>
      </section>
    </>
  );
};

export default HomePage;
