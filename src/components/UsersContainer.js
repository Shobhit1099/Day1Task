import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchUsers } from "../redux";
import { Card, Row, Typography } from "antd";

const { Title } = Typography;

function UsersContainer({ userData, fetchUsers }) {
  useEffect(() => {
    fetchUsers();
  }, []);
  return userData.loading ? (
    <h2>Loading</h2>
  ) : userData.error ? (
    <h2>{userData.error}</h2>
  ) : (
    <div style={{display: "flex", flexDirection: "column", margin: "0 30px 0 30px"}}>
      <Title style={{margin: "15px auto"}}>Users List</Title>
      <Row style={{ display: "flex" }} justify="space-around">
        {userData &&
          userData.users &&
          userData.users.map((user) => {
            return (
              <Card
                xl={5}
                lg={7}
                md={11}
                sm={11}
                xs={24}
                hoverable={true}
                title={user.title}
                extra={user.userId}
                style={{ width: 300, height: 250, marginBottom: 25 }}
              >
                <p>{user.body}</p>
              </Card>
            );
          })}
      </Row>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    userData: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsers: () => dispatch(fetchUsers()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);
