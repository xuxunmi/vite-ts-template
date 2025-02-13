/* eslint-disable @typescript-eslint/consistent-type-imports */
import '@vue/runtime-core';

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    PtTable: typeof import('./PtTable/index')['default'];
    PtMenuLi: typeof import('./PtMenuLi/index')['default'];
  }
}
