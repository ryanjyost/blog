import React from "react";

export default function ArticlePreview({ article, i }) {
  return (
    <div style={{ marginBottom: 50 }}>
      <h3
        style={{
          marginBottom: 5,
          fontSize: 20,
          borderBottom: "none",
        }}
      >
        <a style={{ borderBottom: "none" }} href={article.link}>
          {article.name}
        </a>
      </h3>
      <p
        style={{
          fontSize: 16,
          color: "rgba(0,0,0,0.6)",
          marginBottom: 0,
        }}
      >
        {article.desc}
      </p>
      <div
        style={{
          marginTop: 10,
          fontSize: 12,
          opacity: 0.6,
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "baseline",
        }}
      >
        published on{" "}
        {article.pub.link ? (
          <a
            href={article.pub.link}
            style={{ marginLeft: 3 }}
            target={"_blank"}
          >
            {article.pub.name}
          </a>
        ) : (
          article.pub.name
        )}
      </div>
    </div>
  );
}
