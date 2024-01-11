import React, {ChangeEvent, FC, useCallback, useRef, useState} from 'react';
import debounce from "lodash.debounce"
import styles from './Search.module.scss';
import {useDispatch} from "react-redux";
import {setSearchValue} from "../../redux/slices/filterSlice";

const Search: FC = () => {
    const dispatch = useDispatch();
    const [ value, setValue ] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);


    const onClickClear = () => {
        dispatch(setSearchValue(''));
        setValue("");
        inputRef.current?.focus();
    }

    const updateSearchValue = useCallback(
      debounce((str: string) => {
          dispatch(setSearchValue(str));
      }, 250),
      [],
    );

    const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
        updateSearchValue(event.target.value);
    }

    return (
      <div className={styles.root}>
          <svg className={styles.icon} version="1.1" viewBox="0 0 16 16">
              <g id="Guide"/>
              <g id="Layer_2">
                  <path
                    d="M13.85,13.15l-2.69-2.69c0.74-0.9,1.2-2.03,1.2-3.28C12.37,4.33,10.04,2,7.18,2S2,4.33,2,7.18s2.33,5.18,5.18,5.18   c1.25,0,2.38-0.46,3.28-1.2l2.69,2.69c0.1,0.1,0.23,0.15,0.35,0.15s0.26-0.05,0.35-0.15C14.05,13.66,14.05,13.34,13.85,13.15z    M3,7.18C3,4.88,4.88,3,7.18,3s4.18,1.88,4.18,4.18s-1.88,4.18-4.18,4.18S3,9.49,3,7.18z"/>
              </g>
          </svg>
          {
              value && <svg onClick={onClickClear} className={styles.clearIcon} version="1.1" viewBox="0 0 24 24">
                <g id="grid_system"/>
                <g id="_icons">
                    <path
                      d="M5.3,18.7C5.5,18.9,5.7,19,6,19s0.5-0.1,0.7-0.3l5.3-5.3l5.3,5.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3   c0.4-0.4,0.4-1,0-1.4L13.4,12l5.3-5.3c0.4-0.4,0.4-1,0-1.4s-1-0.4-1.4,0L12,10.6L6.7,5.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4   l5.3,5.3l-5.3,5.3C4.9,17.7,4.9,18.3,5.3,18.7z"/>
                </g>
            </svg>
          }
          <input
            ref={inputRef}
            value={value}
            onChange={onChangeInput}
            className={styles.input}
            placeholder="Поиск пиццы..."
          />
      </div>
    );
};

export default Search;