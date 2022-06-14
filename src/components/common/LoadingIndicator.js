/* *****************************************************************************
 Copyright (c) 2020-2021 Wisipsy and/or its affiliates. All rights reserved.
 WISIPSY PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
***************************************************************************** */

import React from "react";

const LoadingIndicator = () => {
  return (
    <div className="d-flex justify-content-center overflow-hidden">
      <div className="lds-dual-ring" />
    </div>
  );
};

export default LoadingIndicator;
