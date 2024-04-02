import React, { useState, createContext, useContext, useEffect } from "react";
import type { NavigationContextType } from "../types";

const NavigationContext = createContext<NavigationContextType>({
  navigationData: { currentPath: "" },
});

const useNavigation = (): NavigationContextType =>
  useContext(NavigationContext);

function NavigationProvider(
  props: React.PropsWithChildren<unknown>,
): JSX.Element {
  const [navigationData, setNavigationData] = useState({ currentPath: "" });

  return (
    <NavigationContext.Provider
      value={{ navigationData, setNavigationData }}
      {...props}
    />
  );
}

function withNavigationWatcher(
  Component: React.ElementType,
  path: string,
): JSX.Element {
  const WrappedComponent = function (
    props: Record<string, unknown>,
  ): JSX.Element {
    const { setNavigationData } = useNavigation();

    useEffect(() => {
      setNavigationData?.({ currentPath: path });
    }, [setNavigationData]);

    return <Component {...props} />;
  };
  return <WrappedComponent />;
}

export { NavigationProvider, useNavigation, withNavigationWatcher };
