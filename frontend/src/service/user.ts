import { useFetchData } from "../hook/useFetchData";

const useUserList = () => {
  const data = useFetchData('user');
  return data;
};

export { useUserList };
