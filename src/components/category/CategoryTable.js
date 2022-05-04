import React from "react";
import { TableBody, TableRow, TableCell, Avatar, Badge } from "@windmill/react-ui";

import MainModal from "../modal/MainModal";
import MainDrawer from "../drawer/MainDrawer";
import ShowHideButton from "../table/ShowHideButton";
import CategoryDrawer from "../drawer/CategoryDrawer";
import useToggleDrawer from "../../hooks/useToggleDrawer";
import EditDeleteButton from "../table/EditDeleteButton";

const CategoryTable = ({ categories }) => {
  const { serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();

  return (
    <>
      <MainModal id={serviceId} />
      <MainDrawer>
        <CategoryDrawer id={serviceId} />
      </MainDrawer>
      <TableBody>
        {categories?.map((parent) => (
          <TableRow key={parent.id}>
            <TableCell className="font-semibold uppercase text-xs">
              {parent.id.substring(20, 24)}
            </TableCell>
            <TableCell>
              <Avatar
                className="hidden mr-3 md:block bg-gray-50 p-1"
                src={parent.icon}
                alt={parent.name}
              />
            </TableCell>

            <TableCell className="font-medium text-sm">
              {parent.name}
            </TableCell>
            <TableCell>
              <Badge type={parent.status ? "success" : "danger"}>{parent.status ? "Active":"Inactive"}</Badge>

            </TableCell>
            <TableCell>
              <EditDeleteButton
                id={parent.id}
                handleUpdate={handleUpdate}
                handleModalOpen={handleModalOpen}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default CategoryTable;
