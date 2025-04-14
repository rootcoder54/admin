import {
  Card,
  List,
  Client,
  Board,
  Intervention,
  ItemIntervention,
  Requete
} from "@prisma/client";

export type ListWithCards = List & { cards: Card[] };

export type CardWithList = Card & { list: List };

export type Boards = Board & { list: List };

export type ClientList = Client;

export type InterventionAll = Intervention & {
  items: ItemIntervention[];
  client: Client;
};

export type RequeteWithClient = Requete & { client: Client ,Intervention: Intervention[]};
