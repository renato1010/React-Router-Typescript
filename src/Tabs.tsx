import React, { MouseEvent, ReactNode } from "react";

interface ITabsContext {
  activeName?: string;
  handleTabClick?: (name: string, content: ReactNode) => void;
}

type TabProps = {
  name: string;
  initialActive?: boolean;
  heading: () => string | JSX.Element;
};

type State = {
  activeName: string;
  activeContent: ReactNode;
};

// create context
const TabsContext = React.createContext<ITabsContext>({});

class Tabs extends React.Component<{}, State> {
  public static Tab: React.FC<TabProps> = props => (
    <TabsContext.Consumer>
      {(context: ITabsContext) => {
        if (
          !context.activeName &&
          props.initialActive &&
          context.handleTabClick
        ) {
          context.handleTabClick(props.name, props.children);
          return null;
        }
        const activeName = context.activeName
          ? context.activeName
          : props.initialActive
          ? props.name
          : "";
        const handleTabClick = (e: MouseEvent<HTMLLIElement>) => {
          if (context.handleTabClick) {
            context.handleTabClick(props.name, props.children);
          }
        };
        return (
          <li
            onClick={handleTabClick}
            className={props.name === activeName ? "active" : ""}
          >
            {props.heading()}
          </li>
        );
      }}
    </TabsContext.Consumer>
  );
  state: State = {
    activeName: "",
    activeContent: null
  };
  private handleTabClick = (name: string, content: ReactNode) => {
    this.setState({ activeName: name, activeContent: content });
  };
  render() {
    const { children } = this.props;
    return (
      <TabsContext.Provider
        value={{
          activeName: this.state ? this.state.activeName : "",
          handleTabClick: this.handleTabClick
        }}
      >
        <ul className="tabs">{children}</ul>
        <div>{this.state && this.state.activeContent}</div>
      </TabsContext.Provider>
    );
  }
}

export default Tabs;
