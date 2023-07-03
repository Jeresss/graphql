import React from "react";
import { gql, useQuery } from '@apollo/client'; 
import { useEffect, useState } from "react";
import HeatmapChart from './HeatmapChart'; 
import AuditRatio from "./AuditRatio";
import './Profile.css'; 

const GET_USER_DATA = gql`
  query GetUserData {
    user {
      id
      login
      attrs
      campus
      level: transactions(
        where: {type: {_eq: "level"}, path: {_ilike: "%/school-curriculum/%"}},
        order_by: {amount: desc},
        limit: 1
      ){
        amount
      }
      upAmount: transactions_aggregate(where: {type: {_eq: "up"}}) {
        aggregate {
          sum {
            amount
          }
        }
      }
      downAmount: transactions_aggregate(where: {type: {_eq: "down"}}) {
        aggregate {
          sum {
            amount
          }
        }
      }
      xpAmount: transactions_aggregate(
        where: {
          type: {_eq: "xp"},
          _or: [
            {attrs: {_eq: {}}},
            {attrs: {_has_key: "group"}}
          ],
          _and: [
            {path: {_nlike: "%/piscine-js/%"}},
            {path: {_nlike: "%/piscine-go/%"}}
          ]
        }
      ) {
        aggregate {
          sum {
            amount
          }
        }
      }
      timeline: transactions(
        where: {
          type: {_eq: "xp"},
          _or: [
            {attrs: {_eq: {}}},
            {attrs: {_has_key: "group"}}
          ],
          _and: [
            {path: {_nlike: "%/piscine-js/%"}},
            {path: {_nlike: "%/piscine-go/%"}}
          ]
        }
      ) {
        amount
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

const GET_USER_DATA_WITH_TIMELINE = gql`
  query GetUserXPWithTimeline {
    user {
      XPWithDates: transactions(
        where: {
          type: {_eq: "xp"}
        }
      ) {
        amount
        createdAt
      }
    }
  }
`;


function Profile({ userId, setUserId }) {
  const { loading, error: queryError, data } = useQuery(GET_USER_DATA);
  const [audits, setAudits] = useState(null);

  const { loading: auditsLoading, error: auditsError, data: auditsData } = useQuery(GET_AUDITS_BY_USER, {
    variables: { userId: userId },
    skip: !userId, // Do not run this query until a userId is set
  });

  useEffect(() => {
    if (auditsData && auditsData.audit) { 
      setAudits(auditsData.audit);
    }
  }, [auditsData]);

  const { loading: timelineLoading, error: timelineError, data: XPData } = useQuery(GET_USER_DATA_WITH_TIMELINE);
  
  if (loading || auditsLoading || timelineLoading) return <p>Loading...</p>;
  if (queryError || auditsError || timelineError) return <p>Error: {(queryError || auditsError || timelineError).message}</p>;

  const user = data.user[0];
  const totalXP = user.xpAmount.aggregate.sum.amount;
  const downAmount = user.downAmount.aggregate.sum.amount;
  const upAmount = user.upAmount.aggregate.sum.amount;
  const auditratio = Math.round((upAmount / downAmount) * 100) / 100;
  const age = Math.floor((new Date() - new Date(user.attrs.dateOfBirth).getTime()) / 3.15576e+10);
  const level = user.level && user.level.length > 0 ? user.level[0].amount : "N/A";
  const heatmapData = XPData.user[0].XPWithDates; // Extract heatmap data


  if (!userId) {
    setUserId(user.id);
  }

  return (
    <div className="profile-container">
      <h1 className="profile-heading">Profile Page</h1>
      <div className="profile-image-container">
        <img src={user.attrs.image} alt="Profile" className="profile-image" />
      </div>
      <div className="profile-details">
        <p className="profile-id">ID: {user.id}</p>
        <p className="profile-name">
          {user.attrs.firstName} {user.attrs.lastName}
        </p>
        <p className="profile-age">Age: {age}</p>
        <p className="profile-country">From: {user.attrs.country}</p>
        <p className="profile-login">Login: {user.login}</p>
        <p className="profile-email">Email: {user.attrs.email}</p>
        <p className="profile-phone">PhoneNumber: {user.attrs.phonenumber}</p>
        <p className="profile-campus">Campus: {user.campus}</p>
        <p className="profile-level">Level: {level}</p>
      </div>
      <table className="profile-table">
        <thead>
          <tr>
            <th>XP Amount</th>
            <th>Audits</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{totalXP}</td>
            <td>{audits ? audits.length : "Loading..."}</td>
          </tr>
        </tbody>
      </table>
      <div className="profile-statistics">
         {XPData && XPData.user && XPData.user.length > 0 && XPData.user[0].XPWithDates && (
          <div className="profile-graph">
         <h2>XP Earned Over Time</h2>
         <div id="chart-heatmap">
           <HeatmapChart data={heatmapData} />
         </div>
      </div>
      )}
      <div>
        <h2>Your AuditRatio: {auditratio}</h2>
        <AuditRatio upAmount={upAmount} downAmount={downAmount} />
        </div>
      </div>
    </div>
  );
}

export default Profile;
