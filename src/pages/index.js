import React from "react";
import { Link, graphql } from "gatsby";
import Image from "gatsby-image";
import projects from "../utils/projects";
import articles from "../utils/posts";
import skills from "../utils/skills";

import Bio from "../components/bio";
import Layout from "../components/layout";
import ArticlePreview from "../components/ArticlePreview";
import SEO from "../components/seo";
import { rhythm } from "../utils/typography";
import SubscribeToNewsletter from "../components/SubscribeToNewsletter";

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
          <h5 style={{ marginBottom: 10 }}>Background</h5>
          <p>
            I started working at a financial advisory firm in Chicago right
            after graduating from the University of Michigan in 2015 with majors
            in Economics and German.{" "}
          </p>
          <p>
            Not long after, I began to build a Wordpress site to share and
            discuss interesting articles, books and podcasts with my virtual
            book club. I became obsessed with customizing the design,
            implementing new functionality and simply building something from
            nothing.
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
          {/*<h5 style={{ marginBottom: 10 }}>Current Work</h5>*/}
          {/*<p>*/}
          {/*  My typical work day involves a healthy dose of React programming,*/}
          {/*  leveraging Redux and other supporting players in an Agile/Scrum*/}
          {/*  environment. I'll also write some end-to-end tests, conduct code*/}
          {/*  reviews and collaborate with our UX designer on new features.*/}
          {/*</p>*/}
          {/*<p>*/}
          {/*  Projects range from internal applications that manage hardware in*/}
          {/*  datacenters around the world, to building out features in our portal*/}
          {/*  for enterprise clients and tackling greenfield software in*/}
          {/*  consultative relationships.*/}
          {/*</p>*/}
          {/*<p>*/}
          {/*  While not my usual responsibilities, I have also built a native*/}
          {/*  tablet application, carried out architectural and build-pipeline*/}
          {/*  improvements for our large React/Redux application and written some*/}
          {/*  Node.js.*/}
          {/*</p>*/}
          <h5 style={{ marginBottom: 10 }}>Outside the 9 to 5</h5>
          <p>
            A lot of my free time is spent building side projects, playing with
            new tech and participating in the community by writing tutorials and
            attending the occasional meetup (gave my first talk in January of
            2020!). I really love software development, so work and play are
            often mixed.
          </p>
          <p>
            I also enjoy movies, staying active, good podcasts, taking improv
            classes, spending time with friends and going on at least one
            adventure a year. The most recent one was scuba diving in Grand
            Cayman, where I saw some sharks and a huge eel, swam through
            absolutely beautiful coral reefs and did my best not to get crushed
            by the boat in rough waters!
          </p>
        </div>
      );
    };

    const myPortfolio = () => {
      return (
        <div>
          {projects.map((project, i) => {
            return (
              <div key={i} style={{ marginBottom: 100 }}>
                <h3
                  style={{
                    marginBottom: 5,
                    fontSize: 22,
                  }}
                >
                  <a href={project.npm || project.link || project.github}>
                    {project.name}
                  </a>
                </h3>
                <p
                  style={{
                    fontSize: 18,
                    color: "rgba(0,0,0,0.6)",
                    marginBottom: 3,
                  }}
                >
                  {project.desc}
                </p>
                <div style={{ display: "flex", fontSize: 13, opacity: 0.6 }}>
                  <div style={{ marginRight: 10 }}>
                    {project.frontCode ? (
                      <div>
                        View{" "}
                        <a
                          href={project.frontCode}
                          style={{ margin: "0px 1px" }}
                        >
                          frontend
                        </a>{" "}
                        and{" "}
                        <a href={project.github} style={{ margin: "0px 1px" }}>
                          backend
                        </a>{" "}
                        code on GitHub
                      </div>
                    ) : (
                      <a href={project.github}>View code on GitHub</a>
                    )}
                  </div>
                  {project.npm ? (
                    <div style={{ marginRight: 10 }}>
                      <a href={project.npm} style={{ margin: "0px 1px" }}>
                        View on npm
                      </a>
                    </div>
                  ) : null}
                  {project.dataCode ? (
                    <div style={{ marginRight: 10 }}>
                      <a href={project.dataCode} style={{ margin: "0px 1px" }}>
                        View data aggregation code on GitHub
                      </a>
                    </div>
                  ) : null}
                  {project.extCode ? (
                    <div style={{ marginRight: 10 }}>
                      <a href={project.extCode} style={{ margin: "0px 1px" }}>
                        View Chrome Extension
                      </a>
                    </div>
                  ) : null}
                </div>
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
                {data[project.preview] ? (
                  <Image
                    fluid={data[project.preview].childImageSharp.sizes}
                    alt={project.preview}
                    style={{
                      width: "100%",
                      borderRadius: `5px`,
                      marginTop: 20,
                      border: "1px solid #f2f2f2",
                    }}
                  />
                ) : null}
              </div>
            );
          })}
        </div>
      );
    };

    const mySkills = () => {
      const skillStyle = {
        margin: "0px 5px 3px 0px",
        fontSize: 18,
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
          <h4 style={{ marginBottom: 15 }}>General</h4>
          <div style={sectionStyle}>
            {skills
              .filter(skill => skill.type === "general")
              .map((skill, i) => {
                return (
                  <div key={i} style={skillStyle}>
                    {skill.name}
                  </div>
                );
              })}
          </div>
          <h4 style={{ marginBottom: 15 }}>Front End</h4>
          <div style={sectionStyle}>
            {skills
              .filter(skill => skill.type === "front")
              .map((skill, i) => {
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
            {skills
              .filter(skill => skill.type === "test")
              .map((skill, i) => {
                return (
                  <div key={i} style={skillStyle}>
                    {skill.name}
                  </div>
                );
              })}
          </div>
          <h4 style={{ marginBottom: 15 }}>Concepts</h4>
          <div style={sectionStyle}>
            {skills
              .filter(skill => skill.type === "concepts")
              .map((skill, i) => {
                return (
                  <div key={i} style={skillStyle}>
                    {skill.name}
                  </div>
                );
              })}
          </div>
          <h4 style={{ marginBottom: 15 }}>Tools</h4>
          <div style={sectionStyle}>
            {skills
              .filter(skill => skill.type === "tools")
              .map((skill, i) => {
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
          <Link to={"/blog#guest"} style={{ fontSize: 16 }}>
            Read more of my writing &rarr;
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
        <div style={{ height: 20 }} />
        <Bio isIndex />

        <ul
          className={"noListStyle"}
          style={{
            backgroundColor: "rgba(67, 178, 170, 0.1)",
            border: "1px solid rgba(67, 178, 170, 0.3)",
            padding: "20px 20px 5px 20px",
            borderRadius: 5,
            marginBottom: 60,
          }}
        >
          <MenuItem icon={`👇`}>
            Scroll to see{"   "}
            <a href={"#portfolio"}>
              <strong>software I've made</strong>
            </a>
            {"   "}
            and{"   "}
            <a href={"#skills"}>
              <strong>my skills/experience/technologies</strong>
            </a>
            .
          </MenuItem>
          <MenuItem icon={`🖋️`}>
            Read my{" "}
            <Link to={"/blog"}>
              <strong>blog posts</strong>
            </Link>{" "}
            and{" "}
            <Link to={"/blog#guest"}>
              <strong>guest writing</strong>
            </Link>{" "}
            in popular publications
          </MenuItem>
          <MenuItem icon={`💻`}>
            Check out some of{" "}
            <a href="https://github.com/ryanjyost">
              <strong>my code on GitHub</strong>
            </a>
            . I mostly use React, Node and supporting players
          </MenuItem>

          <MenuItem icon={`📃`}>
            <a href={"Yost_Ryan_Resume.pdf"}>
              <strong>Download my resume</strong>
            </a>
          </MenuItem>

          <MenuItem icon={`👋`}>
            Connect with me on{" "}
            <a href={"https://www.linkedin.com/in/ryan-yost-b5b2bb65/"}>
              <strong>LinkedIn</strong>
            </a>{" "}
            or shoot me an email at{" "}
            <a href="mailto:ryanjyost@gmail.com">
              <strong>ryanjyost@gmail.com</strong>
            </a>
          </MenuItem>
        </ul>

        {/*<SubscribeToNewsletter />*/}

        <div style={{ margin: "100px 0px" }}>
          <h2
            id={"portfolio"}
            style={{
              borderBottom: "2px solid #e5e5e5",
              paddingBottom: 5,
            }}
          >
            Things I've built
          </h2>
          {myPortfolio()}
          <h2
            id={"skills"}
            style={{
              marginTop: 100,
              borderBottom: "2px solid #e5e5e5",
              paddingBottom: 5,
            }}
          >
            Skills, concepts and familiar tech
          </h2>
          {mySkills()}
          <h2
            id={"writing"}
            style={{
              marginTop: 100,
              borderBottom: "2px solid #e5e5e5",
              paddingBottom: 5,
            }}
          >
            Things I've written
          </h2>
          {myArticles()}

          {/*<h2*/}
          {/*  id={"about"}*/}
          {/*  style={{*/}
          {/*    marginTop: 100,*/}
          {/*    borderBottom: "2px solid #e5e5e5",*/}
          {/*    paddingBottom: 5,*/}
          {/*  }}*/}
          {/*>*/}
          {/*  About Me*/}
          {/*</h2>*/}
          {/*{aboutMe()}*/}
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
    boilerplate: file(absolutePath: { regex: "/boilerplate-preview/" }) {
      childImageSharp {
        sizes(maxWidth: 630) {
          ...GatsbyImageSharpSizes
        }
      }
    }
    moviemedium: file(absolutePath: { regex: "/mm-preview/" }) {
      childImageSharp {
        sizes(maxWidth: 630) {
          ...GatsbyImageSharpSizes
        }
      }
    }
    depchecker: file(absolutePath: { regex: "/depchecker-preview/" }) {
      childImageSharp {
        sizes(maxWidth: 630) {
          ...GatsbyImageSharpSizes
        }
      }
    }
    scriptsflix: file(absolutePath: { regex: "/scriptsflix-preview/" }) {
      childImageSharp {
        sizes(maxWidth: 630) {
          ...GatsbyImageSharpSizes
        }
      }
    }
    aiPromptOrganizer: file(absolutePath: { regex: "/ai-prompt-organizer-preview/" }) {
      childImageSharp {
        sizes(maxWidth: 630) {
          ...GatsbyImageSharpSizes
        }
      }
    }
    screenwriter: file(absolutePath: { regex: "/screenwriter-preview/" }) {
      childImageSharp {
        sizes(maxWidth: 630) {
          ...GatsbyImageSharpSizes
        }
      }
    }
    simpleStorage: file(absolutePath: { regex: "/simple-storage-preview/" }) {
      childImageSharp {
        sizes(maxWidth: 630) {
          ...GatsbyImageSharpSizes
        }
      }
    }
    dailyGray: file(absolutePath: { regex: "/the-daily-gray-preview/" }) {
      childImageSharp {
        sizes(maxWidth: 630) {
          ...GatsbyImageSharpSizes
        }
      }
    }
    newsbie: file(absolutePath: { regex: "/newsbie-preview/" }) {
      childImageSharp {
        sizes(maxWidth: 630) {
          ...GatsbyImageSharpSizes
        }
      }
    }
    fjf: file(absolutePath: { regex: "/fjf-preview/" }) {
      childImageSharp {
        sizes(maxWidth: 630) {
          ...GatsbyImageSharpSizes
        }
      }
    }
    domEvents: file(absolutePath: { regex: "/dom-events-preview/" }) {
      childImageSharp {
        sizes(maxWidth: 630) {
          ...GatsbyImageSharpSizes
        }
      }
    }
    avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
      childImageSharp {
        fixed(width: 50, height: 50) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`;
