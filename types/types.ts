type GraphKind = "LINE" | "BAR" | "PIE" | "RADAR";

type CreateGraphType = {
  title: string;
  category: string;
  graphKind: GraphKind;
  source: string;
  label: string[];
  value: number[];
  color: string;
  description: string;
};

type Graph = {
  id: string;
  title: string;
  category: string;
  data: {
    id: string;
    label: string;
    value: number;
  }[];
  user: {
    _id: string;
    email: string;
    username?: string;
  };
  graphKind: GraphKind;
  color?: string;
  source?: string;
  description?: string;
};

type BlendGraph = {
  id: string;
  title: string;
  userId: string;
  graphs: Graph[];
};

type UserType = {
  email: string;
  password: string;
};

type IdType = {
  id: string;
};

type DatasetsType = {
  type: string;
  data: number[];
  label: string;
  backgroundColor: string;
  borderColor: string;
  pointBorderColor: string;
  pointHoverBackgroundColor: string;
};

type GraphType = "NORMAL" | "BLEND";

export type {
  GraphType,
  DatasetsType,
  IdType,
  GraphKind,
  UserType,
  CreateGraphType,
  Graph,
  BlendGraph,
};
