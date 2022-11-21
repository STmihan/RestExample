export interface Note {
  id: string | null,
  title: string,
  description: string,
  completed: boolean,
  date: string,
}

export const mockNotes: Note[] = [
  {
    id: '12354214123',
    title: 'Make homework',
    description: 'Phasellus sit amet ante at ut.',
    date: '12.09',
    completed: false,
  },
  {
    id: '1231351332',
    title: 'Make homework',
    description: 'Lorem ipsum dolor sit amet, consectetur porttitor',
    date: '12.09',
    completed: true,
  },
  {
    id: '123542432123',
    title: 'fdsdaahdgd',
    description: 'Phasellus sit amet ante at ut.',
    date: '13.09',
    completed: true,
  },
  {
    id: '356345434',
    title: 'sssssssssssssssss',
    description: 'Lorem ipsum dolor sit amet, consectetur porttitor',
    date: '14.09',
    completed: false,
  },
  {
    id: '679567786',
    title: 'sddddddddddddd',
    description: 'Lorem ipsum dolor sit amet, consectetur porttitor',
    date: '12.10',
    completed: true,
  },
];
