import React from "react";

const AdminPage: React.FC<{ title: string }> = ({
  title = "Admin Panel"
}: {
  title: string;
}) => {
  return (
    <div className="page-container">
      <h1>{title}</h1>
      <p>You should only be here if you have logged in</p>
    </div>
  );
};

export default AdminPage;
