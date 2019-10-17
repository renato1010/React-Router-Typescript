import React, { ComponentType } from "react";

type Props = { loading: boolean };

const withLoader = <P extends object>(
  Component: ComponentType<P>
): React.FC<P & Props> => (props: P & Props) =>
  props.loading ? (
    <div className="loader-overlay">
      <div className="loader-circle-wrap">
        <div className="loader-circle"></div>
      </div>
    </div>
  ) : (
    <Component {...props} />
  );

export default withLoader;
