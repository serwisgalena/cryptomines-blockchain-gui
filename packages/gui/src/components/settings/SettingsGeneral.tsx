import { Grid } from '@mui/material';
import React from 'react';

import SettingsPanel from './SettingsPanel';

export default function SettingsGeneral() {
  return (
    <Grid container>
      <Grid item xs={12} sm={6} lg={3}>
        <SettingsPanel />
      </Grid>
    </Grid>
  );
}
