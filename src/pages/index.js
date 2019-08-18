import React from "react";
import { Link, graphql } from "gatsby";
import projects from "../utils/projects";
import articles from "../utils/posts";
import skills from "../utils/skills";

import Bio from "../components/bio";
import Layout from "../components/layout";
import ArticlePreview from "../components/ArticlePreview";
import SEO from "../components/seo";
import resume from "../../static/resume.pdf";

const MenuItem = ({ icon, children }) => {
  return (
    <li style={{ lineHeight: 1.6, marginBottom: 30 }}>
      <span style={{ fontSize: 20, marginRight: 5 }}>{icon}</span>
      {children}
    </li>
  );
};

class Index extends React.Component {
  render() {
    const { data } = this.props;

    const aboutMe = () => {
      return (
        <div>
          <p>
            I started working at a financial advisory firm in Chicago right
            after graduating from the University of Michigan in 2015 with majors
            in Economics and German.{" "}
          </p>
          <p>
            Not long after, I began to build a Wordpress site to share and
            discuss interesting articles, books and podcasts with my virtual
            book club. I became absolutely enthralled with customizing the
            design, implementing knew functionality and simply building
            something from nothing.
          </p>

          <p>
            Over the next year and a half, I spent my mornings, nights and
            weekends learning and coding as much as I could. I built a portfolio
            of fun and challenging projects to gain practical, technical
            experience. I also became a CERTIFIED FINANCIAL PLANNER™
            professional during that time.
          </p>
          <p>
            I landed my first developer job in early 2018 at an IT company and
            have been loving it ever since.
          </p>
        </div>
      );
    };

    const myPortfolio = () => {
      return (
        <div>
          {projects.map((project, i) => {
            return (
              <div key={i} style={{ marginBottom: 50 }}>
                <h3
                  style={{
                    marginBottom: 5,
                    fontSize: 20,
                  }}
                >
                  <a
                    style={{ borderBottom: "none" }}
                    href={project.npm || project.link || project.github}
                  >
                    {project.name}
                  </a>
                </h3>
                <p
                  style={{
                    fontSize: 16,
                    color: "rgba(0,0,0,0.6)",
                    marginBottom: 0,
                  }}
                >
                  {project.desc}
                </p>
                {/*<div*/}
                {/*style={{*/}
                {/*display: "flex",*/}
                {/*alignItems: "center",*/}
                {/*flexWrap: "wrap",*/}
                {/*}}*/}
                {/*>*/}
                {/*{project.skills.map(skill => {*/}
                {/*return (*/}
                {/*<div*/}
                {/*style={{*/}
                {/*margin: "5px 5px 0px 0px",*/}
                {/*fontSize: 12,*/}
                {/*borderRadius: 3,*/}
                {/*border: "1px solid rgba(0,0,0,0.1)",*/}
                {/*padding: "2px 5px",*/}
                {/*color: "rgba(0,0,0,0.7)",*/}
                {/*}}*/}
                {/*>*/}
                {/*{skill}*/}
                {/*</div>*/}
                {/*);*/}
                {/*})}*/}
                {/*</div>*/}
              </div>
            );
          })}
        </div>
      );
    };

    const mySkills = () => {
      const skillStyle = {
        margin: "0px 5px 3px 0px",
        fontSize: 14,
        borderRadius: 3,
        padding: "2px 4px",
        border: "1px solid rgba(0,0,0,0.1)",
        backgroundColor: "rgba(0,0,0,0.01)",
        color: "rgba(0,0,0,0.7)",
      };

      const sectionStyle = {
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        marginBottom: 40,
      };
      return (
        <div>
          <h4 style={{ marginBottom: 15 }}>Front End</h4>
          <div style={sectionStyle}>
            {skills.filter(skill => skill.type === "front").map((skill, i) => {
              return (
                <div key={i} style={skillStyle}>
                  {skill.name}
                </div>
              );
            })}
          </div>
          <h4 style={{ marginBottom: 15 }}>Back End</h4>
          <div style={sectionStyle}>
            {skills
              .filter((skill, i) => skill.type === "back")
              .map((skill, i) => {
                return (
                  <div key={i} style={skillStyle}>
                    {skill.name}
                  </div>
                );
              })}
          </div>
          <h4 style={{ marginBottom: 15 }}>Testing</h4>
          <div style={sectionStyle}>
            {skills.filter(skill => skill.type === "test").map((skill, i) => {
              return (
                <div key={i} style={skillStyle}>
                  {skill.name}
                </div>
              );
            })}
          </div>
          <h4 style={{ marginBottom: 15 }}>Everything else</h4>
          <div style={sectionStyle}>
            {skills.filter(skill => !skill.type).map((skill, i) => {
              return (
                <div key={i} style={skillStyle}>
                  {skill.name}
                </div>
              );
            })}
          </div>
        </div>
      );
    };

    const myArticles = () => {
      const list = articles.slice(0, 3);
      return (
        <div>
          {list.map((article, i) => {
            return <ArticlePreview key={i} article={article} />;
          })}
          <Link to={"/blog#guest"}>
            Click to read more of my writing &rarr;
          </Link>
        </div>
      );
    };

    return (
      <Layout
        location={this.props.location}
        style={{
          minHeight: "100vh",
          maxWidth: 600,
          margin: "auto",
          paddingTop: 0,
        }}
      >
        <SEO title="Ryan J Yost" />
        <Bio isIndex />
        <ul>
          <MenuItem icon={`👋`}>
            Connect with me on{" "}
            <a href={"https://twitter.com/ryanjyost"}>Twitter</a> and{" "}
            <a href={"https://www.linkedin.com/in/ryan-yost-b5b2bb65/"}>
              LinkedIn
            </a>{" "}
            or shoot me an email at{" "}
            <a href="mailto:ryanjyost@gmail.com">ryanjyost@gmail.com</a>
          </MenuItem>
          <MenuItem icon={`💻`}>
            Check out some of{" "}
            <a href="https://github.com/ryanjyost">my code on GitHub</a>. I
            mostly use React, Node and supporting players
          </MenuItem>
          <MenuItem icon={`🖋️`}>
            Read my <Link to={"/blog"}>blog posts</Link> and{" "}
            <Link to={"/blog#guest"}>guest writing</Link> in popular
            publications
          </MenuItem>
          <MenuItem icon={`📃`}>
            <a href={"resume.pdf"}>Download my resume</a>
          </MenuItem>
          <MenuItem icon={`👇`}>
            Scroll to learn more <a href={"#about"}>about me</a>,{" "}
            <a href={"#portfolio"}>software I've made</a>,{" "}
            <a href={"#writing"}>my writing</a> and{" "}
            <a href={"#skills"}>my skills/experience/technologies</a>.
          </MenuItem>
        </ul>
        <div style={{ margin: "100px 0px" }}>
          <h3 id={"about"}>About Me</h3>
          {aboutMe()}
          <h3 id={"writing"} style={{ marginTop: 100 }}>
            Things I've written
          </h3>
          {myArticles()}
          <h3 id={"portfolio"} style={{ marginTop: 100 }}>
            Things I've built
          </h3>
          {myPortfolio()}
          <h3 id={"skills"} style={{ marginTop: 100 }}>
            Skills and familiar tech
          </h3>
          {mySkills()}
        </div>
      </Layout>
    );
  }
}

export default Index;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
  }
`;
