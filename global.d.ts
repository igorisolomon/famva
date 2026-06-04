/// <reference types="vanilla-cookieconsent" />

declare module "*.css";

declare global {
  interface Window {
    gtag: (command: string, action: string, options: Record<string, any>) => void;
  }
}

export { };
