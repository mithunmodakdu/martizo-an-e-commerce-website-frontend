import { Link } from "react-router";


const CategoryCard = ( {category}: {category: {_id: string, name: string, icon: string}}) => {

  return (
    <div>
        <Link
          to={`/products?category=${category?._id}`}
          className="group relative block bg-black h-[250px]"
        >
          <img
            alt={`Icon of ${category?.name}`}
            src={category?.icon}
            className="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
          />

          <div className="relative p-4 sm:p-6 lg:p-8">
            <p className="text-lg font-bold text-white">
              {category?.name}
            </p>

            <div className="mt-12 sm:mt-14 lg:mt-18">
              <div className="translate-y-4 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                <p className="text-base text-white">
                  {`Click here to Explore and Shop ${category?.name} products.`}
                </p>
              </div>
            </div>
          </div>
        </Link>
      </div>
  );
};

export default CategoryCard;
