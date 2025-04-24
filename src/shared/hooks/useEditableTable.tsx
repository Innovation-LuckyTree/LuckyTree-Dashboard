import { useEffect, useState } from "react";
import { message } from "antd";

export interface EditableTableProps<T> {
  fetchData: () => Promise<T[]>;
  rowKey: keyof T;
}

export const useEditableTable = <T extends Record<string, any>>({
  fetchData,
  rowKey,
}: EditableTableProps<T>) => {
  const [data, setData] = useState<T[]>([]);
  const [originalData, setOriginalData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modifiedRows, setModifiedRows] = useState<Set<T[typeof rowKey]>>(new Set());

  useEffect(() => {
    fetchData().then((res) => {
      setData(res);
      setOriginalData(JSON.parse(JSON.stringify(res)));
      setLoading(false);
      setModifiedRows(new Set());
    })
    .catch((err) => {
      console.error("Error fetching data:", err);
      setError("Failed to load data.");
      setLoading(false);
    });
  }, []);

  const hasChanges = modifiedRows.size > 0;

  const handleUpdate = <K extends keyof T>(keyValue: T[typeof rowKey], field: K, value: T[K]) => {
    setData((prev) =>(
      prev.map((item) => {
        if (item[rowKey] === keyValue) {
          setModifiedRows((prevSet) => new Set(prevSet).add(keyValue));
          return { ...item, [field]: value };
        }
        return item;
      })
    ));
  };

  const handleDelete = (keyValue: T[typeof rowKey]) => {
    setData((prev) => prev.filter((item) => item[rowKey] !== keyValue));
    setModifiedRows((prevSet) => {
      const newSet = new Set(prevSet);
      newSet.delete(keyValue);
      return newSet;
    });
  };

  const handleAdd = (newItem: T) => {
    setData((prev) => [newItem, ...prev]);
    setModifiedRows((prevSet) => new Set(prevSet).add(newItem[rowKey]));
  };

  const handleCancel = (popupMessage?: string| undefined) => {
    setData(JSON.parse(JSON.stringify(originalData)));
    setModifiedRows(new Set());
    message.info(popupMessage ?? "Changes have been reset");
  };

  const handleSave = (popupMessage?: string| undefined) => {
    setOriginalData(JSON.parse(JSON.stringify(data)));
    setModifiedRows(new Set());
    message.success(popupMessage ?? "Changes saved successfully");
  };

  return {
    data,
    loading,
    hasChanges,
    error,
    handleUpdate,
    handleDelete,
    handleAdd,
    handleCancel,
    handleSave
  };
};