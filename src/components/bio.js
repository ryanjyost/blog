/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import Image from "gatsby-image";

import { rhythm } from "../utils/typography";

const Bio = ({ isIndex }) => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
        childImageSharp {
          fixed(width: 50, height: 50) {
            ...GatsbyImageSharpFixed
          }
        }
      }

      heroImage: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
        childImageSharp {
          fixed(width: 150, height: 150) {
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

  return (
    <div
      style={{
        display: `flex`,
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 50,
      }}
    >
      <Image
        fixed={data[isIndex ? "heroImage" : "avatar"].childImageSharp.fixed}
        alt={author}
        style={{
          marginRight: rhythm(1 / 2),
          marginBottom: 20,
          marginTop: 20,
          borderRadius: `100%`,
          minWidth: 150,
        }}
        imgStyle={{
          borderRadius: `50%`,
        }}
      />
      <p style={{ width: 380, maxWidth: "90%", marginBottom: 20 }}>
        <strong>Hi, I'm Ryan.</strong> I live and work in Chicago as a Front End
        Engineer. I'm always building <a href={"#portfolio"}>side projects</a>{" "}
        and write <a href={"#writing"}>tutorials</a> that help folks build
        things, too.
        {` `}
        {!isIndex && (
          <a href={`https://twitter.com/${social.twitter}`}>
            Follow me on Twitter
          </a>
        )}
      </p>
    </div>
  );
};

export default Bio;
