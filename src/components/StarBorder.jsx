"use client";
import React from 'react';
import './StarBorder.css';

const StarBorder = ({
  as = 'div',
  className = '',
  color = '#ffffff, #333333, #ffffff',
  speed = '6s',
  children,
  ...rest
}) => {
  const Component = as;

  return (
    <Component
      className={`star-border-container ${className}`}
      {...rest}
    >
      <div
        className="border-gradient-full"
        style={{
          background: `conic-gradient(from 0deg, transparent, ${color}, transparent)`,
          animationDuration: speed
        }}
      ></div>
      <div className="inner-content">{children}</div>
    </Component>
  );
};

export default StarBorder;