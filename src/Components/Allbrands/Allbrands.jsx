import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function Allbrands() {
  function Apicategories() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  }

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["categories"],
    queryFn: Apicategories,
  });
  if (isLoading) {
    return <div> Loading.....</div>;
  }
  if (isError) return <div>Error: {error.message}</div>;
  return (
    <>
      <div className="container mx-auto my-8 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data.data.data?.map((brands) => {
            return (
              <div key={brands._id}>
                <div className="bg-white rounded-lg shadow-md p-4">
                  <img
                    loading="lazy"
                    src={brands.image}
                    className=" w-full h-80"
                    alt=""
                  />
                  <h2 className="text-lg font-bold  text-center my-3">
                    {brands.name}
                  </h2>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
