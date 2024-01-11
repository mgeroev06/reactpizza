declare module '*.svg' {
  const value: string;
  export default value;
}

declare module '*.png' {
  const value: string;
  export default value;
}

declare module '*.scss' {
  export const root: string;
  export const header: string;
  export const content: string;
}