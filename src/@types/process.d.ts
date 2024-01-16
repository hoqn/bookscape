import "node";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      [key: string]: string | undefined;
      KOLIS_API_KEY: string;
    }
  }
}

export {};
