export type KeyofType<T> = keyof T  
export type GetType<T,P> = P extends KeyofType<T> ? T[P]:never 
export type MergeKeyType<T extends Array<any>> = T extends [infer X,...infer Rect]? KeyofType<X>|MergeKeyType<Rect>:never  
export type MergeValueType<T extends Array<any>,P> = T extends [infer X,...infer Rect]? GetType<X,P>|MergeValueType<Rect,P>:never 
export type GetMerge<T extends Array<any>> = {[P in MergeKeyType<T>]?: MergeValueType<T,P>}