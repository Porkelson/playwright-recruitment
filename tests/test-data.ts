export const HERO = {
  name: 'Iron Man',
  alterEgo: 'Tony Stark',
  power: 'Really Smart',
} as const;

export const POWERS = ['Super Flexible', 'Super Hot', 'Weather Changer', 'Really Smart'] as const;

export const STEPPER = {
  validName: 'Last name',
  tooLongName: 'Last name, First name',
  address: 'Address 123',
} as const;
