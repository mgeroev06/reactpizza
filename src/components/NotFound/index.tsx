import React from 'react';
import style from './NotFound.module.scss'
import {FC} from "react";

const NotFoundBlock: FC = () => {
    return (
      <div className={style.root}>
          <h1>
              <span>:(</span>
              <br/>
              Not found
          </h1>
          <p className={style.description}>
              К сожалению данная страница отсутствует в нашем интернет-магазине
          </p>
      </div>
    );
};

export default NotFoundBlock;