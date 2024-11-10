export interface Stats {
  id: string;
  totalArtworks: number;
  totalInquiries: number;
  visitors: number;
  views: number;
  lastUpdated: string;
  dailyStats: {
    date: string;
    visitors: number;
    views: number;
  }[];
  monthlyStats: {
    month: string;
    visitors: number;
    views: number;
  }[];
}
