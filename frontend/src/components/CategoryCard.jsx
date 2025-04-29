const CategoryCard = ({ name, icon: Icon, count }) => {
  return (
    <div className="w-full max-w-[250px] h-[250px] bg-[#F2F0EF] border border-[#D4D4D4] rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-[#BAA898]">
      <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-4 shadow">
        <Icon className="text-4xl text-[#BAA898]" />
      </div>
      <h3 className="font-semibold text-lg mb-1">
        {name
          .replace(/_/g, " ")
          .toLowerCase()
          .replace(/\b\w/g, (char) => char.toUpperCase())}
      </h3>
      <p className="text-[#B3B3B3] text-sm">{count} jobs</p>
    </div>
  );
};

export default CategoryCard;
