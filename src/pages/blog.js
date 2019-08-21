import React from "react";
import { Link, graphql } from "gatsby";
import articles from "../utils/posts";

import Layout from "../components/layout";
import SEO from "../components/seo";
import ArticlePreview from "../components/ArticlePreview";
import { rhythm } from "../utils/typography";

class BlogIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewGuest: false,
    };
  }

  componentDidMount() {
    console.log(this.props.location);
    if (this.props.location.hash === "#guest") {
      this.setState({ viewGuest: true });
    }
  }

  render() {
    const { data } = this.props;
    const { viewGuest } = this.state;
    const siteTitle = data.site.siteMetadata.title;
    const posts = data.allMarkdownRemark.edges;
    const { pathname } = this.props.location;

    const personalBlog = () => {
      return (
        <div>
          {posts.map(({ node }) => {
            const title = node.frontmatter.title || node.fields.slug;
            return (
              <div key={node.fields.slug}>
                <h3
                  style={{
                    marginBottom: 5,
                    fontSize: 20,
                  }}
                >
                  <Link
                    style={{ boxShadow: `none`, borderBottom: "none" }}
                    to={node.fields.slug}
                  >
                    {title}
                  </Link>
                </h3>
                <p
                  style={{ marginBottom: 5 }}
                  dangerouslySetInnerHTML={{
                    __html: node.frontmatter.description || node.excerpt,
                  }}
                />
                <h6
                  style={{
                    fontSize: 12,
                    fontWeight: "normal",
                    color: "rgba(0,0,0,0.4)",
                  }}
                >
                  {node.frontmatter.date}
                </h6>
              </div>
            );
          })}
        </div>
      );
    };

    const guestPosts = () => {
      return (
        <div>
          {articles.map((article, i) => {
            return <ArticlePreview key={i} article={article} />;
          })}
        </div>
      );
    };

    return (
      <Layout
        location={this.props.location}
        title={siteTitle}
        style={{
          minHeight: "100vh",
          maxWidth: 600,
          margin: "auto",
          paddingTop: 0,
        }}
      >
        <SEO title="Ryan J Yost" />
        <div
          style={{
            marginTop: 20,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 50,
          }}
        >
          <h2 style={{ textAlign: "center", marginBottom: 8 }}>
            {viewGuest ? "Guest Writing" : "Yost's Posts"}
          </h2>
          <div
            style={{
              margin: "auto",
              display: "inline-block",
              textAlign: "center",
              fontSize: 12,
              color: "rgba(0,0,0,0.5)",
            }}
          >
            Browse my
            <a
              onClick={() => this.setState({ viewGuest: !viewGuest })}
              style={{ cursor: "pointer", margin: "0px 5px" }}
            >
              {!viewGuest ? "guest writing" : "personal blog"}
            </a>
            instead
          </div>
        </div>
        {viewGuest ? guestPosts() : personalBlog()}
      </Layout>
    );
  }
}

export default BlogIndex;

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
