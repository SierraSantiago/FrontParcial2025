export interface DisciplineItem {
    id: number | string;
    points: number;
    reason: string;
    createdAt: string;
    issuedByUser?: { id: string; fullName: string };
}

export interface ReportItem {
    id: string;
    title: string;
    status: 'resistance' | 'intel' | 'incident';
    createdAt: string;
}