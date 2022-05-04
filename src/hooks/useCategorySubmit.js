import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { SidebarContext } from "../context/SidebarContext";
import CategoryServices from "../services/CategoryServices";
import { notifyError, notifySuccess } from "../utils/toast";

const useCategorySubmit = (id) => {
  const [imageUrl, setImageUrl] = useState("");
  const [children, setChildren] = useState([]);
  const { isDrawerOpen, closeDrawer, setIsUpdate } = useContext(SidebarContext);
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm();

  const onSubmit = ({ parent, icon, type }) => {
    if (!icon) {
      notifyError("Icon is required!");
      return;
    }
    const categoryData = {
      parent: parent,
      icon: icon[0],
    };

    let formData = new FormData(); //formdata object
    formData.append("name", parent);
    formData.append("icon", icon[0]);

    if (id) {
      CategoryServices.updateCategory(id, formData)
        .then((res) => {
          setIsUpdate(true);
          notifySuccess(res.message);
        })
        .catch((err) => notifyError(err.message));
      closeDrawer();
    } else {
      CategoryServices.addCategory(formData)
        .then((res) => {
          setIsUpdate(true);
          notifySuccess(res.message);
        })
        .catch((err) => notifyError(err.message));
      closeDrawer();
    }
  };

  useEffect(() => {
    if (!isDrawerOpen) {
      setValue("parent");
      // setValue("slug");
      setValue("children");
      setValue("type");
      setImageUrl("");
      setChildren([]);
      clearErrors("parent");
      // setValue("slug");
      clearErrors("children");
      clearErrors("type");
      return;
    }
    if (id) {
      CategoryServices.getCategoryById(id)
        .then((res) => {
          if (res) {
            setValue("parent", res.result.name);
            setValue("icon", res.result.icon);
            setImageUrl(res.result.icon);
          }
        })
        .catch((err) => {
          notifyError("There is a server error!");
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, setValue, isDrawerOpen]);
  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    imageUrl,
    setImageUrl,
    children,
    setChildren,
  };
};

export default useCategorySubmit;
