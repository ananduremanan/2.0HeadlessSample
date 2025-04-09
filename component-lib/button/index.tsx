/**
 * Copyright (c) Grampro Business Services and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  buttonClass?: string;
}

export const Button = ({
  children,
  buttonClass = "px-2 py-2 bg-black text-white rounded-md hover:bg-gray-700",
  ...props
}: ButtonProps) => {
  return (
    <button className={buttonClass} {...props}>
      {children}
    </button>
  );
};
