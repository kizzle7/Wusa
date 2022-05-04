import React from "react";
import Scrollbars from "react-custom-scrollbars";

import Title from "../form/Title";
import Error from "../form/Error";
import LabelArea from "../form/LabelArea";
import InputArea from "../form/InputArea";
import InputValue from "../form/InputValue";
import SelectOption from "../form/SelectOption";
import DrawerButton from "../form/DrawerButton";
import Uploader from "../image-uploader/Uploader";
import useCouponSubmit from "../../hooks/useCouponSubmit";
import useAsync from "../../hooks/useAsync";
import CategoryServices from "../../services/CategoryServices";

const CouponDrawer = ({ id }) => {
  const { data } = useAsync(CategoryServices.getAllCategory); //   console.log(value);
  const { register, handleSubmit, onSubmit, errors, setImageUrl, imageUrl } =
    useCouponSubmit(id);

  return (
    <>
      <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
        {id ? (
          <Title
            title="Update SubCategory"
            description="Updated your subcategory and necessary information from here"
          />
        ) : (
          <Title
            title="Add SubCategory"
            description="Add your subcategory and necessary information from here"
          />
        )}
      </div>

      <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="px-6 pt-8 flex-grow scrollbar-hide w-full max-h-full pb-40">
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Category" />
              <div className="col-span-8 sm:col-span-4">
                <SelectOption
                  register={register}
                  label="Category"
                  name="category"
                  optionsData={data}
                />
                <Error errorName={errors.category} />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Sub Category Icon" />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  register={register}
                  label="SubCategory Icon"
                  name="icon"
                  type="file"
                  class="form-control"
                />
                <Error errorName={errors.icon} />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="SubCategory Name" />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  register={register}
                  label="Sub Category Name"
                  name="title"
                  type="select"
                  placeholder="Sub Category Name"
                />
                <Error errorName={errors.title} />
              </div>
            </div>
          </div>

          <DrawerButton id={id} title="Coupon" />
        </form>
      </Scrollbars>
    </>
  );
};

export default CouponDrawer;
