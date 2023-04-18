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
  const imgWidth = isIndex ? 150 : 50;

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
          marginTop: isIndex ? 20 : 0,
          borderRadius: `100%`,
          minWidth: imgWidth,
        }}
        imgStyle={{
          borderRadius: `50%`,
        }}
      />
      <p
        style={{
          width: 450,
          maxWidth: "90%",
          marginBottom: 20,
          fontSize: isIndex ? 20 : 14,
        }}
      >
        <strong>Hi, I'm Ryan.</strong> I live in Denver and work remotely as a
        JavaScript/React/Node Developer. I'm always having fun building{" "}
        <a href={"#portfolio"}>side projects</a> and sometimes write
        JavaScript-related <a href={"#writing"}>tutorials</a> that help folks
        build things, too.
      </p>
    </div>
  );
};

export default Bio;
