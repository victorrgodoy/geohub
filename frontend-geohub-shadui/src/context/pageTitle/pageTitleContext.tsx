import { createContext } from 'react';

type PageTitleContextType = {
  pageTitle: string;
  setPageTitle: (title: string) => void;
};

export const PageTitleContext = createContext<PageTitleContextType | undefined>(undefined);