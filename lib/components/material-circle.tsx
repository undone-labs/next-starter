import React from 'react';
import styles from './material-circle.module.scss';

type MaterialCircleProps = {
  className?: string;
};

export const MaterialCircle = ({ className }: MaterialCircleProps) => {
  return (
    <svg className={`${styles.loader} ${className || ''}`} viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
      <circle
        className={styles.path}
        fill="none"
        strokeWidth="6"
        strokeLinecap="round"
        cx="33"
        cy="33"
        r="30"
      />
    </svg>
  );
}; 
