import React from 'react';

import useAsync from '../../hooks/useAsync';
import CategoryServices from '../../services/CategoryServices';


const ParentCategory = () => {
  const { data } = useAsync(CategoryServices.getAllCategory); //   console.log(value);
  return (
    <>
    {data?.result?.map((category) => {
      return(
        <option value={category.id}>{category.name}</option>
      )
    })}
     

    </>
  );
};

export default ParentCategory;
