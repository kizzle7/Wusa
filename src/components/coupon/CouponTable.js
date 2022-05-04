import React from 'react';
import * as dayjs from 'dayjs';
import { TableCell, TableBody, TableRow, Badge,Avatar } from '@windmill/react-ui';

import MainModal from '../modal/MainModal';
import MainDrawer from '../drawer/MainDrawer';
import CouponDrawer from '../drawer/CouponDrawer';
import useToggleDrawer from '../../hooks/useToggleDrawer';
import EditDeleteButton from '../table/EditDeleteButton';

const CouponTable = ({ subcategoryData }) => {
  const { serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();

  return (
    <>
      <MainModal id={serviceId} />
      <MainDrawer>
        <CouponDrawer id={serviceId} />
      </MainDrawer>

      <TableBody>
        {subcategoryData.map((subcategory, i) => (
          <TableRow key={i + 1}>
         <TableCell className="font-semibold uppercase text-xs">
              {subcategory.id.substring(20, 24)}
            </TableCell>
            <TableCell>
              <Avatar
                className="hidden mr-3 md:block bg-gray-50 p-1"
                src={subcategory.icon}
                alt={subcategory.name}
              />
            </TableCell>

            <TableCell className="font-medium text-sm">
              {subcategory.name}
            </TableCell>
            <TableCell>
              <Badge type={subcategory.status ? "success" : "danger"}>{subcategory.status ? "Active":"Inactive"}</Badge>

            </TableCell>
            <TableCell>
              <EditDeleteButton
                id={subcategory.id}
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

export default CouponTable;
