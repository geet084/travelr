import React from 'react';
import CountUp from 'react-countup';

export const Counter = ({ start, end, decimal = 0 }) => {
  //IGNORING COUNTUP PACKAGE FOR TESTING ... COUNTUPREF IS NOT TESTABLE
  /* istanbul ignore next line */
  return (
    <CountUp
      start={start}
      end={end}
      decimals={decimal}
      duration='1000000'
      delay={0}
      useEasing={false}
      separator=','
    >
      {({ countUpRef }) => <span ref={countUpRef} />}
    </CountUp>
  )
}

export default Counter;