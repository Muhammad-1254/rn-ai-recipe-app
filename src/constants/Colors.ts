const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';

// export default {
//   light: {
//     text: '#000',
//     background: '#fff',
//     tint: tintColorLight,
//     tabIconDefault: '#ccc',
//     tabIconSelected: tintColorLight,
//   },
//   dark: {
//     text: '#fff',
//     background: '#000',
//     tint: tintColorDark,
//     tabIconDefault: '#ccc',
//     tabIconSelected: tintColorDark,
//   },
// };




const hslToHex = (h:number, s:number, l:number) => {
  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const f = n => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0'); // Convert to Hex and pad with 0
  };
  return `#${f(0)}${f(8)}${f(4)}`;
};




const colors = {

  light:{
    background: hslToHex(0, 0, 100),
  foreground: hslToHex(20, 14.3, 4.1),
  card: hslToHex(0, 0, 100),
  cardForeground: hslToHex(20, 14.3, 4.1),
  popover: hslToHex(0, 0, 100),
  popoverForeground: hslToHex(20, 14.3, 4.1),
  primary: hslToHex(24.6, 95, 53.1),
  primaryForeground: hslToHex(60, 9.1, 97.8),
  secondary: hslToHex(60, 4.8, 95.9),
  secondaryForeground: hslToHex(24, 9.8, 10),
  muted: hslToHex(60, 4.8, 95.9),
  mutedForeground: hslToHex(25, 5.3, 44.7),
  accent: hslToHex(60, 4.8, 95.9),
  accentForeground: hslToHex(24, 9.8, 10),
  destructive: hslToHex(0, 84.2, 60.2),
  destructiveForeground: hslToHex(60, 9.1, 97.8),
  border: hslToHex(20, 5.9, 90),
  input: hslToHex(20, 5.9, 90),
  ring: hslToHex(24.6, 95, 53.1),
  chart1: hslToHex(12, 76, 61),
  chart2: hslToHex(173, 58, 39),
  chart3: hslToHex(197, 37, 24),
  chart4: hslToHex(43, 74, 66),
  chart5: hslToHex(27, 87, 67),
  },
  dark:{
    background: hslToHex(20, 14.3, 4.1),
  foreground: hslToHex(60, 9.1, 97.8),
  card: hslToHex(20, 14.3, 4.1),
  cardForeground: hslToHex(60, 9.1, 97.8),
  popover: hslToHex(20, 14.3, 4.1),
  popoverForeground: hslToHex(60, 9.1, 97.8),
  primary: hslToHex(20.5, 90.2, 48.2),
  primaryForeground: hslToHex(60, 9.1, 97.8),
  secondary: hslToHex(12, 6.5, 15.1),
  secondaryForeground: hslToHex(60, 9.1, 97.8),
  muted: hslToHex(12, 6.5, 15.1),
  mutedForeground: hslToHex(24, 5.4, 63.9),
  accent: hslToHex(12, 6.5, 15.1),
  accentForeground: hslToHex(60, 9.1, 97.8),
  destructive: hslToHex(0, 72.2, 50.6),
  destructiveForeground: hslToHex(60, 9.1, 97.8),
  border: hslToHex(12, 6.5, 15.1),
  input: hslToHex(12, 6.5, 15.1),
  ring: hslToHex(20.5, 90.2, 48.2),
  chart1: hslToHex(220, 70, 50),
  chart2: hslToHex(160, 60, 45),
  chart3: hslToHex(30, 80, 55),
  chart4: hslToHex(280, 65, 60),
  chart5: hslToHex(340, 75, 55),
  }
  
}

export default {
  light:{
    primary:colors.light.primary,
    primaryForeground:colors.light.primaryForeground,
    secondary:colors.light.secondary,
    secondaryForeground:colors.light.secondaryForeground,
    background:colors.light.background,
    foreground:colors.light.foreground,
    card:colors.light.card,
    cardForeground:colors.light.cardForeground,
    popover:colors.light.popover,
    popoverForeground:colors.light.popoverForeground,
    muted:colors.light.muted,
    mutedForeground:colors.light.mutedForeground,
    accent:colors.light.accent,
    accentForeground:colors.light.accentForeground,
    destructive:colors.light.destructive,
    destructiveForeground:colors.light.destructiveForeground,
    border:colors.light.border,
    input:colors.light.input,
    ring:colors.light.ring,
    chart1:colors.light.chart1,
    chart2:colors.light.chart2,
    chart3:colors.light.chart3,
    chart4:colors.light.chart4,
    chart5:colors.light.chart5,


  },
  dark:{
    primary:colors.dark.primary,
    primaryForeground:colors.dark.primaryForeground,
    secondary:colors.dark.secondary,
    secondaryForeground:colors.dark.secondaryForeground,
    background:colors.dark.background,
    foreground:colors.dark.foreground,
    card:colors.dark.card,
    cardForeground:colors.dark.cardForeground,
    popover:colors.dark.popover,
    popoverForeground:colors.dark.popoverForeground,
    muted:colors.dark.muted,
    mutedForeground:colors.dark.mutedForeground,
    accent:colors.dark.accent,
    accentForeground:colors.dark.accentForeground,
    destructive:colors.dark.destructive,
    destructiveForeground:colors.dark.destructiveForeground,
    border:colors.dark.border,
    input:colors.dark.input,
    ring:colors.dark.ring,
    chart1:colors.dark.chart1,
    chart2:colors.dark.chart2,
    chart3:colors.dark.chart3,
    chart4:colors.dark.chart4,
    chart5:colors.dark.chart5,
  }
}