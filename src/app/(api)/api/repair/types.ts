export interface RepairRetrieveData {
  object: "data_source";
  id: string;
  cover: {
    type: "file";
    file: {
      url: string;
      expiry_time: string;
    };
  } | null;
  icon: {
    type: "emoji";
    emoji: string;
  } | null;
  created_time: string;
  created_by: {
    object: "user";
    id: string;
  };
  last_edited_by: {
    object: "user";
    id: string;
  };
  last_edited_time: string;
  title: Array<{
    type: "text";
    text: {
      content: string;
      link: null | string;
    };
    annotations: {
      bold: boolean;
      italic: boolean;
      strikethrough: boolean;
      underline: boolean;
      code: boolean;
      color: string;
    };
    plain_text: string;
    href: null | string;
  }>;
  description: unknown[];
  is_inline: boolean;
  properties: {
    "수리 진행 동의서": {
      id: string;
      name: string;
      description: null | string;
      type: "checkbox";
      checkbox: Record<string, unknown>;
    };
    단가: {
      id: string;
      name: string;
      description: null | string;
      type: "number";
      number: {
        format:
          | "won"
          | "number"
          | "number_with_commas"
          | "percent"
          | "dollar"
          | "canadian_dollar"
          | "euro"
          | "pound"
          | "yen"
          | "ruble"
          | "rupee"
          | "franc"
          | "hong_kong_dollar"
          | "new_zealand_dollar"
          | "krona"
          | "norwegian_krone"
          | "mexican_peso"
          | "rand"
          | "new_taiwan_dollar"
          | "danish_krone"
          | "zloty"
          | "baht"
          | "forint"
          | "koruna"
          | "shekel"
          | "chilean_peso"
          | "philippine_peso"
          | "dirham"
          | "colombian_peso"
          | "riyal"
          | "ringgit"
          | "leu"
          | "argentine_peso"
          | "uruguayan_peso"
          | "singapore_dollar";
      };
    };
    담당자: {
      id: string;
      name: string;
      description: null | string;
      type: "people";
      people: Record<string, unknown>;
    };
    Ticket: {
      id: string;
      name: string;
      description: null | string;
      type: "unique_id";
      unique_id: {
        prefix: null | string;
      };
    };
    첨부파일: {
      id: string;
      name: string;
      description: null | string;
      type: "files";
      files: Record<string, unknown>;
    };
    "Last edited": {
      id: string;
      name: string;
      description: null | string;
      type: "last_edited_time";
      last_edited_time: Record<string, unknown>;
    };
    "문의 제출 시간": {
      id: string;
      name: string;
      description: null | string;
      type: "created_time";
      created_time: Record<string, unknown>;
    };
    수리진행상황: {
      id: string;
      name: string;
      description: null | string;
      type: "status";
      status: {
        options: Array<{
          id: string;
          name: string;
          color: string;
          description: null | string;
        }>;
        groups: Array<{
          id: string;
          name: string;
          color: string;
          option_ids: string[];
        }>;
      };
    };
    상태: {
      id: string;
      name: string;
      description: null | string;
      type: "status";
      status: {
        options: Array<{
          id: string;
          name: string;
          color: string;
          description: null | string;
        }>;
        groups: Array<{
          id: string;
          name: string;
          color: string;
          option_ids: string[];
        }>;
      };
    };
    부서: {
      id: string;
      name: string;
      description: null | string;
      type: "rich_text";
      rich_text: Record<string, unknown>;
    };
    긴급도: {
      id: string;
      name: string;
      description: null | string;
      type: "select";
      select: {
        options: Array<{
          id: string;
          name: string;
          color: string;
          description: null | string;
        }>;
      };
    };
    "고장 내역": {
      id: string;
      name: string;
      description: null | string;
      type: "multi_select";
      multi_select: {
        options: Array<{
          id: string;
          name: string;
          color: string;
          description: null | string;
        }>;
      };
    };
    "최종 편집자": {
      id: string;
      name: string;
      description: null | string;
      type: "last_edited_by";
      last_edited_by: Record<string, unknown>;
    };
    Team: {
      id: string;
      name: string;
      description: null | string;
      type: "select";
      select: {
        options: Array<{
          id: string;
          name: string;
          color: string;
          description: null | string;
        }>;
      };
    };
    법인: {
      id: string;
      name: string;
      description: null | string;
      type: "select";
      select: {
        options: Array<{
          id: string;
          name: string;
          color: string;
          description: null | string;
        }>;
      };
    };
    "수리 일정": {
      id: string;
      name: string;
      description: null | string;
      type: "date";
      date: Record<string, unknown>;
    };
    "실제 근무 위치": {
      id: string;
      name: string;
      description: null | string;
      type: "rich_text";
      rich_text: Record<string, unknown>;
    };
    문의자: {
      id: string;
      name: string;
      description: null | string;
      type: "rich_text";
      rich_text: Record<string, unknown>;
    };
    과실여부: {
      id: string;
      name: string;
      description: null | string;
      type: "select";
      select: {
        options: Array<{
          id: string;
          name: string;
          color: string;
          description: null | string;
        }>;
      };
    };
    자산번호: {
      id: string;
      name: string;
      description: null | string;
      type: "rich_text";
      rich_text: Record<string, unknown>;
    };
    조치내용: {
      id: string;
      name: string;
      description: null | string;
      type: "rich_text";
      rich_text: Record<string, unknown>;
    };
    고장증상: {
      id: "title";
      name: string;
      description: null | string;
      type: "title";
      title: Record<string, unknown>;
    };
  };
  parent: {
    type: "database_id";
    database_id: string;
  };
  database_parent: {
    type: "block_id";
    block_id: string;
  };
  url: string;
  public_url: null | string;
  archived: boolean;
  in_trash: boolean;
  request_id: string;
}

export interface RepairCreatePageData {
  object: "page";
  id: string;
  created_time: string;
  last_edited_time: string;
  created_by: {
    object: "user";
    id: string;
  };
  last_edited_by: {
    object: "user";
    id: string;
    name?: string;
    avatar_url: null | string;
    type: "person" | "bot";
    bot?: Record<string, unknown>;
  };
  cover: null;
  icon: null;
  parent: {
    type: "data_source_id";
    data_source_id: string;
    database_id: string;
  };
  archived: boolean;
  in_trash: boolean;
  is_locked: boolean;
  properties: {
    "수리 진행 동의서": {
      id: string;
      type: "checkbox";
      checkbox: boolean;
    };
    단가: {
      id: string;
      type: "number";
      number: number | null;
    };
    담당자: {
      id: string;
      type: "people";
      people: Array<Record<string, unknown>>;
    };
    Ticket: {
      id: string;
      type: "unique_id";
      unique_id: {
        prefix: null | string;
        number: number;
      };
    };
    첨부파일: {
      id: string;
      type: "files";
      files: Array<Record<string, unknown>>;
    };
    "Last edited": {
      id: string;
      type: "last_edited_time";
      last_edited_time: string;
    };
    "문의 제출 시간": {
      id: string;
      type: "created_time";
      created_time: string;
    };
    수리진행상황: {
      id: string;
      type: "status";
      status: {
        id: string;
        name: string;
        color: string;
      };
    };
    상태: {
      id: string;
      type: "status";
      status: {
        id: string;
        name: string;
        color: string;
      };
    };
    부서: {
      id: string;
      type: "rich_text";
      rich_text: Array<{
        type: "text";
        text: {
          content: string;
          link: null | string;
        };
        annotations: {
          bold: boolean;
          italic: boolean;
          strikethrough: boolean;
          underline: boolean;
          code: boolean;
          color: string;
        };
        plain_text: string;
        href: null | string;
      }>;
    };
    긴급도: {
      id: string;
      type: "select";
      select: {
        id: string;
        name: string;
        color: string;
      } | null;
    };
    "고장 내역": {
      id: string;
      type: "multi_select";
      multi_select: Array<{
        id: string;
        name: string;
        color: string;
      }>;
    };
    "최종 편집자": {
      id: string;
      type: "last_edited_by";
      last_edited_by: {
        object: "user";
        id: string;
        name?: string;
        avatar_url: null | string;
        type: "person" | "bot";
        bot?: Record<string, unknown>;
      };
    };
    Team: {
      id: string;
      type: "select";
      select: {
        id: string;
        name: string;
        color: string;
      } | null;
    };
    법인: {
      id: string;
      type: "select";
      select: {
        id: string;
        name: string;
        color: string;
      } | null;
    };
    "수리 일정": {
      id: string;
      type: "date";
      date: {
        start: string;
        end: string | null;
        time_zone: string | null;
      } | null;
    };
    "실제 근무 위치": {
      id: string;
      type: "rich_text";
      rich_text: Array<{
        type: "text";
        text: {
          content: string;
          link: null | string;
        };
        annotations: {
          bold: boolean;
          italic: boolean;
          strikethrough: boolean;
          underline: boolean;
          code: boolean;
          color: string;
        };
        plain_text: string;
        href: null | string;
      }>;
    };
    문의자: {
      id: string;
      type: "rich_text";
      rich_text: Array<{
        type: "text";
        text: {
          content: string;
          link: null | string;
        };
        annotations: {
          bold: boolean;
          italic: boolean;
          strikethrough: boolean;
          underline: boolean;
          code: boolean;
          color: string;
        };
        plain_text: string;
        href: null | string;
      }>;
    };
    과실여부: {
      id: string;
      type: "select";
      select: {
        id: string;
        name: string;
        color: string;
      } | null;
    };
    자산번호: {
      id: string;
      type: "rich_text";
      rich_text: Array<{
        type: "text";
        text: {
          content: string;
          link: null | string;
        };
        annotations: {
          bold: boolean;
          italic: boolean;
          strikethrough: boolean;
          underline: boolean;
          code: boolean;
          color: string;
        };
        plain_text: string;
        href: null | string;
      }>;
    };
    조치내용: {
      id: string;
      type: "rich_text";
      rich_text: Array<{
        type: "text";
        text: {
          content: string;
          link: null | string;
        };
        annotations: {
          bold: boolean;
          italic: boolean;
          strikethrough: boolean;
          underline: boolean;
          code: boolean;
          color: string;
        };
        plain_text: string;
        href: null | string;
      }>;
    };
    고장증상: {
      id: "title";
      type: "title";
      title: Array<{
        type: "text";
        text: {
          content: string;
          link: null | string;
        };
        annotations: {
          bold: boolean;
          italic: boolean;
          strikethrough: boolean;
          underline: boolean;
          code: boolean;
          color: string;
        };
        plain_text: string;
        href: null | string;
      }>;
    };
  };
  url: string;
  public_url: null | string;
  request_id: string;
}

export type RepairRetrievePageData = {
  object: "page";
  id: string;
  created_time: string;
  last_edited_time: string;
  created_by: {
    object: "user";
    id: string;
  };
  last_edited_by: {
    object: "user";
    id: string;
    name?: string;
    avatar_url: string | null;
    type: "person" | "bot";
    bot?: Record<string, unknown>;
  };
  cover: null;
  icon: null;
  parent: {
    type: "data_source_id";
    data_source_id: string;
    database_id: string;
  };
  archived: boolean;
  in_trash: boolean;
  is_locked: boolean;
  properties: {
    "수리 진행 동의서": {
      id: string;
      type: "checkbox";
      checkbox: boolean;
    };
    단가: {
      id: string;
      type: "number";
      number: number | null;
    };
    담당자: {
      id: string;
      type: "people";
      people: Array<{
        object: "user";
        id: string;
        name?: string;
        avatar_url: string | null;
        type: "person" | "bot";
        person?: {
          email: string;
        };
        bot?: Record<string, unknown>;
      }>;
    };
    Ticket: {
      id: string;
      type: "unique_id";
      unique_id: {
        prefix: string | null;
        number: number;
      };
    };
    첨부파일: {
      id: string;
      type: "files";
      files: Array<{
        name: string;
        type: "file" | "external";
        file?: {
          url: string;
          expiry_time: string;
        };
        external?: {
          url: string;
        };
      }>;
    };
    "Last edited": {
      id: string;
      type: "last_edited_time";
      last_edited_time: string;
    };
    "문의 제출 시간": {
      id: string;
      type: "created_time";
      created_time: string;
    };
    수리진행상황: {
      id: string;
      type: "status";
      status: {
        id: string;
        name:
          | "시작 전"
          | "담당자배정"
          | "엔지니어 접수 완료"
          | "엔지니어 수리 완료"
          | "계산서 발행 완료"
          | "계산서 기안 완료"
          | "완료";
        color:
          | "default"
          | "gray"
          | "brown"
          | "orange"
          | "yellow"
          | "green"
          | "blue"
          | "purple"
          | "pink"
          | "red";
      };
    };
    상태: {
      id: string;
      type: "status";
      status: {
        id: string;
        name: "시작 전" | "보류" | "진행 중" | "완료";
        color:
          | "default"
          | "gray"
          | "brown"
          | "orange"
          | "yellow"
          | "green"
          | "blue"
          | "purple"
          | "pink"
          | "red";
      };
    };
    부서: {
      id: string;
      type: "rich_text";
      rich_text: Array<{
        type: "text";
        text: {
          content: string;
          link: string | null;
        };
        annotations: {
          bold: boolean;
          italic: boolean;
          strikethrough: boolean;
          underline: boolean;
          code: boolean;
          color: string;
        };
        plain_text: string;
        href: string | null;
      }>;
    };
    긴급도: {
      id: string;
      type: "select";
      select: {
        id: string;
        name: "매우 급합니다." | "조금 급합니다." | "기다릴 수 있어요.";
        color:
          | "default"
          | "gray"
          | "brown"
          | "orange"
          | "yellow"
          | "green"
          | "blue"
          | "purple"
          | "pink"
          | "red";
      } | null;
    };
    "고장 내역": {
      id: string;
      type: "multi_select";
      multi_select: Array<{
        id: string;
        name:
          | "액정파손"
          | "기타파손"
          | "충전불능"
          | "외부오염"
          | "침수"
          | "기타";
        color:
          | "default"
          | "gray"
          | "brown"
          | "orange"
          | "yellow"
          | "green"
          | "blue"
          | "purple"
          | "pink"
          | "red";
      }>;
    };
    "최종 편집자": {
      id: string;
      type: "last_edited_by";
      last_edited_by: {
        object: "user";
        id: string;
        name?: string;
        avatar_url: string | null;
        type: "person" | "bot";
        bot?: Record<string, unknown>;
      };
    };
    Team: {
      id: string;
      type: "select";
      select: {
        id: string;
        name: "PC" | "Network" | "인프라보안" | "기타";
        color:
          | "default"
          | "gray"
          | "brown"
          | "orange"
          | "yellow"
          | "green"
          | "blue"
          | "purple"
          | "pink"
          | "red";
      } | null;
    };
    법인: {
      id: string;
      type: "select";
      select: {
        id: string;
        name:
          | "대웅"
          | "대웅제약"
          | "대웅바이오"
          | "대웅개발"
          | "대웅펫"
          | "IdsTrust"
          | "한올바이오파마"
          | "시지바이오"
          | "시지메디텍"
          | "엠서클"
          | "유와이즈원"
          | "더편한샵"
          | "디엔코스메틱스"
          | "페이지원";
        color:
          | "default"
          | "gray"
          | "brown"
          | "orange"
          | "yellow"
          | "green"
          | "blue"
          | "purple"
          | "pink"
          | "red";
      } | null;
    };
    "수리 일정": {
      id: string;
      type: "date";
      date: {
        start: string;
        end: string | null;
        time_zone: string | null;
      } | null;
    };
    "실제 근무 위치": {
      id: string;
      type: "rich_text";
      rich_text: Array<{
        type: "text";
        text: {
          content: string;
          link: string | null;
        };
        annotations: {
          bold: boolean;
          italic: boolean;
          strikethrough: boolean;
          underline: boolean;
          code: boolean;
          color: string;
        };
        plain_text: string;
        href: string | null;
      }>;
    };
    문의자: {
      id: string;
      type: "rich_text";
      rich_text: Array<{
        type: "text";
        text: {
          content: string;
          link: string | null;
        };
        annotations: {
          bold: boolean;
          italic: boolean;
          strikethrough: boolean;
          underline: boolean;
          code: boolean;
          color: string;
        };
        plain_text: string;
        href: string | null;
      }>;
    };
    과실여부: {
      id: string;
      type: "select";
      select: {
        id: string;
        name: "보증" | "기타" | "본인과실" | "일반수리";
        color:
          | "default"
          | "gray"
          | "brown"
          | "orange"
          | "yellow"
          | "green"
          | "blue"
          | "purple"
          | "pink"
          | "red";
      } | null;
    };
    자산번호: {
      id: string;
      type: "rich_text";
      rich_text: Array<{
        type: "text";
        text: {
          content: string;
          link: string | null;
        };
        annotations: {
          bold: boolean;
          italic: boolean;
          strikethrough: boolean;
          underline: boolean;
          code: boolean;
          color: string;
        };
        plain_text: string;
        href: string | null;
      }>;
    };
    조치내용: {
      id: string;
      type: "rich_text";
      rich_text: Array<{
        type: "text";
        text: {
          content: string;
          link: string | null;
        };
        annotations: {
          bold: boolean;
          italic: boolean;
          strikethrough: boolean;
          underline: boolean;
          code: boolean;
          color: string;
        };
        plain_text: string;
        href: string | null;
      }>;
    };
    고장증상: {
      id: "title";
      type: "title";
      title: Array<{
        type: "text";
        text: {
          content: string;
          link: string | null;
        };
        annotations: {
          bold: boolean;
          italic: boolean;
          strikethrough: boolean;
          underline: boolean;
          code: boolean;
          color: string;
        };
        plain_text: string;
        href: string | null;
      }>;
    };
  };
  url: string;
  public_url: string | null;
  request_id: string;
};
