import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/layout";
import SubscribeToNewsletter from "../components/SubscribeToNewsletter";
import SEO from "../components/seo";

class Subscribe extends React.Component {
  render() {
    const { data } = this.props;
    const siteTitle = data.site.siteMetadata.title;

    return (
      <Layout
        style={{
          minHeight: "100vh",
          maxWidth: 600,
          width: "100%",
          margin: "auto",
          paddingTop: 0,
        }}
        noMainPadding
        location={this.props.location}
        title={siteTitle}
      >
        <SEO title="Subscribe to Yost's Posts" />
        <SubscribeToNewsletter />
      </Layout>
    );
  }
}

export default Subscribe;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
