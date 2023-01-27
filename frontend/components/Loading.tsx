import { Spin } from 'antd';
import React from 'react';

type Props = {
  height?: string;
};

const Loading = ({ height = 'screen' }: Props) => {
  return (
    <div
      className={`h-${height} w-full bg-[#0000000d] flex justify-center items-center`}
    >
      <Spin />
    </div>
  );
};

export default Loading;
