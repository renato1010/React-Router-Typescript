import React, { ChangeEvent, KeyboardEvent } from "react";
import { NavLink, RouteComponentProps, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { IApplicationState } from "./Store";
import logo from "./logo.svg";
import BasketSummary from "./BasketSummary";

type Props = RouteComponentProps & { basketCount: number };

const Header: React.FC<Props> = props => {
  const { location, history, basketCount } = props;
  const [search, setSearch] = React.useState("");
  React.useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    setSearch(searchParams.get("search") || "");
  }, [location.search]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
  };
  const handleSearchKeydown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      history.push(`/products?search=${search}`);
    }
  };
  return (
    <header className="header">
      <div className="search-container">
        <input
          type="search"
          placeholder="search"
          value={search}
          onChange={handleSearchChange}
          onKeyDown={handleSearchKeydown}
        />
        <BasketSummary count={basketCount} />
      </div>
      <img src={logo} alt="logo" className="header-logo" />
      <h1 className="header-title">React Shop</h1>
      <nav>
        <NavLink
          to="/products"
          className="header-link"
          activeClassName="header-link-active"
        >
          Products
        </NavLink>
        <NavLink
          to="/contactus"
          className="header-link"
          activeClassName="header-link-active"
        >
          Contact Us
        </NavLink>
        <NavLink
          to="/admin"
          className="header-link"
          activeClassName="header-link-active"
        >
          Admin
        </NavLink>
      </nav>
    </header>
  );
};

const mapStateToProps = (store: IApplicationState) => {
  return {
    basketCount: store.basket.products.length
  };
};

export default connect(mapStateToProps)(withRouter(Header));
