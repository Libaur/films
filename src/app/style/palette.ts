// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Palette, PaletteOptions } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    supplement: Palette['primary'];
  }
  interface PaletteOptions {
    supplement?: PaletteOptions['primary'];
  }
}
