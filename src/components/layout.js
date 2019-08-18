import React from "react";
import "prismjs/themes/prism-tomorrow.css";
import { Link } from "gatsby";
import { useStaticQuery, graphql } from "gatsby";
import Image from "gatsby-image";

import { rhythm, scale } from "../utils/typography";

export default function Layout(props) {
  const { location, title, children } = props;
  const rootPath = `${__PATH_PREFIX__}/`;
  let header;

  const data = useStaticQuery(graphql`
    query LayoutQuery {
      avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
        childImageSharp {
          fixed(width: 36, height: 36) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author
          social {
            twitter
          }
        }
      }
    }
  `);

  const { author, social } = data.site.siteMetadata;
  const isRoot = location.pathname === rootPath;
  const { pathname } = location;

  header = (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 0px",
        maxWidth: "100%",
        // borderBottom: "1px solid rgba(0,0,0,0.05)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: 10,
        }}
      >
        {/*{!isRoot ? (*/}
        {/*<Image*/}
        {/*fixed={data.avatar.childImageSharp.fixed}*/}
        {/*alt={author}*/}
        {/*style={{*/}
        {/*marginRight: rhythm(1 / 4),*/}
        {/*marginBottom: 0,*/}
        {/*minWidth: 30,*/}
        {/*borderRadius: `100%`,*/}
        {/*}}*/}
        {/*imgStyle={{*/}
        {/*borderRadius: `50%`,*/}
        {/*}}*/}
        {/*/>*/}
        {/*) : null}*/}
        <div style={{ paddingRight: 20 }}>
          <h5
            style={{
              fontFamily: `Montserrat, sans-serif`,
              marginTop: 0,
              marginBottom: 0,
            }}
          >
            <Link
              style={{
                boxShadow: `none`,
                textDecoration: `none`,
                borderBottom: "none",
                color: `inherit`,
                fontSize: 16,
              }}
              to={`/`}
            >
              Yost's Posts
            </Link>
          </h5>
          <h6
            style={{
              fontSize: 10,
              marginBottom: 0,
              fontWeight: "normal",
              color: "rgba(0,0,0,0.6)",
            }}
          >
            Quick, step-by-step JavaScript tutorials
          </h6>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", marginTop: 10 }}>
        <Link
          to={`/`}
          style={{
            fontSize: 12,
            marginRight: 20,
            // borderBottom: pathname === "/" ? "none" : null,
            fontWeight: pathname === "/" ? "bold" : "normal",
          }}
        >
          About
        </Link>
        <Link
          to={`/blog`}
          style={{
            fontSize: 12,
            marginRight: 20,
            // borderBottom: pathname === "/blog" ? "none" : null,
            fontWeight: pathname === "/blog" ? "bold" : "normal",
          }}
        >
          Writing
        </Link>
        <Link
          to={`/subscribe`}
          style={{
            fontSize: 12,
            // borderBottom: pathname === "/blog" ? "none" : null,
            fontWeight: pathname === "/subscribe" ? "bold" : "normal",
          }}
        >
          Subscribe
        </Link>
      </div>
    </div>
  );

  return (
    <div
      style={{
        // backgroundColor: "rgb(51, 55, 70)",
        width: "100%",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          ...{
            maxWidth: rhythm(24),
            padding: `0px ${rhythm(3 / 4)}`,
          },
          ...props.style,
        }}
      >
        <header style={{ padding: "10px 0px" }}>{header}</header>
        <main style={{ padding: props.noMainPadding ? 0 : "0px 20px" }}>
          {children}
        </main>
        <footer
          style={{
            borderTop: "1px solid rgba(0,0,0,0.05)",
            marginTop: 50,
            padding: "20px 0px",
            fontSize: 12,
            width: "100%",
            textAlign: "center",
            color: "rgba(0,0,0,0.4)",
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 12,
              marginBottom: 10,
            }}
          >
            <Link to={"/blog"} style={{ margin: "0px 5px" }}>
              Blog
            </Link>
            <a
              style={{ margin: "0px 5px" }}
              href={"https://www.linkedin.com/in/ryan-yost-b5b2bb65/"}
            >
              LinkedIn
            </a>
            <a
              style={{ margin: "0px 5px" }}
              href={"https://twitter.com/ryanjyost"}
            >
              Twitter
            </a>
            <a style={{ margin: "0px 5px" }} href="mailto:ryanjyost@gmail.com">
              Email Me
            </a>
          </div>
          © {new Date().getFullYear()} Ryan J. Yost
        </footer>
      </div>
    </div>
  );
}
