import React from "react";

export default function ArticlePreview({ article, i }) {
  return (
    <div style={{ marginBottom: 50 }}>
      <h3 style={{ marginBottom: 10, fontSize: 20 }}>
        <a href={article.link}>{article.name}</a>
      </h3>
      <h6>{article.pub.link ? <a href={}}</h6>
      <p
        style={{
          fontSize: 16,
          color: "rgba(0,0,0,0.6)",
          marginBottom: 0,
        }}
      >
        {article.desc}
      </p>
    </div>
  );
}
