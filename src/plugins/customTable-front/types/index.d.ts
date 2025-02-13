import type _PtTable from './PtTable/index.d.ts';
import type _PtMenuLi from './PtMenuLi/index.d.ts';
import {
  PtLocaleType,
  PtTableEditConfigType,
  PtTableColumnsType,
  PtPaginationType,
  PtMenuConfigType,
  PtAreaConfigType,
} from './PtTable/prop';

import './components.d';

declare const _default: {
  install: (app: any, options?: Record<string, unknown> | undefined) => void;
};
export default _default;

declare type PtTable = typeof _PtTable;
declare type PtTableComponent = typeof _PtTable;
declare type PtMenuLi = typeof _PtMenuLi;

export type {
  PtTable,
  PtTableComponent,
  PtLocaleType,
  PtTableEditConfigType,
  PtTableColumnsType,
  PtPaginationType,
  PtMenuConfigType,
  PtAreaConfigType,
  PtMenuLi
};
