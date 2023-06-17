import React from "react";
import { gql, useQuery } from '@apollo/client'; 
import BarGraph from './BarGraph';
import { useEffect, useState } from "react";


const GET_USER_DATA = gql`
  query GetUserData {
    user {
      id
      login
      transactions {
        id
        type
        amount
        userId
        createdAt
        path
      }
      progresses {
        id
        userId
        objectId
        grade
        createdAt
        updatedAt
        path
        isDone
      }
    }
  }
`;

const GET_AUDITS_BY_USER = gql`
  query GetAuditsByUser{
    audit{
      id
    }
  }
`;





function Profile() {
  const { loading, error, data } = useQuery(GET_USER_DATA);

  const [audits, setAudits] = useState(null);
  const [userId, setUserId] = useState(null);

  const { loading: auditsLoading, error: auditsError, data: auditsData } = useQuery(GET_AUDITS_BY_USER, {
    variables: { userId: userId},
    skip: !userId,  // Do not run this query until a userId is set
  });

  useEffect(() => {
    if (auditsData && auditsData.audit) { 
      setAudits(auditsData.audit);
    }
  }, [auditsData]);
  

  if (loading || auditsLoading) return <p>Loading...</p>;
  if (error || auditsError) return <p>Error: {(error || auditsError).message}</p>;

  const  user = data.user[0];
  const { transactions, progresses } = user;
  //include /gritlab/school-curriculum/ and remove the ones where path includes checkpoint
  const totalXP = transactions.reduce((total, transaction) => {
    if (transaction.type === 'xp' && transaction.path.includes('/gritlab/school-curriculum/')  /* !transaction.path.includes('/gritlab/school-curriculum/checkpoint') */  && !transaction.path.includes('/gritlab/school-curriculum/piscine-js') ) {
      return total + transaction.amount;
    } else {
      return total;
    }
  }, 0);

  console.log('totalXP: ',totalXP);
    const progressGrades = progresses.map(progress => progress.grade);

  if (!userId) {
    setUserId(user.id);
  }
  return (
    <div>
      <h1>Profile Page</h1>
      <p>ID: {user.id}</p>
      <p>Login: {user.login}</p>
      <table>
        <thead>
          <tr>
            <th>XP Amount</th>
            <th>Audits</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{totalXP}</td>
            <td>{audits ? audits.length  : 'Loading...'}</td>
          </tr>
        </tbody>
      </table>
      <h2>Transactions</h2>
      <BarGraph data={transactions.map((transaction) => transaction.amount)} width={500} height={200}/>
      <h2>Progress</h2>
      <BarGraph data={progressGrades} width={500} height={200}/>
    </div>
  );
  
  }
  
export default Profile;