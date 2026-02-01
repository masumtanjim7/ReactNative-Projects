export type SpendItem = {
    id: string;
    title: string;
    merchant: string;
    amount: number;
    date: string;
    category: string;
    colorA: string;
    colorB: string;
};

export const spend: SpendItem[] = [
    {
        id: '1',
        title: 'Dinner',
        merchant: 'Kacchi House',
        amount: 580,
        date: 'Today • 9:10 PM',
        category: 'Food',
        colorA: '#7C5CFF',
        colorB: '#00D4FF',
    },
    {
        id: '2',
        title: 'Groceries',
        merchant: 'Meena Bazar',
        amount: 1240,
        date: 'Yesterday • 6:22 PM',
        category: 'Home',
        colorA: '#FF4D6D',
        colorB: '#FFD166',
    },
    {
        id: '3',
        title: 'Ride',
        merchant: 'Pathao',
        amount: 160,
        date: 'Mon • 11:45 AM',
        category: 'Transport',
        colorA: '#2CE59B',
        colorB: '#00D4FF',
    },
];
