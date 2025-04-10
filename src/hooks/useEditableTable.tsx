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

  useEffect(() => {
    fetchData().then((res) => {
      setData(res);
      setOriginalData(JSON.parse(JSON.stringify(res)));
      setLoading(false);
    });
  }, []);

  const hasChanges = JSON.stringify(data) !== JSON.stringify(originalData);

  const handleUpdate = <K extends keyof T>(keyValue: T[typeof rowKey], field: K, value: T[K]) => {
    setData((prev) =>(
      prev.map((item) => (item[rowKey] === keyValue ? { ...item, [field]: value } : item)))
    );
  };

  const handleDelete = (keyValue: T[typeof rowKey]) => {
    setData((prev) => prev.filter((item) => item[rowKey] !== keyValue));
  };

  const handleAdd = (item: T) => {
    setData((prev) => [item, ...prev]);
  };

  const handleCancel = () => {
    setData(JSON.parse(JSON.stringify(originalData)));
    message.info("Changes have been reset");
  };

  const handleSave = () => {
    setOriginalData(JSON.parse(JSON.stringify(data)));
    message.success("Changes saved successfully");
  };

  return {
    data,
    loading,
    hasChanges,
    handleUpdate,
    handleDelete,
    handleAdd,
    handleCancel,
    handleSave,
  };
};