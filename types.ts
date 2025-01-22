import { Card, List,Client , Board } from "@prisma/client";

export type ListWithCards = List & { cards: Card[] };

export type CardWithList = Card & { list: List };

export type Boards = Board & { list: List };

export type ClientList = Client ;
