import React from "react";
import { gql, useQuery } from '@apollo/client'; 
import BarGraph from './BarGraph';

const GET_USER_DATA = gql`
  query GetUserData {
    user {
      id
      login
      transactions {
        id
        amount
      }
      progresses {
        id
        grade
        objectId
        path
        createdAt
        isDone
      }
    }
  }
`;


function Profile() {
    const { loading, error, data } = useQuery(GET_USER_DATA);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
  
    const  user = data.user[0];
    const { transactions, progresses } = user;

    const transactionAmounts = transactions.map((transaction) => transaction.amount);
    const progressGrades = progresses.map(progress => progress.grade);

  
    return (
      <div>
        <h1>Profile Page</h1>
        <p>ID: {user.id}</p>
        <p>Login: {user.login}</p>
        <h2>Transactions</h2>
        <BarGraph data={transactionAmounts} width={500} height={200}/>
        <h2>Progress</h2>
        <BarGraph data={progressGrades} width={500} height={200}/>
        {progresses && progresses.map((item) => (
          <div key={item.id}>
            <p>Progress ID: {item.id}</p>
            <p>Grade: {item.grade}</p>
            <p>Object ID: {item.objectId}</p>
            <p>Path: {item.path}</p>
            <p>Created At: {item.createdAt}</p>
            <p>Done: {item.isDone ? "Yes" : "No"}</p>
          </div>
        ))}
      </div>
    );
  }
  
export default Profile;
