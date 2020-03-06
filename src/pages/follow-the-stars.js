import React, { useState, useEffect } from "react";
import { Link } from "gatsby";
import SEO from "../components/seo";
import axios from "axios";

export default function FollowTheStars() {
  const [username, updateUsername] = useState("");
  const [email, updateEmail] = useState("");
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    console.log(window.location.search);
    const [param, userId] = window.location.search.replace("?", "").split("=");
    if (param === "unsubscribe" && userId) {
      axios
        .delete(`${process.env.GATSBY_API_URL}/follow-the-stars/${userId}`)
        .then(response => {
          setDeleteSuccess(true);
        })
        .catch(e => {
          setError("Something went wrong.");
        });
    }
  }, []);

  function handleClick() {
    setError(null);
    setPending(true);
    axios
      .post(`${process.env.GATSBY_API_URL}/follow-the-stars`, {
        username,
        email,
      })
      .then(response => {
        if (response.data.error) {
          setError(response.data.error);
          setPending(false);
        } else if (response.data.success) {
          setUsers(response.data.users);
          setSuccess(true);
          setPending(false);
        } else {
          setError(response.data.error);
          setPending(false);
        }
      })
      .catch(e => {
        setError("Something went wrong.");
      });
  }

  function renderSignupForm() {
    return (
      <>
        <h2
          style={{
            color: "rgba(255, 255, 255, 1)",
            textAlign: "center",
            marginBottom: 20,
            borderBottom: "2px solid rgba(255, 255, 255, 0.2)",
            padding: 10,
          }}
        >
          ⭐️&nbsp;&nbsp;&nbsp;Follow the Stars&nbsp;&nbsp;&nbsp;⭐️
        </h2>

        <h4
          style={{
            textAlign: "center",
            color: "rgba(255, 255, 255, 0.8)",
            lineHeight: 1.4,
          }}
        >
          A weekly email with the repos that the folks you follow on GitHub have
          starred.
        </h4>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <label style={{ color: "rgba(255, 255, 255, 0.7)" }}>
            GitHub Username
          </label>
          <input
            disabled={pending}
            value={username}
            onChange={e => updateUsername(e.target.value)}
            placeholder="ryanjyost"
            style={{
              marginBottom: 20,
              padding: "5px 10px",
              borderRadius: 3,
              border: "0px solid transparent",
              width: 300,
            }}
          />
          <label style={{ color: "rgba(255, 255, 255, 0.7)" }}>
            Email to send your list to
          </label>
          <input
            disabled={pending}
            value={email}
            onChange={e => updateEmail(e.target.value)}
            placeholder="ryanjyost@gmail.com"
            style={{
              marginBottom: 20,
              padding: "5px 10px",
              borderRadius: 3,
              border: "0px solid transparent",
              width: 300,
            }}
          />
          <button
            id="followTheStarsBtn"
            disabled={!email.includes("@") || !username || pending}
            onClick={handleClick}
          >
            {pending ? "Setting you up..." : "Sign Up"}
          </button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>

        <hr
          style={{
            width: "100%",
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            marginTop: 50,
          }}
        />

        <div
          style={{
            color: "rgba(255, 255, 255, 0.9)",
            textAlign: "center",
          }}
        >
          <h3 style={{ color: "rgba(255, 255, 255, 0.8)" }}>How it works</h3>
          <p>☝️ Provide your GitHub username and an email above.</p>
          <p>⭐ Follow folks on GitHub. They star repositories.</p>
          <p>📨 Get a weekly email with all of those starred repos.</p>
          <p>🌎 Discover useful tools and resources &rarr; Rule the world.</p>
        </div>
      </>
    );
  }

  function renderSuccess() {
    function singleUser(user) {
      return (
        <a
          id={user.id}
          href={user.html_url}
          target="_blank"
          style={{
            display: "flex",
            alignItems: "center",
            maxWidth: 200,
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            margin: 20,
            borderRadius: 3,
          }}
        >
          <img
            src={user.avatar_url}
            width={50}
            style={{
              margin: "0px",
              borderBottomLeftRadius: 3,
              borderTopLeftRadius: 3,
            }}
          />
          <p style={{ margin: 0, padding: 10 }}>{user.login}</p>
        </a>
      );
    }

    return (
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <h2 style={{ textAlign: "center", color: "#fff" }}>
          You're all set up!
        </h2>
        <h4 style={{ textAlign: "center", color: "#fff" }}>
          You should get your first email soon. And if you're looking to follow
          more people, here are the GitHub users I follow.
        </h4>
        {users.map(user => {
          return singleUser(user);
        })}
      </div>
    );
  }

  function renderDeleteSuccess() {
    return (
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <h2 style={{ textAlign: "center", color: "#fff" }}>
          You've been unsubscribed successfully.
        </h2>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        margin: "auto",
        paddingTop: 0,
        backgroundColor: "rgba(67,178,170,1)",
        padding: 20,
      }}
    >
      <SEO
        title="Follow the Stars"
        description="A weekly email with the projects that the folks you follow on GitHub have starred."
        image="followTheStars.png"

      />
      <div
        style={{
          color: "rgba(255, 255, 255, 0.6)",
          display: "flex",
          alignItems: "baseline",
          justifyContent: "flex-end",
        }}
      >
        Built by{" "}
        <Link to={`/`} style={{ color: "#fff", marginLeft: 5 }}>
          Ryan
        </Link>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          padding: "100px 0px 0px 0px",
          maxWidth: 500,
          margin: "auto",
        }}
      >
        {deleteSuccess
          ? renderDeleteSuccess()
          : success
          ? renderSuccess()
          : renderSignupForm()}
      </div>
    </div>
  );
}

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
