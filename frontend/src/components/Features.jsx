// components/Features.jsx

const Features = () => {
  const features = [
    "Create Tasks",
    "Update Tasks",
    "Delete Tasks",
    "Track Status",
    "Dashboard Analytics",
    "Search & Filter"
  ];

  return (
    <section className="py-16 px-10">
      <h2 className="text-3xl font-bold text-center mb-10">
        Features
      </h2>

      <div className="grid grid-cols-3 gap-6">
        {features.map((feature) => (
          <div
            key={feature}
            className="shadow-md py-3 text-center md:p-6 rounded-lg text-xs md:text-lg"
          >
            {feature}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;