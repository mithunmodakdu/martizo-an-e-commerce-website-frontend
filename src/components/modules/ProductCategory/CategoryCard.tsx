

const CategoryCard = ( {category}: {category: {_id: string, name: string, icon: string}}) => {
  console.log("from card", category)
 

  return (
    <div>
        <a
          href="#"
          className="group relative block bg-black h-[300px] w-[300px]"
        >
          <img
            alt={`Icon of ${category?.name}`}
            src={category?.icon}
            className="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
          />

          <div className="relative p-4 sm:p-6 lg:p-8">
            <p className="text-sm font-medium tracking-widest text-primary uppercase">
              Category
            </p>

            <p className="text-xl font-bold text-white sm:text-2xl">
              {category?.name}
            </p>

            <div className="mt-12 sm:mt-18 lg:mt-24">
              <div className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                <p className="text-sm text-white">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Omnis perferendis hic asperiores quibusdam quidem voluptates
                  doloremque reiciendis nostrum harum. Repudiandae?
                </p>
              </div>
            </div>
          </div>
        </a>
      </div>
  );
};

export default CategoryCard;
