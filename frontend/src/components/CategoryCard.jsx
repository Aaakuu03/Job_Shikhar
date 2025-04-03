const CategoryCard = ({ name, icon }) => {
  return (
    <div className="card bg-white shadow-lg rounded-lg p-6 flex items-center justify-center w-60 mx-auto">
      <div className="icon text-5xl mb-4 flex justify-center items-center">
        {icon}
      </div>
      <h2 className="text-xl font-semibold">{name}</h2>
    </div>
  );
};

export default CategoryCard;
