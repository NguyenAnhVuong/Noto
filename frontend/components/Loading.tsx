import { Spin } from 'antd';
import React from 'react';

type Props = {};

const Loading = (props: Props) => {
  return (
    <div className="h-screen w-full bg-[#0000000d] flex justify-center items-center">
      <Spin />
    </div>
  );
};

export default Loading;
