import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function Categories() {
  function Apicategories() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/categories');
  }

  const {data , isLoading ,isError , error} =useQuery({
    queryKey: ["categories"],
    queryFn: Apicategories,
  });
if (isLoading) {
    return <div> Loading.....</div>
}
if (isError) return <div>Error: {error.message}</div>;

  return <>
  <div className="container mx-auto my-8 px-4">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.data.data?.map( (Categroy)=> { return <div key={Categroy._id}>
            <div className="bg-white rounded-lg shadow-md p-4">
                <img loading="lazy" src={Categroy.image} className=" w-full h-80" alt="" />
                <h2 className="text-lg font-bold  text-center my-3">{Categroy.name}</h2>

            </div>

        </div> })}
 

    </div>

  </div>
  
  
  
  </>;
}
