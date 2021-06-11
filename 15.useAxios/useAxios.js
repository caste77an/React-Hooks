import defaultAxios from "axios";
import { useState, useEffect } from "react";

const useAxios = (opts, axiosInstance = defaultAxios) => {
  const [state, setState] = useState({
    loading: true,
    error: null,
    data: null,
  });
  const [trigger, setTrigger] = useState(0);
  if (!opts.url) {
    return;
  }
  const refetch = () => {
    setState({
      ...state,
      loading: true,
    });
    // 임의의 숫자 생성을 위한 setTrigger
    setTrigger(Date.now());
  };
  useEffect(() => {
    axiosInstance(opts)
      .then((data) => {
        setState({
          ...state,
          loading: false,
          data,
        });
      })
      .catch((error) => {
        setState({ ...state, loading: false, error });
      });
  }, [trigger]);
  return { ...state, refetch };
};

export default useAxios;
