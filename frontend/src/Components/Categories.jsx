import { Link } from "react-router-dom";
import { categories } from "../data/mockData";

export default function Categories() {
  return (
    <div className="w-full">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-10">
        {categories.length > 0
          ? categories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <Link
                  to={`/category/${category.name}`}
                  className="bg-[#262626] hover:shadow-black hover:shadow-md flex flex-col justify-between p-3 sm:p-4 lg:p-6 h-20 sm:h-24 lg:h-28 rounded-lg cursor-pointer transition-all duration-300 hover:scale-105"
                  key={index}
                >
                  <p className="text-white text-xs sm:text-sm lg:text-base truncate">
                    {category.name}
                  </p>
                  <IconComponent
                    className={`w-6 h-6 sm:w-8 sm:h-8 lg:w-12 lg:h-12 text-white self-end ${category.color}`}
                  />
                </Link>
              );
            })
          : ""}
      </div>
    </div>
  );
}
