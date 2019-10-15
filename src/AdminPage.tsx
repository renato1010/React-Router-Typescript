import React from "react";
import { RouteComponentProps, NavLink, Route } from "react-router-dom";

interface Props extends RouteComponentProps {
  title: string;
}
interface IUser {
  id: number;
  name: string;
  isAdmin: boolean;
}

const adminUserData: IUser[] = [
  { id: 1, name: "Fred", isAdmin: true },
  { id: 2, name: "Bob", isAdmin: false },
  { id: 3, name: "Jane", isAdmin: true }
];

const AdminUser: React.FC<RouteComponentProps<{ id: string }>> = ({
  match
}) => {
  let user: IUser | undefined;
  if (match.params.id) {
    const id: number = parseInt(match.params.id, 10);
    user = adminUserData.find(u => u.id === id);
  } else {
    return null;
  }
  return (
    <div>
      <div>
        <b>Id:</b>
        {!!user ? <span>{user.id.toString()}</span> : <span></span>}
      </div>
      <div>
        <b>Is Admin: </b>
        {!!user ? <span>{user.isAdmin.toString()}</span> : <span></span>}
      </div>
    </div>
  );
};

const AdminUsers: React.FC = () => {
  return (
    <div>
      <ul className="admin-sections">
        {adminUserData.map(user => (
          <li key={user.id}>
            <NavLink
              to={`/admin/users/${user.id}`}
              activeClassName="admin-link-active"
            >
              {user.name}
            </NavLink>
          </li>
        ))}
      </ul>
      <Route path="/admin/users/:id" component={AdminUser} />
    </div>
  );
};

const AdminProducts: React.FC = () => {
  return <div>Some options to administer products</div>;
};

const AdminPage: React.FC<Props> = ({ location, history, title }) => {
  return (
    <div className="page-container">
      <h1>{title}</h1>
      <ul className="admin-sections">
        <li key="users">
          <NavLink to={"/admin/users"} activeClassName="admin-link-active">
            Users
          </NavLink>
        </li>
        <li key="products">
          <NavLink to={"/admin/products"} activeClassName="admin-link-active">
            Products
          </NavLink>
        </li>
      </ul>
      <Route path="/admin/users" component={AdminUsers} />
      <Route path="/admin/products" component={AdminProducts} />
    </div>
  );
};

export default AdminPage;
