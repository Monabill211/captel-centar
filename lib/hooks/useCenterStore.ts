"use client";

import { useCallback, useEffect, useState } from "react";
import { loadCenterData, STORE_EVENT } from "@/lib/data/store";
import type { CenterData } from "@/lib/data/types";

export function useCenterStore() {
  const [data, setData] = useState<CenterData>(() => loadCenterData());

  const refresh = useCallback(() => {
    setData(loadCenterData());
  }, []);

  useEffect(() => {
    refresh();
    const onUpdate = () => refresh();
    window.addEventListener(STORE_EVENT, onUpdate);
    window.addEventListener("storage", onUpdate);
    return () => {
      window.removeEventListener(STORE_EVENT, onUpdate);
      window.removeEventListener("storage", onUpdate);
    };
  }, [refresh]);

  return { ...data, refresh };
}
