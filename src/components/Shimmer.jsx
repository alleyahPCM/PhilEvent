import React from "react";

import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

function ShimmerComponent() {
  return (
    <div>
      <Skeleton height={32} width={150} style={{ marginTop: '10px' }} />
      <Skeleton width={500} height={500} />
    </div>
  );
}

export default ShimmerComponent;





    