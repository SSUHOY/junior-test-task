import * as React from 'react';
import styles from './skeleton.module.scss';

function Skeleton(props) {
  const { count } = props;

  const skeletonElements = Array.from({ length: count }, (_, index) => (
      <div
        key={index}
        className={`${styles.skeleton} ${styles.skeletonCard}`}
      />
  ));

  return <div className={styles.list}>{skeletonElements}</div>;
}

export default Skeleton;
