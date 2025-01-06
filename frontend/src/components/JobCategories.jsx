import CategoryCard from "./CategoryCard";

export default function JobCategories() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Job Vacancy(s) By Category/s
      </h1>
      <div className="flex  gap-5">
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
      </div>
    </div>
  );
}
