export interface Artwork {
  id: string;
  title: string;
  artistName: string;
  imageUrl: string;
  images: string[];
  year: string;
  medium: string;
  description?: string;
  details: {
    size: string;
    materials: string[];
    technique: string;
    frame?: string;
  };
  exhibitions: {
    year: string;
    title: string;
    location: string;
    type: "개인전" | "단체전" | "아트페어";
  }[];
  tags: string[];
}

export const DUMMY_ARTWORKS: Artwork[] = [
  {
    id: "1",
    title: "도시의 새벽",
    artistName: "이준영",
    imageUrl: "https://images.unsplash.com/photo-1557672172-298e090bd0f1",
    images: ["https://images.unsplash.com/photo-1557672172-298e090bd0f1"],
    year: "2024",
    medium: "Oil on canvas",
    description:
      "도시와 자연의 경계에서 발견한 순간적인 아름다움을 담아낸 작품입니다. 빛과 그림자의 상호작용, 색채의 미묘한 변화를 통해 현대 사회의 복잡성과 자연의 순수성을 대비시키고자 했습니다.",
    details: {
      size: "100x100cm",
      materials: ["Oil", "Canvas"],
      technique: "Oil painting",
      frame: "Wooden",
    },
    exhibitions: [
      {
        year: "2024",
        title: "도시의 새벽 전시",
        location: "Art Gallery",
        type: "개인전",
      },
    ],
    tags: ["도시", "자연", "현대사회", "빛과 그림자"],
  },
  {
    id: "2",
    title: "자연의 속삭임",
    artistName: "이준영",
    imageUrl: "https://images.unsplash.com/photo-1482855549413-2a6c9b1955a7",
    images: ["https://images.unsplash.com/photo-1482855549413-2a6c9b1955a7"],
    year: "2024",
    medium: "Acrylic on canvas",
    description: "자연이 들려주는 이야기에 귀 기울여 표현한 작품입니다.",
    details: {
      size: "80x80cm",
      materials: ["Acrylic", "Canvas"],
      technique: "Acrylic painting",
      frame: "Wooden",
    },
    exhibitions: [
      {
        year: "2024",
        title: "자연의 속삭임 전시",
        location: "Art Gallery",
        type: "개인전",
      },
    ],
    tags: ["자연", "이야기", "표현", "미묘한 변화"],
  },
  {
    id: "3",
    title: "현대적 고독",
    artistName: "이준영",
    imageUrl: "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d",
    images: ["https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d"],
    year: "2023",
    medium: "Mixed media",
    description:
      "현대 사회에서 느끼는 고독과 소외감을 추상적으로 표현했습니다.",
    details: {
      size: "90x90cm",
      materials: ["Mixed media", "Canvas"],
      technique: "Mixed media",
      frame: "Metal",
    },
    exhibitions: [
      {
        year: "2023",
        title: "현대적 고독 전시",
        location: "Art Gallery",
        type: "단체전",
      },
    ],
    tags: ["현대사회", "고독", "소외감", "추상적 표현"],
  },
  {
    id: "4",
    title: "도시의 리듬",
    artistName: "이준영",
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    images: ["https://images.unsplash.com/photo-1506744038136-46273834b3fb"],
    year: "2023",
    medium: "Oil on canvas",
    description: "도시의 움직임과 리듬감을 기하학적 패턴으로 재해석했습니다.",
    details: {
      size: "120x120cm",
      materials: ["Oil", "Canvas"],
      technique: "Oil painting",
      frame: "Metal",
    },
    exhibitions: [
      {
        year: "2023",
        title: "도시의 리듬 전시",
        location: "Art Gallery",
        type: "단체전",
      },
    ],
    tags: ["도시", "움직임", "리듬감", "기하학적 패턴"],
  },
  {
    id: "5",
    title: "빛과 그림자",
    artistName: "이준영",
    imageUrl: "https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb",
    images: ["https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb"],
    year: "2023",
    medium: "Oil on canvas",
    description:
      "자연광과 인공광이 만들어내는 다양한 그림자의 패턴을 연구했습니다.",
    details: {
      size: "150x150cm",
      materials: ["Oil", "Canvas"],
      technique: "Oil painting",
      frame: "Metal",
    },
    exhibitions: [
      {
        year: "2023",
        title: "빛과 그림자 전시",
        location: "Art Gallery",
        type: "아트페어",
      },
    ],
    tags: ["자연광", "인공광", "그림자", "다양한 패턴"],
  },
  {
    id: "6",
    title: "추상적 사유",
    artistName: "이준영",
    imageUrl: "https://images.unsplash.com/photo-1579762715118-a6f1d4b934f1",
    images: ["https://images.unsplash.com/photo-1579762715118-a6f1d4b934f1"],
    year: "2023",
    medium: "Acrylic on canvas",
    description: "추상적 형태를 통해 내면의 사유 과정을 시각화했습니다.",
    details: {
      size: "100x100cm",
      materials: ["Acrylic", "Canvas"],
      technique: "Acrylic painting",
      frame: "Metal",
    },
    exhibitions: [
      {
        year: "2023",
        title: "추상적 사유 전시",
        location: "Art Gallery",
        type: "개인전",
      },
    ],
    tags: ["추상적", "사유", "과정", "시각화"],
  },
  {
    id: "7",
    title: "도시의 야경",
    artistName: "이준영",
    imageUrl: "https://images.unsplash.com/photo-1544867885-2333f61544ad",
    images: ["https://images.unsplash.com/photo-1544867885-2333f61544ad"],
    year: "2022",
    medium: "Oil on canvas",
    description: "도시의 밤풍경이 만들어내는 빛의 향연을 표현했습니다.",
    details: {
      size: "180x180cm",
      materials: ["Oil", "Canvas"],
      technique: "Oil painting",
      frame: "Metal",
    },
    exhibitions: [
      {
        year: "2022",
        title: "도시의 야경 전시",
        location: "Art Gallery",
        type: "단체전",
      },
    ],
    tags: ["도시", "밤풍경", "빛의 향연", "표현"],
  },
  {
    id: "8",
    title: "자연의 숨결",
    artistName: "이준영",
    imageUrl: "https://images.unsplash.com/photo-1501084817091-a4f3d1d19e07",
    images: ["https://images.unsplash.com/photo-1501084817091-a4f3d1d19e07"],
    year: "2022",
    medium: "Mixed media",
    description: "자연의 생동감과 역동성을 혼합 매체를 통해 표현했습니다.",
    details: {
      size: "120x120cm",
      materials: ["Mixed media", "Canvas"],
      technique: "Mixed media",
      frame: "Metal",
    },
    exhibitions: [
      {
        year: "2022",
        title: "자연의 숨결 전시",
        location: "Art Gallery",
        type: "아트페어",
      },
    ],
    tags: ["자연", "생동감", "역동성", "혼합 매체"],
  },
];
