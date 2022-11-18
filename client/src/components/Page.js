import { useEffect } from 'react';
// change page title
const Page = (props) => {
  useEffect(() => {
    document.title = props.title || '';
  }, [props.title]);
  return props.children;
};

export default Page;
