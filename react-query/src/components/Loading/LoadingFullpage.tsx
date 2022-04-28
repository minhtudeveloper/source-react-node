import { Spin } from "antd";
import { FC, ReactElement } from "react";
import "./style.scss";
export interface Props {
  isRun?: boolean;
}

export const LoadingFullpage: FC<Props> = (): ReactElement => {
  return (
    <div className='root'>
      <Spin />
    </div>
  );
};
