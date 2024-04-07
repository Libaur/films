import React, { memo } from 'react';
import Typography from '@mui/material/Typography';

interface ShortDescription {
  children: React.ReactNode;
  props: {
    pl: number;
    pt: number;
    fontSize: number;
    fontWeight?: number;
  };
}

export const ShortDescription = memo(function PreviewDescription({
  children,
  props,
}: ShortDescription) {
  return <Typography {...props}>{children}</Typography>;
});
