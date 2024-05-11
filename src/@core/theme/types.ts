declare module '@mui/material/styles' {
  interface Palette {
    customColors: {
      darkColor: string // ** NOTE: It should be `dark`, fix here later
      main: string
      lightColor: string // ** NOTE: It should be `light`, fix here later
      bodyBg: string
      darkBg: string
      lightBg: string
      trackBg: string
      avatarBg: string
      tooltipBg: string
      tableHeaderBg: string
    }
  }
  interface PaletteOptions {
    customColors?: {
      darkColor?: string // ** NOTE: It should be `dark`, fix here later
      main?: string
      lightColor?: string // ** NOTE: It should be `light`, fix here later
      bodyBg?: string
      darkBg?: string
      lightBg?: string
      trackBg?: string
      avatarBg?: string
      tooltipBg?: string
      tableHeaderBg?: string
    }
  }
}

export {}
