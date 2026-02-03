export const getWindDirection = (degrees: number): string => {
  if (degrees >= 337.5 || degrees < 22.5) return 'С,';
  if (degrees >= 22.5 && degrees < 67.5) return 'СВ,';
  if (degrees >= 67.5 && degrees < 112.5) return 'В,';
  if (degrees >= 112.5 && degrees < 157.5) return 'ЮВ,';
  if (degrees >= 157.5 && degrees < 202.5) return 'Ю,';
  if (degrees >= 202.5 && degrees < 247.5) return 'ЮЗ,';
  if (degrees >= 247.5 && degrees < 292.5) return 'З,';
  if (degrees >= 292.5 && degrees < 337.5) return 'СЗ,';

  return 'Штиль';
};
