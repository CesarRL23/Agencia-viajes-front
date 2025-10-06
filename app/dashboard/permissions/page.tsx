"use client";

import {PermissionsHeader} from '../../../components/permissions/permissions-header';
import {PermissionsStats} from '../../../components/permissions/permissions-stats';
import { PermissionsTable } from '../../../components/permissions/permissions-table';
import {CreatePermissionDialog} from '../../../components/permissions/create-permission-dialog';
import {EditPermissionDialog} from '../../../components/permissions/edit-permission-dialog';
import React, { useState } from 'react';


export default function PermissionsPage() {
  const [refresh, setRefresh] = useState(false);

  const handleCreated = () => setRefresh(r => !r);

  return (
    <div>
      <PermissionsHeader />
      <PermissionsStats />
      <CreatePermissionDialog  />
      {/* El refresh se pasa como key para recargar la tabla */}
      <PermissionsTable key={refresh ? 'refresh1' : 'refresh0'} />
    </div>
  );
}