import { useContext, useState, type ReactNode } from "react";
import { PageTitleContext } from "./pageTitleContext";

export function PageTitleProvider({ children }: { children: ReactNode }) {
  const [pageTitle, setPageTitle] = useState('Dashboard');

  return (
    <PageTitleContext.Provider value={{ pageTitle, setPageTitle }}>
      {children}
    </PageTitleContext.Provider>
  );
};


export function usePageTitle() {
  const context = useContext(PageTitleContext);
  if (!context) {
    throw new Error('usePageTitle must be used within PageTitleProvider');
  }
  return context;
}